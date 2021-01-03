import TinderCard from 'react-tinder-card';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import './TinderCard.css';
import { makeStyles } from '@material-ui/core';
import { fetchProjects } from '../../actions/project_actions';

function TinderCards({ featured, fetchProjects }) {
  const [featuredProjects, setFeatured] = useState(featured);
  let counter = 10;
  useEffect(() => {
    fetchProjects();
  }, []);
  useEffect(() => {
    setFeatured(featured);
  }, [featured]);
  const [display, setDisplay] = useState('');
  const useStyles = makeStyles((theme) => ({
    root: {
      display: display,
    },
  }));
  const classes = useStyles();
  const outOfFrame = (imagesId) => {};
  const swiped = (direction, imagesId) => {
    counter--;
    console.log('counter', counter);
    if (counter <= 0) setDisplay('none');
    console.log('counter', counter);
    console.log(imagesId, 'imageid is out of frame');
  };
  console.log('featuredProjects', featuredProjects);
  return (
    <div className={clsx('tinderCards', classes.root)}>
      <div className="tinderCards__cardContainer">
        {Object.values(featuredProjects).map((project) => (
          <TinderCard
            className="swipe"
            key={Math.random()}
            preventSwipe={['up, down']}
            onSwipe={(dir) => swiped(dir, project.id)}
            onCardLeftScreen={() => outOfFrame(project.id)}
          >
            <div
              className="card"
              style={{ backgroundImage: `url(${project.images.hero})` }}
            >
              <div
                style={{
                  padding: '4px 10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  display: 'inline-block',
                }}
              >
                <Typography style={{ fontWeight: 800 }}>
                  {project.title}
                </Typography>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default connect(
  (state) => ({ featured: state.entities.projects }),
  (dispatch) => ({ fetchProjects: () => dispatch(fetchProjects()) })
)(TinderCards);
