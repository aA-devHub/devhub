import React, { useState } from 'react';
import { connect } from 'react-redux';

import Carousel from 'react-material-ui-carousel';
import { useHistory } from 'react-router-dom';
import { makeStyles, Avatar, Typography } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';

// import { project as dummy } from './__tests__/dummy_data';
import FavoriteButton from './FavoriteButton.jsx';
import * as COLORS from '../../colors';
import { getImageArray } from '../../selectors/projects';
import * as userHelpers from '../user/user_helpers';

const mapStateToProps = (state, { project }) => {
  const author = state.entities.users[project.user];
  if (!author) return { author: null };
  author.avatarUrl = author.avatarUrl || author.imageUrl;
  return {
    author,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1.25rem',
    '&:hover > #project-title': {
      opacity: '0',
    },
  },
  projectTitle: {
    position: 'absolute',
    margin: '7.5px 0 0 7.5px',
    borderRadius: '3px',
    zIndex: 2,
    padding: '4px 10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    fontWeight: '800',
    opacity: '1',
    transition: 'opacity 0.2s',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
  },
  image: {
    border: '1px solid rgba(0,0,0,0.05)',
    maxWidth: 300,
    height: 170,
    borderRadius: 10,
    marginBottom: '.7rem',
    cursor: 'pointer',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
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
    width: '2rem',
    height: '2rem',
    marginRight: 10,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  authorTitle: {
    backgroundColor: COLORS.DEVDARKBLUE,
    color: 'white',
    padding: '0 7px',
    marginLeft: 10,
    alignText: 'center',
    borderRadius: 7,
  },
  rightPanel: {
    display: 'flex',
  },
}));

function ProjectCard({ project, author }) {
  const history = useHistory();

  const [autoplay, setAutoplay] = useState(false);
  const classes = useStyles();

  if (!author) return null;
  return (
    <div className={classes.root}>
      <div id="project-title" className={classes.projectTitle}>
        {project.title}
      </div>
      <Carousel
        animation="fade"
        autoPlay={autoplay}
        interval={2000}
        indicators={false}
        timeout={500}
      >
        {getImageArray(project).map((item, i) => (
          <div
            className={classes.image}
            key={i}
            onMouseOver={() => setAutoplay(true)}
            onMouseOut={() => setAutoplay(false)}
            onClick={() => history.push(`/projects/${project._id}`)}
            style={{
              backgroundImage: `url(${item})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          ></div>
        ))}
      </Carousel>
      <div className={classes.userDisplay}>
        <div
          className={classes.leftPanel}
          onClick={() => history.push(`/users/${project.user}`)}
        >
          <Avatar className={classes.avatar} src={author && author.avatarUrl} />
          <div>
            <div className={classes.userInfo}>
              <Typography
                style={{
                  color: COLORS.DEVDARKBLUE,
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                {' '}
                {author.name.split(' ')[0].toUpperCase().slice(0, 5)}
              </Typography>
              <div className={classes.authorTitle}>
                <Typography style={{ fontSize: 10 }}>
                  {author.title
                    .split(' ')
                    .map((name) => name[0])
                    .join('')
                    .toUpperCase()}
                </Typography>
              </div>
            </div>
            <div>
              <Typography
                style={{ color: 'red', fontSize: 10, fontWeight: 500 }}
              >
                {userHelpers.calculateExperience(author.experience) ||
                  author.projects.length +
                    ' project' +
                    (author.projects.length > 1 ? 's' : '') ||
                  author.location ||
                  ''}
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.rightPanel}>
          <FavoriteButton project={project} />
          <KeyboardArrowUp style={{ color: 'red' }} />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(ProjectCard);
