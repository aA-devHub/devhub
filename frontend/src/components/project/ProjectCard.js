import React, { useState } from 'react';
import { connect } from 'react-redux';

import Carousel from 'react-material-ui-carousel';
import { useHistory } from 'react-router-dom';
import { makeStyles, Avatar, Typography } from '@material-ui/core';
import { Star, KeyboardArrowUp } from '@material-ui/icons';

// import { project as dummy } from './__tests__/dummy_data';
import * as COLORS from '../../colors';
import { getImageArray } from '../../selectors/projects';
import { addFavorite, deleteFavorite } from '../../actions/project_actions';

const mapStateToProps = (state, { project }) => {
  const author = state.entities.users[project.user];
  author.avatarUrl = author.avatarUrl || author.imageUrl;
  return {
    author,
    currentUser: state.session.user,
  };
};

const mapDispatchToProps = (dispatch, { project: { _id: projectId } }) => ({
  addFavorite: () => dispatch(addFavorite(projectId)),
  deleteFavorite: () => dispatch(deleteFavorite(projectId)),
});

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

function ProjectCard({
  project,
  author,
  currentUser,
  addFavorite,
  deleteFavorite,
}) {
  const history = useHistory();

  const [autoplay, setAutoplay] = useState(false);
  const classes = useStyles();

  const toggleFavorite = () => {
    if (currentUser.favorites.includes(project._id)) deleteFavorite();
    else addFavorite();
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
        {getImageArray(project).map((item, i) => (
          <div
            className={classes.image}
            key={i}
            onMouseOver={() => setAutoplay(true)}
            onMouseOut={() => setAutoplay(false)}
            onClick={() => history.push(`/projects/${project._id}`)}
          >
            <img src={item} alt={item.title} />
          </div>
        ))}
      </Carousel>

      <div className={classes.userDisplay}>
        <div className={classes.leftPanel}>
          <Avatar className={classes.avatar} src={author.avatarUrl} />
          <div>
            <div className={classes.userInfo}>
              <Typography
                style={{
                  color: COLORS.DEVDARKBLUE,
                  fontSize: 15,
                  fontWeight: 800,
                }}
              >
                {author.name}
              </Typography>
              <div className={classes.title}>
                <Typography style={{ fontSize: 13 }}>{author.title}</Typography>
              </div>
            </div>
            <div>
              <Typography
                style={{ color: 'red', fontSize: 15, fontWeight: 500 }}
              >
                {author.yearsOfExperience} years of experience
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.rightPanel}>
          <Star
            style={{ color: COLORS.GOLDSTAR, cursor: 'pointer' }}
            onClick={toggleFavorite}
          />
          <KeyboardArrowUp style={{ color: 'red' }} />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
