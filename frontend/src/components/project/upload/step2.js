import React, { Component } from 'react';
import StepHeader from './step_header';

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomthing: '',
    };

    this.handleStepChange = this.handleStepChange.bind(this);
  }

  handleStepChange(dir) {
    this.props.changeStep(dir);
    this.props.updateMasterState(this.state);
  }

  render() {
    return (
      <React.Fragment>
        <StepHeader
          step={2}
          title={'Step 2!'}
          changeStep={this.handleStepChange}
        />
      </React.Fragment>
    );
  }
}

export default Step2;
