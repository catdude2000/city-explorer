/**
 * @file Error.js
 * @author Mike Pace
 * @description modal for error popup
 */

import { render } from '@testing-library/react';
import React from 'react';
import { Card } from 'react-bootstrap';

class Error extends React.Component{
  // constructor(props){
  //   super(props);

  // };


render(){
  return(
    <Card>
      <p>'error': {this.props.message}</p>
    </Card>
  )
}
}
export default Error;
