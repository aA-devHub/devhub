import React from 'react';
import * as COLORS from '../../../colors';
import { makeStyles, Typography, Slider } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: 'flex',
    alignItems: 'center',
    width: '70%',
    justifyContent: 'space-between',
    '& > p': {
      marginTop: 20,
      color: COLORS.DEVBLUE,
      fontWeight: 'bold',
    },
  },
  slider: {
    margin: '30px 0 0 auto',
    width: '80%',
    marginLeft: 30,
    color: COLORS.DEVBLUE,
  },
}));

function BarChartItem({ skill, level }) {
  const classes = useStyles();
  return (
    <div className={classes.item}>
      <Typography>{skill}</Typography>
      <Slider
        className={classes.slider}
        value={level}
        // getAriaValueText={level.toString()}
        aria-labelledby="discrete-slider-always"
        step={1}
        min={1}
        max={10}
        valueLabelDisplay="on"
      />
    </div>
  );
}

function BarChart({ skills }) {
  const classes = useStyles();
  const renderSkills = () => {
    let sks = [];
    for (const key in skills) {
      sks.push(<BarChartItem key={key} skill={key} level={skills[key]} />);
    }
    return sks;
  };
  return <div className={classes.root}>{renderSkills()}</div>;
}

export default BarChart;
