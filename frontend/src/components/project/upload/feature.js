import React, { Component } from 'react';
import ImageUploader from './image_uploader';
import { Typography, InputBase } from '@material-ui/core';

class Feature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: this.props.idx,
      title: this.props.feature.title || '',
      description: this.props.feature.description || '',
      image: this.props.feature.image || '',
      code: this.props.feature.code || '',
    };

    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleInput(field) {
    return (e) => {
      this.setState(
        {
          [field]: e.currentTarget.value,
        },
        () => this.props.addFeatureToState(this.state)
      );
    };
  }

  handleImageChange(type, imageUrl) {
    this.setState({ [type]: imageUrl }, () =>
      this.props.addFeatureToState(this.state)
    );
  }

  render() {
    return (
      <div className="step-inner">
        <div className="step-inner-third">
          <label className="step-input-label">
            <Typography>{`Feature ${this.props.idx + 1}`}</Typography>
            <label className="step-input-label">
              <Typography>Feature Title</Typography>
              <InputBase
                className="step-input"
                value={this.state.title || ''}
                onChange={this.handleInput('title')}
              />
            </label>
          </label>
          <label className="step-input-label">
            <Typography>Feature Description</Typography>
            <InputBase
              multiline={true}
              rows={5}
              style={{ padding: '0' }}
              className="step-input"
              value={this.state.description || ''}
              onChange={this.handleInput('description')}
            />
          </label>
        </div>
        <div className="step-inner-third">
          <label className="step-input-label">
            <Typography>Upload Feature Image</Typography>
          </label>
          <ImageUploader
            incomingImage={this.state.image}
            handleImageChange={this.handleImageChange}
            type={'image'}
          />
        </div>
        <div className="step-inner-third">
          <label className="step-input-label">
            <Typography>Upload Code Image</Typography>
          </label>
          <ImageUploader
            incomingImage={this.state.code}
            handleImageChange={this.handleImageChange}
            type={'code'}
          />
        </div>
      </div>
    );
  }
}

export default Feature;
