import './App.css';
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
// import { Form } from 'react-bootstrap';
let API_KEY = process.env.REACT_APP_LOC_APIKEY;

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      city: "",
      cityData: {},
      error: false,
      errorMessage: ""
    };
  }

  submitCityHandler = async (event) => {
    event.preventDefault();
    try{
      let url= `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.city}&format=json`;

      // let mapUrl= `https://maps.locationiq.com/v3/staticmap/search?key=${API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`

      let cityInfo = await axios.get(url);

      // let cityMap = await axios.get(mapUrl);

      this.setState({
        
        cityData: cityInfo.data[0],
        // cityImage: cityMap,
        error: false
      });

    } catch (error) {
      this.setState({

        error: true,
        errorMessage: `An error ocurred: ${error.response.status}`
      });
    }
  };

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    });
  };

  render() {

    console.log("city", this.state.cityData);
    return (
      <>
      <form id="form" onSubmit={this.submitCityHandler}>
        <label>
          {" "}
          Pick a City:
          <input type="text" onInput={this.handleCityInput} />
        </label>
        <button type="submit">Explore!</button>
      </form>
        <div>
        {this.state.cityData.display_name}
        {this.state.cityData.lat}
        {this.state.cityData.lon}
        </div>
        <div>
          {/* {this.state.cityMap} */}
        </div>
      </>
      );
  }
}
export default App;
