import React from 'react';
import { Col } from 'react-bootstrap';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <>
                <Col>
                    <p>{this.props.date}</p>
                    <p>{this.props.description}</p>
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
