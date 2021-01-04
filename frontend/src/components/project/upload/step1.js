import React, { Component } from 'react';
import StepHeader from './step_header';
import { Typography, InputBase, RadioGroup, Radio } from '@material-ui/core';
import { FormControlLabel, FormControl } from '@material-ui/core';

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.masterState.title,
      githubLink: this.props.masterState.githubLink,
      liveLink: this.props.masterState.liveLink,
      description: this.props.masterState.description,
      ui: {
        color: this.props.masterState.ui.color,
        overviewLayout: this.props.masterState.ui.overviewLayout,
        featuresLayout: this.props.masterState.ui.featuresLayout,
        languageChart: this.props.masterState.ui.languageChart,
      },
    };

    this.handleStepChange = this.handleStepChange.bind(this);
  }

  handleStepChange(dir) {
    this.props.updateMasterState(this.state);
    this.props.changeStep(dir);
  }

  handleInput(field) {
    return (e) => {
      if (field === 'color') {
        this.setState((prevState) => ({
          ui: { ...prevState.ui, color: e.target.value },
        }));
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
          nextDisabled={
            !Boolean(
              this.state.title &&
                this.state.description &&
                this.state.githubLink &&
                this.state.liveLink
            )
          }
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
              <Typography>
                GitHub Repo URL <span style={{ color: 'red' }}>*</span>
              </Typography>
              <InputBase
                className="step-input"
                value={this.state.githubLink || ''}
                onChange={this.handleInput('githubLink')}
              />
            </label>
            <label className="step-input-label">
              <Typography>
                Live URL <span style={{ color: 'red' }}>*</span>
              </Typography>
              <InputBase
                className="step-input"
                value={this.state.liveLink || ''}
                onChange={this.handleInput('liveLink')}
              />
            </label>
          </div>
          <div className="step-inner-right">
            <label className="step-input-label">
              <Typography>
                Project Description <span style={{ color: 'red' }}>*</span>
              </Typography>
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
                value={this.state.ui.color}
                onChange={this.handleInput('color')}
              >
                <FormControlLabel
                  value="light"
                  control={<Radio color="default" />}
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
