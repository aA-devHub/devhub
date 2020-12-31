import TinderCard from 'react-tinder-card';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import './TinderCard.css';
import { makeStyles } from '@material-ui/core';

function TinderCards({ imgs }) {
  const [images, setImages] = useState({});
  useEffect(() => {
    setImages({
      0: {
        id: 0,
        title: 'color schema',
        imgUrl:
          'https://res.cloudinary.com/willwang/image/upload/v1608279567/11_mzq0ms.webp',
      },
      1: {
        id: 1,
        title: 'Will Portfolio',
        imgUrl:
          'https://res.cloudinary.com/willwang/image/upload/v1608279611/16_eukmph.webp',
      },
      2: {
        id: 2,
        title: 'Mobile app',
        imgUrl:
          'https://res.cloudinary.com/willwang/image/upload/v1608279609/6_iu6kvm.webp',
      },
      3: {
        id: 3,
        title: 'web ideas',
        imgUrl:
          'https://res.cloudinary.com/willwang/image/upload/v1608279601/3_juvcam.webp',
      },
      4: {
        id: 4,
        title: 'uber clonne',
        imgUrl:
          'https://res.cloudinary.com/willwang/image/upload/v1608279584/14_nyzdla.webp',
      },
      5: {
        id: 5,
        title: 'uber clone',
        imgUrl:
          'https://res.cloudinary.com/willwang/image/upload/v1608279584/14_nyzdla.webp',
      },
      6: {
        id: 6,
        title: 'uber clon',
        imgUrl:
          'https://res.cloudinary.com/willwang/image/upload/v1608279584/14_nyzdla.webp',
      },
      7: {
        id: 7,
        title: 'uber clo',
        imgUrl:
          'https://res.cloudinary.com/willwang/image/upload/v1608279584/14_nyzdla.webp',
      },
    });
  }, []);
  const [display, setDisplay] = useState('');
  const useStyles = makeStyles((theme) => ({
    root: {
      display: display,
    },
  }));
  const classes = useStyles();
  let counter = 7;
  const outOfFrame = (imagesId) => {
    // const newImages = { ...images };
    // delete newImages[imagesId];
    // setImages(newImages);
  };
  const swiped = (direction, imagesId) => {
    counter--;
    console.log('counter', counter);
    if (counter <= 0) setDisplay('none');
    console.log('counter', counter);
    console.log(imagesId, 'imageid is out of frame');
  };
  //   const prev = counter;
  //   setCounter(prev - 1);
  //   console.log('counter', counter);
  // };
  // fetchData();

  console.log('images', images);
  return (
    <div className={clsx('tinderCards', classes.root)}>
      <div className="tinderCards__cardContainer">
        {Object.values(images).map((image) => (
          <TinderCard
            className="swipe"
            key={image.title}
            preventSwipe={['up, down']}
            onSwipe={(dir) => swiped(dir, image.id)}
            onCardLeftScreen={() => outOfFrame(image.id)}
          >
            <div
              className="card"
              style={{ backgroundImage: `url(${image.imgUrl})` }}
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
                  {image.title}
                </Typography>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;
