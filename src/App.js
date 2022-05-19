/**
 * @file App.js
 * @author Mike Pace
 * @description
 */

import React from 'react';
import axios from 'axios';


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
      location: { place_id: null, display_name: null },
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

    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_TOKEN}&q=${searchInput}&format=json`;

    const res = await axios.get(API);

    let incomingLocation = res.data[0];
    this.setState({ location:incomingLocation });
  };


  /**
   * Added id to input and removed the onChange
   * Changed this.state.location.latitude and this.state.location.longitude
   * to this.state.location.lat and lon to match the data
   * @returns {Component}
   */
  render() {
    console.log(`Location: ${JSON.stringify(this.state.location)}`);
    return (
      <>
        <input
          id="searchQ"
          placeholder='Search for a city'
        />
        <button onClick={this.getLocation}>Explore!</button>
        {this.state.location.place_id && (
          <h2>
            The city is: {this.state.location.display_name}<br/>
            Longitude: {this.state.location.lat}<br/>
            Latitude: {this.state.location.lon}</h2>
        )}
      </>
    );
  }
}

export default App;

