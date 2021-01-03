import React, { Component } from 'react';
import StepHeader from './step_header';
import { Typography, RadioGroup, Radio } from '@material-ui/core';
import { FormControlLabel, FormControl } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

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
    var browsers = ['Chrome', 'Safari', 'FireFox', 'Edge', 'Opera'];

    browsers = browsers.map((browser, idx) => {
      let browserIcon;

      switch (browser) {
        case 'Chrome':
          browserIcon =
            'https://github.com/alrra/browser-logos/blob/main/src/chrome/chrome_64x64.png?raw=true';
          break;
        case 'Safari':
          browserIcon =
            'https://github.com/alrra/browser-logos/blob/main/src/safari/safari_64x64.png?raw=true';
          break;
        case 'FireFox':
          browserIcon =
            'https://github.com/alrra/browser-logos/blob/main/src/firefox/firefox_64x64.png?raw=true';
          break;
        case 'Edge':
          browserIcon =
            'https://github.com/alrra/browser-logos/blob/main/src/edge/edge_64x64.png?raw=true';
          break;
        case 'Opera':
          browserIcon =
            'https://github.com/alrra/browser-logos/blob/main/src/opera/opera_64x64.png?raw=true';
          break;

        default:
          break;
      }

      var classes = 'browser-icon pointer';

      if (this.state.browsers.includes(browser)) {
        classes += ' active';
      }

      return (
        <img
          src={browserIcon}
          alt={browser}
          className={classes}
          key={idx}
          onClick={this.handleInput('browsers')}
        />
      );
    });

    return <React.Fragment>{browsers}</React.Fragment>;
  }

  renderLayout(layoutNum) {
    let layoutImageUrl;

    switch (layoutNum) {
      case 1:
        layoutImageUrl =
          'https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/21069-cherry-apple-pie-600x600.jpg?ext=.jpg';
        break;
      case 2:
        layoutImageUrl =
          'https://t4.ftcdn.net/jpg/01/67/90/25/360_F_167902506_CBRRubORGPVJ1RopHMf2Rie6tJte74C9.jpg';
        break;
      default:
        break;
    }

    var classes = 'step-layout pointer';
    let checkmark;

    if (this.state.ui.languageChart === layoutNum) {
      classes += ' selected';
      checkmark = <CheckIcon />;
    }

    return (
      <div
        className={classes}
        onClick={() =>
          this.setState((prevState) => ({
            ui: { ...prevState.ui, languageChart: layoutNum },
          }))
        }
      >
        <img src={layoutImageUrl} alt={`Layout ${layoutNum}`} />
        {checkmark}
      </div>
    );
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
        <div className="step-inner">
          <div className="step-inner-left">
            <FormControl component="fieldset" style={{ marginBottom: '20px' }}>
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
          </div>
          <div className="step-inner-right">
            <div className="step-inner layouts">
              <label className="step-input-label">
                <Typography>Language Display</Typography>
              </label>
              <div className="step-layouts two">
                {this.renderLayout(1)}
                {this.renderLayout(2)}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Step4;
