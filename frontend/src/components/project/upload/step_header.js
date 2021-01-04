import React from 'react';
import { Button, Typography } from '@material-ui/core';
import * as COLORS from '../../../colors';

const StepHeader = ({
  step,
  title,
  changeStep,
  nextDisabled,
  projectAction,
}) => {
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
        disabled={nextDisabled}
        variant="contained"
        style={{
          backgroundColor: step === 5 ? '#f50057' : COLORS.DEVBLUE,
          color: 'white',
        }}
      >
        <Typography>
          {step === 5
            ? projectAction === 'upload'
              ? 'Upload'
              : 'Save'
            : 'Next'}
        </Typography>
      </Button>
    </div>
  );
};

export default StepHeader;
