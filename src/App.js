import './App.css';
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Col, Card } from 'react-bootstrap';
import Weather from './Weather';

let API_KEY = process.env.REACT_APP_LOC_APIKEY;
let W_API_KEY = process.env.WEATHER_API_KEY;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      error: false,
      errorMessage: "",
      cityMap: "",
      lat: "",
      lon: "",
      weatherShown: '',
      showWeather: false
    };
  }

  submitCityHandler = async (event) => {
    event.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.city}&format=json`
      let cityInfo = await axios.get(url);
      this.setState({
        cityData: cityInfo.data[0],
        error: false,
        cityMap: `https://maps.locationiq.com/v3/staticmap/search?key=${API_KEY}&center=${cityInfo.data[0].lat},${cityInfo.data[0].lon}&zoom=10`
      }
      );
        this.displayWeather(cityInfo.data[0].lat, cityInfo.data[0].lon, this.state.city);
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

  displayWeather = async (lat, lon, city) => {
    try {
      let weatherUrl = await axios.get(`http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${W_API_KEY}`); 
      console.log(weatherUrl.data, 'weatherurl');
        this.setState({
          showWeather: true,
          weatherShown: weatherUrl.data
      })
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An error ocurred: ${error.response.status}`
      })
    }
  };

  render() {

    console.log("city", this.state.weatherShown);
    return (
      <>
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
            {this.state.cityData.display_name}
            <br/>
            {this.state.cityData.lat}
            {this.state.cityData.lon}
        </Col>
        <Image src={this.state.cityMap} />
       {this.state.weatherShown && <Weather
          weatherShown={this.state.weatherShown}
          /> 
        }   
      </>
    );
  }
}
export default App;
