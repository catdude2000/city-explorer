/**
 * @file App.js
 * @author Mike Pace
 * @description
 */

import React from 'react';
import axios from 'axios';
import { Button, Container, FormControl, Image } from 'react-bootstrap';
import './App.css';
import Error from './Error';

class App extends React.Component {

  /**
   * sets the 'search query' and 'location' state attributes to null as default,
   * because render() sees null as no value and won't render the components
   *
   * @param {object} props - the properties object
   */
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      location: { place_id: null, display_name: null, lat: null, lon: null },
      error: null
    };
  }

  /**
    * This takes no arguments, but gets a location and makes an api call.
    * Requires npm install axios
    * get the access key from your LocationIQ account
    * environment variable name must begin with REACT_APP_
    * Store the access token in .env
    */
  getLocation = async () => {
    // pulls the user input from the associated element id ("searchQ")
    let searchInput = document.getElementById("searchQ").value;
    console.log(`App.getLocation() searchInput ${searchInput}`)
    if (searchInput.length === 0){
      this.setState({error: '404 "error": "Unable to geocode"'});
    }
    else{
 
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_TOKEN}&q=${searchInput}&format=json`;

    const res = await axios.get(API);

    let incomingLocation = res.data[0];
    // console.log(incomingLocation.lat, 'incomloc')
    this.setState({ location:incomingLocation, error: null });
    // if (searchInput = null){
    //   this.setState({ error:})
    // }
  }
  };

  /**
   * Added id to input and removed the onChange
   * Changed this.state.location.latitude and this.state.location.longitude
   * to this.state.location.lat and lon to match the data
   * @returns {Component}
   */
  render() {
    // console.log(`Location: ${JSON.stringify(this.state.location)}`);
    // console.log(this.state.location.lat, 'incomloc');
    return (
      <>
      <FormControl
          id="searchQ"
          placeholder='Search for a city'
        />
        <Button onClick={this.getLocation}>Explore!</Button>
        {this.state.location.place_id && (
          <Container>
            The city is: {this.state.location.display_name}<br/>
            Longitude: {this.state.location.lat}<br/>
            Latitude: {this.state.location.lon}<br/>
            <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_TOKEN}&center=${this.state.location.lat},${this.state.location.lon}`} alt='map'/>

          </Container>
        )}
          {this.state.error&&<Error message={this.state.error}/>}
      </>
    );
  }
}

export default App;

