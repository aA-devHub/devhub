import React from 'react';
import { Button, Typography } from '@material-ui/core';
import * as COLORS from '../../../colors';

const StepHeader = ({ step, title, changeStep }) => {
  var backClasses = '';
  var nextClasses = '';

  if (step === 1) {
    backClasses = 'hidden';
  }

  return (
    <div className="step-header">
      <Button
        className={backClasses}
        onClick={() => changeStep('back')}
        variant="contained"
        style={{
          backgroundColor: COLORS.DEVBLUE,
          color: 'white',
        }}
      >
        <Typography>Back</Typography>
      </Button>
      <h1 className="step-title">{title}</h1>
      <Button
        className={nextClasses}
        onClick={() => changeStep('next')}
        variant="contained"
        style={{
          backgroundColor: COLORS.DEVBLUE,
          color: 'white',
        }}
      >
        <Typography>Next</Typography>
      </Button>
    </div>
  );
};

export default StepHeader;
