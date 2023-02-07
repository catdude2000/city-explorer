import React from 'react';
import { Col } from 'react-bootstrap';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherShownForRender: this.props.weatherShown
        };
    }
    // helpShowWeather = () => {
    //     this.props.displayWeather(this.props.weatherShown)
    //     console.log(this.weatherShown, 'helpweatherfuncworking')
    // }

    render() {
        return (
            <>
                <Col>

                    <p>date{this.props.date}
                    <br/>
                    description{this.props.description}
                    </p>
                    {/* <p>{this.props.description}</p> */}
                </Col>
            </>
        )
    }





}


// const express = require('express');

// require('dotenv').config();
// const cors = require('cors');

// module.exports = getWeather;

// function mapWeather(weatherData) {
//     try {
//         const weatherSummaries = weatherData.
//     }
// }


export default Weather;
