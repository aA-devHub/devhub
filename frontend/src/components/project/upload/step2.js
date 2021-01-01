import React, { Component } from 'react';
import StepHeader from './step_header';
import ImageUploader from './image_uploader';

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: {
        hero: this.props.masterState.images.hero || '',
        secondaries: this.props.masterState.images.secondaries,
      },
    };

    this.handleStepChange = this.handleStepChange.bind(this);
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
          <ImageUploader />
        </div>
      </React.Fragment>
    );
  }
}

export default Step2;
