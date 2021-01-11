import TinderCard from 'react-tinder-card';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import './TinderCard.css';
import { makeStyles } from '@material-ui/core';
import { fetchProjects } from '../../actions/project_actions';
import { Zoom } from '@material-ui/core';

function TinderCards({ featured, fetchProjects }) {
  const [featuredProjects, setFeatured] = useState(featured);
  const [showImage, setShowImage] = useState(false);
  const [dispImage, setDispImage] = useState('none');
  const [display, setDisplay] = useState('');
  let counter = Object.keys(featuredProjects).length;
  useEffect(() => {
    fetchProjects();
  }, []);
  useEffect(() => {
    setFeatured(featured);
  }, [featured]);
  const imageUrl =
    'https://res.cloudinary.com/willwang/image/upload/v1609722148/LandingTop_jat0ue.png';
  const useStyles = makeStyles((theme) => ({
    root: {
      display: display,
    },
  }));
  const classes = useStyles();
  const outOfFrame = (imagesId) => {};

  const swiped = (direction, imagesId) => {
    counter--;
    if (counter <= 0) {
      setDisplay('none');
      setShowImage(true);
      setDispImage('');
    }
  };
  return (
    <div>
      <Zoom
        in={showImage}
        timeout={{ enter: 4500 }}
        style={{ diplay: dispImage }}
      >
        <img
          src={imageUrl}
          style={{
            display: dispImage,
            maxWidth: '100%',
          }}
        />
      </Zoom>
      <div className={clsx('tinderCards', classes.root)}>
        <div className="tinderCards__cardContainer">
          {Object.values(featuredProjects)
            .reverse()
            .map((project) => (
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
    </div>
  );
}

export default connect(
  (state) => ({ featured: state.entities.projects }),
  (dispatch) => ({ fetchProjects: () => dispatch(fetchProjects()) })
)(TinderCards);
