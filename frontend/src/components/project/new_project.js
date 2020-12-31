import React, { Component } from 'react';

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      images: {
        hero: '',
        secondaries: [],
      },
    };
  }
  render() {
    return (
      <div className="hi">
        <h1>HI</h1>
      </div>
    );
  }
}

export default NewProject;
