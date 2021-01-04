import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { Typography } from '@material-ui/core';

export const Vertical = ({ features }) => {
  const [autoplay, setAutoplay] = useState(false);
  const renderFeatures = () => {
    return features.map((ftr, idx) => {
      const featureImages = [
        ftr.image,
        'https://github.com/kaycbas/rocket/blob/main/app/assets/images/readme/save_3.gif?raw=true',
        'https://ph-files.imgix.net/0668248b-fcc0-4402-a1a2-3a01f1c62425.png?auto=format&fit=crop&frame=1&h=512&w=1024',
      ];
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
        </div>
      );
    });
  };

  return <div className="master-features-container">{renderFeatures()}</div>;
};

export const Horiz = ({ features }) => {
  const renderFeatures = () => {
    return features.map((ftr, idx) => {
      const featureImages = [
        ftr.image,
        'https://github.com/kaycbas/rocket/blob/main/app/assets/images/readme/save_3.gif?raw=true',
        'https://ph-files.imgix.net/0668248b-fcc0-4402-a1a2-3a01f1c62425.png?auto=format&fit=crop&frame=1&h=512&w=1024',
      ];
      return <div className="horiz-features-container"></div>;
    });
  };
  return <div>Horizontal Feature</div>;
};

export const Whirligig = ({ features }) => <div>Whirligig Features</div>;
