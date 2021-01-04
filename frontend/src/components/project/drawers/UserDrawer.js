import * as COLORS from '../../../colors';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BarChart from './BarChart';
import MessageBox from '../MessageModal';
import { sendMessage } from '../../../actions/message_actions';
import {
  fade,
  withStyles,
  InputBase,
  makeStyles,
  Avatar,
  Typography,
  Divider,
  Button,
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
function UserInfo({ developer, currentUserId, sendMessage }) {
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
      <div style={{ marginTop: '2rem' }} key={idx}>
        <Typography
          style={{
            fontWeight: 800,
            color: COLORS.DEVBLUE,
            marginBottom: '10px',
          }}
        >
          {job.start.slice(0, 4) + ' – ' + job.end.slice(0, 4)}
        </Typography>
        <Typography style={{ marginBottom: 5, color: COLORS.DEVDARKBLUE }}>
          <span style={{ fontWeight: 800, color: COLORS.DEVBLUE }}>
            Company:{' '}
          </span>
          {job.company}
        </Typography>
        <Typography style={{ color: COLORS.DEVDARKBLUE }}>
          <span style={{ fontWeight: 800, color: COLORS.DEVBLUE }}>
            Position:{' '}
          </span>
          {job.position}
        </Typography>
      </div>
    ));

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
        {jobs}
      </div>
    );
  };
  const renderSkills = () => {
    if (!Object.keys(developer.skills))
      return (
        <div style={{ marginTop: '2rem' }}>
          <Typography
            style={{
              fontWeight: 800,
              color: COLORS.DEVDARKBLUE,
              marginBottom: '1rem',
            }}
          >
            USER SKILLSET
          </Typography>
          <Typography style={{ color: COLORS.DEVBLUE }}>
            User is not sharing their skillsets
          </Typography>
        </div>
      );

    var skills = [];

    Object.entries(developer.skills).forEach(([skill, value], idx) => {
      skills.push(
        <div key={idx}>
          <span>{skill}</span>
          <div>
            <div></div>
          </div>
        </div>
      );
    });

    return (
      <div style={{ marginTop: '2rem' }}>
        <Typography
          style={{
            fontWeight: 800,
            color: COLORS.DEVDARKBLUE,
            marginBottom: '1rem',
          }}
        >
          USER SKILLSET
        </Typography>
      </div>
    );
  };
  const history = useHistory();

  return (
    <div className={classes.root}>
      <div
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => history.push(`/users/${developer._id}`)}
      >
        <Avatar
          src={developer.imageUrl}
          style={{
            border: `1px solid ${COLORS.DEVBLUE}`,
            width: 100,
            height: 100,
          }}
        />
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
      <br></br>
      {currentUserId === developer._id ? (
        <div></div>
      ) : (
        <MessageBox
          currentUserId={currentUserId}
          receiverId={developer._id}
          avatar={developer.imageUrl}
          userName={developer.name}
          sendMessage={sendMessage}
        />
      )}
      <div>{renderJobs()}</div>
      <div>{renderSkills()}</div>
      <BarChart skills={developer.skills} />
    </div>
  );
}

export default connect(
  (state, ownProps) => ({
    currentUserId: state.session.user.id,
    users: state.entities.users,
    toggleDrawer: ownProps.toggleDrawer,
  }),
  (dispatch) => ({ sendMessage: (data) => dispatch(sendMessage(data)) })
)(UserInfo);
