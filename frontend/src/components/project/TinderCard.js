import TinderCard from 'react-tinder-card';
import * as COLORS from '../../colors';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import './TinderCard.css';
import { makeStyles } from '@material-ui/core';
import { fetchFeaturedProjects } from '../../actions/project_actions';
import { addFavorite } from '../../actions/project_actions';
import { Zoom } from '@material-ui/core';
function TinderCards({ featured, fetchProjects, addFavorite }) {
  const history = useHistory();
  const [featuredProjects, setFeatured] = useState(featured);
  const [showImage, setShowImage] = useState(false);
  const [dispImage, setDispImage] = useState('none');
  const [display, setDisplay] = useState('');
  let counter = Object.keys(featuredProjects).length;
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  useEffect(() => {
    setFeatured(featured);
  }, [featured, setFeatured]);
  const imageUrl =
    'https://res.cloudinary.com/willwang/image/upload/v1609722148/LandingTop_jat0ue.png';
  const useStyles = makeStyles((theme) => ({
    root: {
      display: display,
    },
  }));
  const classes = useStyles();

  const swiped = (direction, projectId) => {
    counter--;
    console.log('counter', counter);
    if (counter <= 0) {
      setDisplay('none');
      setShowImage(true);
      setDispImage('');
    }
    console.log('counter', counter);
    if (direction === 'right') {
      addFavorite(projectId);
    }
  };
  return (
    <div>
      <Zoom
        in={showImage}
        timeout={{ enter: 100 }}
        style={{ diplay: dispImage }}
      >
        <img
          src={imageUrl}
          style={{
            display: dispImage,
            maxWidth: '100%',
          }}
          alt="featured projects"
        />
      </Zoom>
      <div className={clsx('tinderCards', classes.root)}>
        <div className={clsx('tinderCards__cardContainer')}>
          {Object.values(featuredProjects)
            .reverse()
            .map((project) => (
              <TinderCard
                className="swipe"
                key={Math.random()}
                preventSwipe={['up, down']}
                onSwipe={(dir) => {
                  swiped(dir, project._id);
                }}
              >
                <div
                  className="card"
                  style={{
                    backgroundImage: `url(${project.images.hero})`,
                    backgroundPosition: 'left 0px top 0px',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '10%',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                      backgroundColor: COLORS.NAVBARBLACK,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: '2%',
                        display: 'flex',
                        width: '15%',
                        justifyContent: 'space-around',
                      }}
                    >
                      <div
                        style={{
                          cursor: 'pointer',
                          width: 15,
                          height: 15,
                          borderRadius: 99,
                          backgroundColor: '#FF5E57',
                        }}
                        onClick={() => {
                          setDisplay('none');
                          setShowImage(true);
                          setDispImage('');
                        }}
                      ></div>
                      <div
                        style={{
                          cursor: 'pointer',
                          width: 15,
                          height: 15,
                          borderRadius: 99,
                          backgroundColor: '#FEBB2F',
                        }}
                        onClick={() => {
                          setDisplay('none');
                          setShowImage(true);
                          setDispImage('');
                        }}
                      ></div>
                      <div
                        style={{
                          cursor: 'pointer',
                          width: 15,
                          height: 15,
                          borderRadius: 99,
                          backgroundColor: '#26C842',
                        }}
                        onClick={() => {
                          history.push(`/projects/${project._id}`);
                        }}
                      ></div>
                    </div>
                    <Typography
                      style={{
                        cursor: 'pointer',
                        color: 'white',
                        fontWeight: '800',
                        textDecoration: 'underline',
                      }}
                      onClick={() => {
                        history.push(`/projects/${project._id}`);
                      }}
                    >
                      {project.title.toUpperCase()}
                    </Typography>
                  </div>

                  <div
                    className="hint"
                    id="hint"
                    style={{
                      display: 'flex',
                      position: 'absolute',
                      justifyContent: 'center',
                      alignItems: 'center',
                      left: 0,
                      top: '90%',
                      width: '100%',
                      backgroundColor: 'rgba(255,255,255, 1.0)',
                      height: '10%',
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '0 3%',
                      }}
                    >
                      <Typography
                        style={{ fontWeight: 400, color: COLORS.DEVBLUE }}
                      >
                        Drag left to see the next
                      </Typography>
                      <Typography
                        style={{ fontWeight: 400, color: COLORS.DEVBLUE }}
                      >
                        Drag right to favorite
                      </Typography>
                    </div>
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
  (state) => ({ featured: state.entities.featured }),
  (dispatch) => ({
    fetchProjects: () => dispatch(fetchFeaturedProjects()),
    addFavorite: (projectId) => dispatch(addFavorite(projectId)),
  })
)(TinderCards);
