import React, { Component } from 'react';

import Step1 from './step1';
import Step2 from './step2';

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      title: '',
      images: {
        hero: '',
        secondaries: [],
      },
    };

    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
  }

  renderStep() {
    var StepComponents = { 1: Step1, 2: Step2 };
    var StepComponent = StepComponents[this.state.step];

    return (
      <StepComponent
        masterState={this.state}
        updateMasterState={this.updateMasterState}
        nextStep={this.nextStep}
        prevStep={this.prevStep}
        submit={this.handleSubmit}
      />
    );
  }

  updateMasterState(stepState) {
    this.setState(stepState);
  }

  nextStep() {
    this.setState((prevState) => ({
      step: (prevState.step += 1),
    }));
  }

  prevStep() {
    this.setState((prevState) => ({
      step: (prevState.step -= 1),
    }));
  }

  handleSubmit() {
    console.log('Insert post w/ master state info!');
  }

  render() {
    return (
      <div className="upload-project">
        <div className="step-container">{this.renderStep()}</div>
      </div>
    );
  }
}

export default NewProject;
