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
        hero: this.props.masterState.images.hero,
        secondaries: this.props.masterState.images.secondaries,
      },
      ui: {
        color: this.props.masterState.ui.color,
        overviewLayout: this.props.masterState.ui.overviewLayout,
        featuresLayout: this.props.masterState.ui.featuresLayout,
        languageChart: this.props.masterState.ui.languageChart,
      },
    };

    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(type, imageUrl) {
    if (type === 'hero') {
      this.setState((prevProps) => ({
        images: { ...prevProps.images, hero: imageUrl },
      }));
    } else if (type === 'secondary')
      this.setState((prevProps) => ({
        images: { ...prevProps.images, secondaries: [imageUrl] },
      }));
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
        onClick={() =>
          this.setState((prevState) => ({
            ui: { ...prevState.ui, overviewLayout: layoutNum },
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
            <ImageUploader
              incomingImage={this.state.images.hero}
              handleImageChange={this.handleImageChange}
              type={'hero'}
            />
          </div>
          <div className="step-inner-right">
            <label className="step-input-label">
              <Typography>
                Secondary Image <span style={{ color: 'red' }}>*</span>
              </Typography>
            </label>
            <ImageUploader
              incomingImage={this.state.images.secondaries[0]}
              handleImageChange={this.handleImageChange}
              type={'secondary'}
            />
          </div>
        </div>
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

export default Step2;
