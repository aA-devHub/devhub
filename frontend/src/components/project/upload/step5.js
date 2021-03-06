import React, { Component } from 'react';
import StepHeader from './step_header';
import FutureFeature from './future_feature';
import { Typography, Button } from '@material-ui/core';
import * as COLORS from '../../../colors';

class Step5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      futureFeatures: this.props.masterState.futureFeatures,
    };

    this.handleStepChange = this.handleStepChange.bind(this);
    this.addFutureFeatureToState = this.addFutureFeatureToState.bind(this);
  }

  renderFutureFeatures() {
    const futureFeatures = this.state.futureFeatures.map(
      (futureFeature, idx) => (
        <FutureFeature
          futureFeature={futureFeature}
          key={idx}
          idx={idx}
          addFutureFeatureToState={this.addFutureFeatureToState}
        />
      )
    );

    return <React.Fragment>{futureFeatures}</React.Fragment>;
  }

  addFutureFeatureToState(futureFeature) {
    if (!this.state.futureFeatures.length) {
      this.setState({ futureFeatures: [futureFeature] });
    } else {
      this.setState((prevProps) => {
        let futureFeatures = [...prevProps.futureFeatures];
        futureFeatures[futureFeature.idx] = futureFeature;

        return {
          futureFeatures,
        };
      });
    }
  }

  handleStepChange(dir) {
    if (dir === 'next') {
      this.props.updateMasterState(this.state, dir);
    } else {
      this.props.updateMasterState(this.state);
      this.props.changeStep(dir);
    }
  }

  render() {
    var featuresValidated = () =>
      this.state.futureFeatures.every(
        (feature) => feature.title && feature.description
      );

    return (
      <React.Fragment>
        <StepHeader
          step={5}
          title={'Future Features'}
          projectAction={this.props.projectAction}
          changeStep={this.handleStepChange}
          nextDisabled={!featuresValidated()}
        />
        <div className="step-inner">{this.renderFutureFeatures()}</div>
        <div className="add-button">
          <Button
            onClick={() =>
              this.setState((prevProps) => {
                let futureFeatures = [...prevProps.futureFeatures];
                futureFeatures.push({
                  title: '',
                  description: '',
                  image: '',
                  code: '',
                });

                return { futureFeatures };
              })
            }
            variant="contained"
            style={{
              backgroundColor: COLORS.DEVBLUE,
              color: 'white',
            }}
          >
            <Typography>Add Another Feature</Typography>
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default Step5;
