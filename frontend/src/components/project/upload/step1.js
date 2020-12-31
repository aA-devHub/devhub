import React, { Component } from 'react';
import StepHeader from './step_header';
import { Typography, InputBase, RadioGroup, Radio } from '@material-ui/core';
import { FormControlLabel, FormControl, FormLabel } from '@material-ui/core';

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.masterState.title || '',
      githubLink: this.props.masterState.title || '',
      liveLink: this.props.masterState.title || '',
      description: this.props.masterState.title || '',
      ui: {
        color: this.props.masterState.ui.color || 'light',
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
          step={1}
          title={'General Project Info'}
          changeStep={this.handleStepChange}
        />
        <div className="step-inner">
          <div className="step-inner-left">
            <label className="step-input-label">
              <Typography>
                Project Title <span style={{ color: 'red' }}>*</span>
              </Typography>
              <InputBase
                className="step-input"
                value={this.state.title || ''}
                onChange={this.handleInput('title')}
              />
            </label>
            <label className="step-input-label">
              <Typography>GitHub Repo URL</Typography>
              <InputBase
                className="step-input"
                value={this.state.githubLink || ''}
                onChange={this.handleInput('githubLink')}
              />
            </label>
            <label className="step-input-label">
              <Typography>Live URL</Typography>
              <InputBase
                className="step-input"
                value={this.state.liveLink || ''}
                onChange={this.handleInput('liveLink')}
              />
            </label>
          </div>
          <div className="step-inner-right">
            <label className="step-input-label">
              <Typography>Project Description</Typography>
              <InputBase
                multiline={true}
                rows={5}
                style={{ padding: '0' }}
                className="step-input"
                value={this.state.description || ''}
                onChange={this.handleInput('description')}
              />
            </label>
            <FormControl component="fieldset">
              <label className="step-input-label">
                <Typography>Color Theme</Typography>
              </label>
              <RadioGroup
                row
                aria-label="gender"
                name="gender1"
                value={this.state.ui.color}
                onChange={this.handleInput('color')}
              >
                <FormControlLabel
                  value="light"
                  control={<Radio color="red" />}
                  label="Light"
                />
                <FormControlLabel
                  value="dark"
                  control={<Radio color="default" />}
                  label="Dark"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Step1;
