import React from 'react';
import { Col } from 'react-bootstrap';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherShownForRender: this.props.weatherShown,
        };
    }
    render() {
        console.log(this.state.weatherShownForRender, 'weathershown inwjs')
            let shownWeather = (this.state.weatherShownForRender).map((forecast, index) => {
                return <li key={index}> Forecast:{forecast.coord} | Date: {forecast.date}</li>
            });
        return (
            <>
                <Col>
                    {shownWeather}
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
