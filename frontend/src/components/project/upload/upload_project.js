import React, { Component } from 'react';

import Step1 from './step1';
import Step2 from './step2';

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      title: '',
      githubLink: '',
      liveLink: '',
      description: '',
      ui: {
        color: 'light',
      },
    };

    this.changeStep = this.changeStep.bind(this);
    this.updateMasterState = this.updateMasterState.bind(this);
  }

  renderStep() {
    var StepComponents = { 1: Step1, 2: Step2 };
    var StepComponent = StepComponents[this.state.step];

    return (
      <StepComponent
        masterState={this.state}
        updateMasterState={this.updateMasterState}
        changeStep={this.changeStep}
        submit={this.handleSubmit}
      />
    );
  }

  updateMasterState(stepState) {
    this.setState(stepState);
  }

  changeStep(dir) {
    this.setState((prevState) => ({
      step: dir === 'next' ? (prevState.step += 1) : (prevState.step -= 1),
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
