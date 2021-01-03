import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useHistory } from 'react-router-dom';
import { makeStyles, Avatar, Typography } from '@material-ui/core';
import { Star, KeyboardArrowUp } from '@material-ui/icons';
import * as COLORS from '../../colors';

// function ProjectCard({ proj }) {
function ProjectCard({ project }) {
  const history = useHistory();
  const proj = {
    user: {
      id: 1,
      name: 'Jesse Alba',
      yearsOfExperience: 10,
      title: 'frontend',
      avatarUrl:
        'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzJ8fGF2YXRhcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
    },
    images: [
      'https://images.unsplash.com/photo-1541882270037-d3cf216b2ca4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1541848952518-f6c52dbc7c94?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1951&q=80',
      'https://images.unsplash.com/photo-1480350376518-4575ee35bf49?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80',
    ],
    techsUsed: ['ruby', 'react', 'mern'],
    peopleFavorited: [1, 2, 3, 4],
    title: 'a title',
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      marginBottom: '.3rem',
      cursor: 'pointer',
      '& > img': {
        width: '100%',
        height: '100%',
        borderRadius: 10,
      },
    },
    userDisplay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 10px',
    },
    leftPanel: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    avatar: {
      width: '3rem',
      height: '3rem',
      marginRight: 10,
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      backgroundColor: COLORS.DEVDARKBLUE,
      color: 'white',
      padding: '0 7px',
      marginLeft: 10,
      alignText: 'center',
      borderRadius: 7,
    },
  }));
  const [autoplay, setAutoplay] = useState(false);
  const classes = useStyles();
  const favoriteProject = () => {
    // favorite();
  };
  return (
    <div className={classes.root}>
      <Carousel
        animation="fade"
        autoPlay={autoplay}
        style={{ height: 500 }}
        interval={1500}
        indicators={false}
        timeout={500}
      >
        {proj.images.map((item, i) => (
          <div
            className={classes.image}
            key={i}
            onMouseOver={() => setAutoplay(true)}
            onMouseOut={() => setAutoplay(false)}
            onClick={() => history.push('/projects/5fea1ae674646d29c7ddb2ee')}
          >
            <img src={item} alt={item.title} />
          </div>
        ))}
      </Carousel>

      <div className={classes.userDisplay}>
        <div className={classes.leftPanel}>
          <Avatar className={classes.avatar} src={proj.user.avatarUrl} />
          <div>
            <div className={classes.userInfo}>
              <Typography
                style={{
                  color: COLORS.DEVDARKBLUE,
                  fontSize: 15,
                  fontWeight: 800,
                }}
              >
                {proj.user.name}
              </Typography>
              <div className={classes.title}>
                <Typography style={{ fontSize: 13 }}>
                  {proj.user.title}
                </Typography>
              </div>
            </div>
            <div>
              <Typography
                style={{ color: 'red', fontSize: 15, fontWeight: 500 }}
              >
                {proj.user.yearsOfExperience} years of experience
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.rightPanel}>
          <Star
            style={{ color: COLORS.GOLDSTAR, cursor: 'pointer' }}
            onClick={favoriteProject}
          />
          <KeyboardArrowUp style={{ color: 'red' }} />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
