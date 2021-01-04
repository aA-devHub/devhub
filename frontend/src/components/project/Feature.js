import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { Typography, Divider } from '@material-ui/core';

export const Vertical = ({ features }) => {
  const [autoplay, setAutoplay] = useState(false);
  const renderFeatures = () => {
    return features.map((ftr, idx) => {
      const featureImages = [ftr.image, ftr.code];
      return (
        <div className="features-container">
          <div className="feature-container">
            <p className="feature-description">
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
              <Typography style={{ fontSize: 18 }}>
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
                  width: 300,
                }}
              >
                {featureImages.map((img, i) => (
                  <div
                    // className={classes.image}
                    className="feature-image-container"
                    style={{
                      height: 310,
                      //   width: 400
                    }}
                    key={i}
                    onMouseOver={() => setAutoplay(true)}
                    onMouseOut={() => setAutoplay(false)}
                  >
                    <img
                      src={img}
                      className="feature-img-img"
                      style={{
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        height: 300,
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <Divider style={{ marginBottom: 20 }} />
        </div>
      );
    });
  };

  return <div className="master-features-container">{renderFeatures()}</div>;
};

export const Horiz = ({ features }) => {
  const renderFeatures = () => {
    return features.map((ftr, idx) => {
      const featureImages = [ftr.image, ftr.code];
      return <div className="horiz-features-container"></div>;
    });
  };
  return <div>Horizontal Feature</div>;
};

export const Whirligig = ({ features }) => <div>Whirligig Features</div>;
