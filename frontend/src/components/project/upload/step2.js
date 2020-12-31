import React, { Component } from 'react';

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>I'm step 2!</h1>
        <span onClick={this.props.nextStep}>next</span>
        <span onClick={this.props.prevStep}>prev</span>
      </div>
    );
  }
}

export default Step2;
