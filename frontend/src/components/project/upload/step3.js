import React, { Component } from 'react';
import StepHeader from './step_header';
import Feature from './feature';
import { Typography, Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import * as COLORS from '../../../colors';

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: this.props.masterState.features,
      ui: {
        color: this.props.masterState.ui.color,
        overviewLayout: this.props.masterState.ui.overviewLayout,
        featuresLayout: this.props.masterState.ui.featuresLayout,
        languageChart: this.props.masterState.ui.languageChart,
      },
    };

    this.handleStepChange = this.handleStepChange.bind(this);
    this.addFeatureToState = this.addFeatureToState.bind(this);
  }

  renderFeatures() {
    const features = this.state.features.map((feature, idx) => (
      <Feature
        feature={feature}
        key={idx}
        idx={idx}
        addFeatureToState={this.addFeatureToState}
      />
    ));

    return (
      <React.Fragment>
        {features.length ? (
          features
        ) : (
          <Feature
            feature={{}}
            key={0}
            idx={0}
            addFeatureToState={this.addFeatureToState}
          />
        )}
        <div className="add-button">
          <Button
            onClick={() =>
              this.setState((prevProps) => {
                let features = [...prevProps.features];
                features.push({
                  title: '',
                  description: '',
                  image: '',
                  code: '',
                });

                return { features };
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

  addFeatureToState(feature) {
    if (!this.state.features.length) {
      this.setState({ features: [feature] });
    } else {
      this.setState((prevProps) => {
        let features = [...prevProps.features];
        features[feature.idx] = feature;

        return {
          features,
        };
      });
    }
  }

  renderLayout(layoutNum) {
    let layoutImageUrl;

    switch (layoutNum) {
      case 1:
        layoutImageUrl =
          'https://res.cloudinary.com/willwang/image/upload/v1609652708/Group_8_komke9.png';
        break;
      case 2:
        layoutImageUrl =
          'https://res.cloudinary.com/willwang/image/upload/v1609652708/Group_9_rkvziq.png';
        break;
      case 3:
        layoutImageUrl =
          'https://res.cloudinary.com/willwang/image/upload/v1609652708/Group_7_azatw5.png';
        break;
      default:
        break;
    }

    var classes = 'step-layout pointer';
    let checkmark;

    if (this.state.ui.featuresLayout === layoutNum) {
      classes += ' selected';
      checkmark = <CheckIcon />;
    }

    return (
      <div
        className={classes}
        onClick={() =>
          this.setState((prevState) => ({
            ui: { ...prevState.ui, featuresLayout: layoutNum },
          }))
        }
      >
        <img src={layoutImageUrl} alt={`Layout ${layoutNum}`} />
        {checkmark}
      </div>
    );
  }

  handleStepChange(dir) {
    this.props.updateMasterState(this.state);
    this.props.changeStep(dir);
  }

  render() {
    return (
      <React.Fragment>
        <StepHeader
          step={3}
          title={'Key Features'}
          changeStep={this.handleStepChange}
          nextDisabled={!this.state.features.length}
        />
        {this.renderFeatures()}
        <div className="step-inner layouts">
          <label className="step-input-label big center">
            <Typography>Select Layout</Typography>
          </label>
          <div className="step-layouts">
            {this.renderLayout(1)}
            {this.renderLayout(2)}
            {this.renderLayout(3)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Step3;
