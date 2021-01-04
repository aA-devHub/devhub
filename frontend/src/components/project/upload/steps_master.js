import React, { Component } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';

class StepsMaster extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.project, step: 1 };

    this.changeStep = this.changeStep.bind(this);
    this.updateMasterState = this.updateMasterState.bind(this);
  }

  renderStep() {
    var StepComponents = { 1: Step1, 2: Step2, 3: Step3, 4: Step4, 5: Step5 };
    var StepComponent = StepComponents[this.state.step];

    return (
      <StepComponent
        masterState={this.state}
        updateMasterState={this.updateMasterState}
        changeStep={this.changeStep}
        projectAction={this.props.projectAction}
      />
    );
  }

  changeStep(dir) {
    this.setState((prevState) => ({
      step: dir === 'next' ? (prevState.step += 1) : (prevState.step -= 1),
    }));
  }

  updateMasterState(stepState, last) {
    this.setState(stepState, () => {
      if (last) {
        if (this.props.projectAction === 'upload') {
          this.props
            .createProject(this.state)
            .then((res) =>
              this.props.history.push(`/projects/${res.payload.project._id}`)
            );
        } else if (this.props.projectAction === 'edit') {
          this.props
            .updateProject(this.state)
            .then((res) =>
              this.props.history.push(`/projects/${res.payload.project._id}`)
            );
        }
      }
    });
  }

  render() {
    return (
      <div className="upload-project">
        <div className="step-container">{this.renderStep()}</div>
      </div>
    );
  }
}

export default StepsMaster;
