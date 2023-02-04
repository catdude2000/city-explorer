import './App.css';
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Col, Card } from 'react-bootstrap';

let API_KEY = process.env.REACT_APP_LOC_APIKEY;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      error: false,
      errorMessage: "",
      cityMap: '',
      lat: "",
      lon: ""
    };
  }

  imageHandler = async () => {
    this.setState({
      cityMap: `https://maps.locationiq.com/v3/staticmap/search?key=${API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`
    })
  }

  submitCityHandler = async (event) => {
    event.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.city}&format=json`
      let cityInfo = await axios.get(url)

      this.setState({
        cityData: cityInfo.data[0],
        error: false
      },
        this.imageHandler(),
        this.displayWeather()
      );
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

  ///////////////

  displayWeather = async (lat, lon, searchQuery) => {
    try {
      console.log(lat, lon)
      let weatherUrl = await axios.get(`${process.env.REACT_APP_SERVER}/weather`)  
        this.setState({
          latitude: lat,
          longitude: lon,
          searchQuery: searchQuery,
          weather: await axios.get(weatherUrl)
      })
      
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An error ocurred: ${error.response.status}`
      })
    }
  };

///////////////////////////


  render() {

    // console.log("city", this.state.cityData);
    return (
      <body>
        <form id="form" onSubmit={this.submitCityHandler}>
          <label>
            {" "}<p>
              Pick a City:
            </p>
            <input type="text" onInput={this.handleCityInput} />
          </label>
          <button type="submit">Explore!</button>
        </form>
        <Card>{this.state.errorMessage}</Card>
        <Col>
            {/* {this.weather} */}
            {this.state.cityData.display_name}
            <br/>
            {this.state.cityData.lat}
            {this.state.cityData.lon}
        </Col>
        <Image src={this.state.cityMap} />
      </body>
    );
  }
}
export default App;
