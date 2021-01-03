import React, { Component } from 'react';
import { connect } from 'react-redux';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import { createProject } from '../../../actions/project_actions';

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      title: '',
      githubLink: '',
      liveLink: '',
      description: '',
      images: {
        hero: '',
        secondaries: [],
      },
      features: [],
      ui: {
        color: 'light',
        overviewLayout: 1,
        featuresLayout: 1,
        languageChart: 1,
      },
      mobile: false,
      browsers: [],
      futureFeatures: [],
    };

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
        handleSubmit={this.handleSubmit}
      />
    );
  }

  updateMasterState(stepState, last) {
    this.setState(stepState, () => {
      if (last) {
        this.handleSubmit();
      }
    });
  }

  changeStep(dir) {
    this.setState((prevState) => ({
      step: dir === 'next' ? (prevState.step += 1) : (prevState.step -= 1),
    }));
  }

  handleSubmit() {
    console.log(this.state);
    this.props.createProject(this.state);
  }

  render() {
    return (
      <div className="upload-project">
        <div className="step-container">{this.renderStep()}</div>
      </div>
    );
  }
}

const mapDTP = (dispatch) => ({
  createProject: (project) => dispatch(createProject(project)),
});

export default connect(null, mapDTP)(NewProject);
