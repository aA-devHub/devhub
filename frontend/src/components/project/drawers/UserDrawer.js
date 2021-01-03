import * as COLORS from '../../../colors';
import React, { useState, useEffect } from 'react';
import {
  fade,
  withStyles,
  InputBase,
  makeStyles,
  Avatar,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 600,
    padding: 20,
    paddingLeft: 40,
    paddingTop: 50,
  },
}));
function UserInfo({ developer }) {
  console.log('developer', developer);
  const classes = useStyles();
  const renderJobs = () => {
    if (!developer.experience.length)
      return (
        <div style={{ marginTop: '2rem' }}>
          <Typography
            style={{
              fontWeight: 800,
              color: COLORS.DEVDARKBLUE,
              marginBottom: '1rem',
            }}
          >
            USER EXPERIENCES
          </Typography>
          <Typography style={{ color: COLORS.DEVBLUE }}>
            User is not sharing their work experience
          </Typography>
        </div>
      );

    const jobs = developer.experience.reverse().map((job, idx) => (
      <div className="job" key={idx}>
        <span className="job-dates">
          {job.start.slice(0, 4) + ' – ' + job.end.slice(0, 4)}
        </span>
        <span className="job-company">{job.company}</span>
        <span className="job-position">{job.position}</span>
      </div>
    ));

    return (
      <div className="work-info">
        <h3 className="info-title">Work</h3>
        {jobs}
      </div>
    );
  };
  return (
    <div className={classes.root}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={developer.imageUrl} style={{ width: 100, height: 100 }} />
        <div>
          <Typography
            variant="h3"
            style={{ marginLeft: 30, fontWeight: 800, fontFamily: 'futura' }}
          >
            {developer.name}
          </Typography>
          <Typography
            variant="body1"
            style={{
              marginLeft: 30,
              fontWeight: 400,
              fontFamily: 'futura',
              marginTop: 10,
              color: COLORS.NAVBARBLACK,
            }}
          >
            {developer.title}
          </Typography>
        </div>
      </div>
      <div>{renderJobs()}</div>
    </div>
  );
}

export default connect(
  (state, ownProps) => ({
    toggleDrawer: ownProps.toggleDrawer,
  }),
  (dispatch) => ({})
)(UserInfo);
