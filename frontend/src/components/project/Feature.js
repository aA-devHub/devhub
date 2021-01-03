import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { Typography } from '@material-ui/core';

export const Vertical = (features) => {
  const [autoplay, setAutoplay] = useState(false);
  const renderFeatures = () => {
    return features.map((ftr, idx) => {
      const featureImages = [ftr.image];
      return (
        <div>
          <Typography
            style={{
              lineHeight: '1.8em',
              fontSize: 30,
              fontWeight: 100,
              maxWidth: '70%',
            }}
          >
            {ftr.title}
          </Typography>
          <div className="feature-container">
            <p className="feature-description">
              <Typography
                style={{
                  fontSize: 18,
                }}
              >
                {ftr.description}
              </Typography>
            </p>
            <div className="feature-images">
              <Carousel
                animation="slide"
                autoPlay={autoplay}
                interval={1500}
                indicators={true}
                timeout={500}
                style={{
                  height: 100,
                }}
              >
                {featureImages.map((img, i) => {
                  <div
                    // className={classes.image}
                    style={{
                      width: 400,
                      // height: 550,
                    }}
                    key={i}
                    onMouseOver={() => setAutoplay(true)}
                    onMouseOut={() => setAutoplay(false)}
                  >
                    <img
                      src={img}
                      style={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        maxWidth: 400,
                        // maxHeight: 200,
                      }}
                    />
                  </div>;
                })}
                <img src={ftr.image}></img>
              </Carousel>
            </div>
          </div>
        </div>
      );
    });
  };

  return <div>{renderFeatures()}</div>;
};

export const Horiz = (features) => {
  return <div>Horizontal Feature</div>;
};

export const Whirligig = (features) => <div>Whirligig Features</div>;
