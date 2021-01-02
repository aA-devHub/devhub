import React, { Component } from 'react';
import StepHeader from './step_header';
import ImageUploader from './image_uploader';
import { Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: {
        hero: this.props.masterState.images.hero || '',
        secondaries: this.props.masterState.images.secondaries || [],
      },
      ui: {
        overviewLayout: this.props.masterState.ui.overviewLayout || 1,
      },
    };

    this.handleStepChange = this.handleStepChange.bind(this);
  }

  renderLayout(layoutNum) {
    let layoutImageUrl;

    switch (layoutNum) {
      case 1:
        layoutImageUrl =
          'https://res.cloudinary.com/willwang/image/upload/v1609625906/caro_zdrhbh.png';
        break;
      case 2:
        layoutImageUrl =
          'https://res.cloudinary.com/willwang/image/upload/v1609625906/mason_xpi4xo.png';
        break;
      case 3:
        layoutImageUrl =
          'https://res.cloudinary.com/willwang/image/upload/v1609625907/three_hrukbw.png';
        break;
      default:
        break;
    }

    var classes = 'step-layout pointer';
    let checkmark;

    if (this.state.ui.overviewLayout === layoutNum) {
      classes += ' selected';
      checkmark = <CheckIcon />;
    }

    return (
      <div
        className={classes}
        style={{ backgroundImage: `url('${layoutImageUrl}')` }}
        onClick={() => this.setState({ ui: { overviewLayout: layoutNum } })}
      >
        {checkmark}
      </div>
    );
  }

  handleStepChange(dir) {
    this.props.changeStep(dir);
    this.props.updateMasterState(this.state);
  }

  handleInput(field) {
    return (e) => {
      if (field === 'color') {
        this.setState({
          ui: { color: e.target.value },
        });
      } else {
        this.setState({
          [field]: e.currentTarget.value,
        });
      }
    };
  }

  render() {
    return (
      <React.Fragment>
        <StepHeader
          step={2}
          title={'Project Images'}
          changeStep={this.handleStepChange}
        />
        <div className="step-inner">
          <div className="step-inner-left">
            <label className="step-input-label">
              <Typography>
                Hero Image <span style={{ color: 'red' }}>*</span>
              </Typography>
            </label>
            <ImageUploader />
          </div>
          <div className="step-inner-right">
            <label className="step-input-label">
              <Typography>
                Secondary Images <span style={{ color: 'red' }}>*</span>
              </Typography>
            </label>
            <ImageUploader />
          </div>
        </div>
        <div className="step-inner">
          <label className="step-input-label">
            <Typography>
              Select Layout <span style={{ color: 'red' }}>*</span>
            </Typography>
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

export default Step2;
