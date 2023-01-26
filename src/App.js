import './App.css';
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Image, Col } from 'react-bootstrap';

let API_KEY = process.env.REACT_APP_LOC_APIKEY;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      error: false,
      errorMessage: "",
      cityMap: ''
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
      let url = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.city}&format=json`;

      let cityInfo = await axios.get(url);;

      this.setState({
        cityData: cityInfo.data[0],
        error: false
      },
        this.imageHandler
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

  render() {

    console.log("city", this.state.cityData);
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
        <Col>
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
