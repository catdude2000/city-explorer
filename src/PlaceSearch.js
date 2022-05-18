/**
 * @file PlaceSearch.js
 * @author Mike Pace
 * @description
 */

import React from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';


Class PeopleSearch extends React.Component {


  getLocation = async () => {
    const API =`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_TOKEN}&q=${this.state.searchQuery}&format=json`;
    const res = await axios.get(API);
    const location=res.data[0];
    this.setState({ location }); 
  };
render() {
  console.log(`Location: ${JSON.stringify(this.state.location)}`);
}


Constructor (props) {
  super (props);
  this.state= {
    searchQuery: '',
    location: { place_id: 'unknown', display_name: 'None' },
  };
}

}

export default PlaceSearch;
