/**
 * @file App.js
 * @author Mike Pace
 * @description 
 */

import React from 'react';
// import { render } from '@testing-library/react';
import axios from 'axios';
import PlaceSearch from './PlaceSearch';


class App extends React.Component {

/**
 * sets the search query and location state attributes
 * @param {object} props - the properties object
 */
  constructor(props) {
    super(props);
    this.state= {
      searchQuery: '',
      location: { place_id: 'unknown', display_name: 'None' },
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
    const API =`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_TOKEN}&q=${this.state.searchQuery}&format=json`;
    const res = await axios.get(API);
    const location=res.data[0];
    this.setState({ location });
  };

render() {
  console.log(`Location: ${JSON.stringify(this.state.location)}`);
  return (
    <>
    <input type='text'
    onChange={(e) => this.setState({ searchQuery: e.target.value})}
    placeholder='Search for a city'
    />
    <button onClick={this.getLocation}>Explore!</button>
    {this.state.location.place_id && (
      <h2>The city is: {this.state.location.display_name} 
       longitude:{this.state.location.latitude} latitude:{this.state.location.longitude}</h2>
    ) }
    </>
  );
}
}

export default App;
