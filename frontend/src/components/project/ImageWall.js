import React, { useState, useEffect } from 'react';
import * as COLORS from '../../colors';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core';
import MasonWall from './Mason';
import ThreeWall from './Three';

export const CarouselWall = ({ images }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: theme.spacing(10),
      borderRadius: 20,
      boxShadow: '0px 10px 15px 0px rgba(0, 0, 0, 0.1)',
    },
  }));
  const classes = useStyles();
  const { hero, secondaries } = images;
  const imgs = [hero].concat(secondaries);
  const [autoplay, setAutoplay] = useState(false);
  return (
    <div className={classes.root}>
      <Carousel
        animation="slide"
        autoPlay={autoplay}
        style={{
          height: 500,
        }}
        interval={1500}
        indicators={true}
        timeout={500}
      >
        {imgs.map((item, i) => (
          <div
            className={classes.image}
            style={{
              width: 800,
              height: 550,
            }}
            key={i}
            onMouseOver={() => setAutoplay(true)}
            onMouseOut={() => setAutoplay(false)}
          >
            <img
              src={item}
              style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                maxWidth: 800,
                maxHeight: 600,
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export const Mason = ({ images }) => {
  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    if (images.hero)
      setImgs(
        [images.hero].concat(images.secondaries).concat(images.secondaries)
      );
  }, [images]);
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: '#D7F5F4',
      padding: 10,
      boxShadow: '0px 10px 15px 0px rgba(0, 0, 0, 0.1)',
    },
  }));
  const classes = useStyles();

  console.log('imgs', imgs);

  return (
    <div className={classes.root}>
      {imgs.length ? (
        <MasonWall
          images={imgs.map((src) => {
            let height = Math.random() > 0.5 ? 2 : 1;
            return {
              key: Math.random(),
              src,
              height,
              width: height === 1 ? 2 : 3,
            };
          })}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};
export const Three = ({ images }) => {
  return <ThreeWall images={images} />;
};
