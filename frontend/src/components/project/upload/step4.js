import React, { Component } from 'react';
import StepHeader from './step_header';
import { Typography, RadioGroup, Radio } from '@material-ui/core';
import { FormControlLabel, FormControl } from '@material-ui/core';

class Step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: this.props.masterState.mobile,
      browsers: this.props.masterState.browsers,
      ui: {
        color: this.props.masterState.ui.color,
        overviewLayout: this.props.masterState.ui.overviewLayout,
        featuresLayout: this.props.masterState.ui.featuresLayout,
        languageChart: this.props.masterState.ui.languageChart,
      },
    };

    this.handleStepChange = this.handleStepChange.bind(this);
  }

  renderBrowsers() {
    var browsers = [
      'Chrome',
      'Safari',
      'FireFox',
      'Internet Explorer',
      'Edge',
      'Opera',
    ];

    browsers = browsers.map((browser, idx) => {
      var classes = 'browser-icon pointer';

      if (this.state.browsers.includes(browser)) {
        classes += ' active';
      }

      return (
        <img
          src="https://res.cloudinary.com/willwang/image/upload/v1609184704/logoround_tgdkrs.png"
          alt={browser}
          className={classes}
          key={idx}
          onClick={this.handleInput('browsers')}
        />
      );
    });

    return <React.Fragment>{browsers}</React.Fragment>;
  }

  handleInput(field) {
    return (e) => {
      if (field === 'mobile') {
        this.setState({ mobile: e.currentTarget.value });
      } else if (field === 'browsers') {
        this.setState((prevState) => {
          var newBrowsers = [...prevState.browsers];

          if (prevState.browsers.includes(e.target.alt)) {
            const browserIdx = newBrowsers.indexOf(e.target.alt);
            newBrowsers.splice(browserIdx, 1);
          } else {
            newBrowsers.push(e.target.alt);
          }

          return { browsers: newBrowsers };
        });
      }
    };
  }

  handleStepChange(dir) {
    this.props.updateMasterState(this.state);
    this.props.changeStep(dir);
  }

  render() {
    return (
      <React.Fragment>
        <StepHeader
          step={4}
          title={'Tech Specs'}
          changeStep={this.handleStepChange}
        />
        <FormControl component="fieldset">
          <label className="step-input-label">
            <Typography>Mobile Compatible</Typography>
          </label>
          <RadioGroup
            row
            value={this.state.mobile}
            onChange={this.handleInput('mobile')}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="default" />}
              label="Yes"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="default" />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
        <label className="step-input-label">
          <Typography>Browser Compatibility</Typography>
          {this.renderBrowsers()}
        </label>
      </React.Fragment>
    );
  }
}

export default Step4;
