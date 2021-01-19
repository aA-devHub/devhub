import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Typography, Divider } from '@material-ui/core';

export const Vertical = ({ features }) => {
  const [autoplay, setAutoplay] = useState(false);
  const renderFeatures = () => {
    return features.map((ftr, idx) => {
      const featureImages = [ftr.image, ftr.code];
      return (
        <div key={idx} className="features-container">
          <Divider style={{ marginBottom: 20 }} />
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
                      alt="Feature"
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

  return (
    <React.Fragment>
      {/* <Divider style={{ marginBottom: 20 }} /> */}
      <div className="master-features-container">{renderFeatures()}</div>
      {/* <Divider style={{ marginBottom: 20, width: 1200 }} />  */}
    </React.Fragment>
  );
};

export const Horiz = ({ features }) => {
  // const [autoplay, setAutoplay] = useState(false);
  const renderFeatures = () => {
    return features.map((ftr, idx) => {
      const featureImages = [ftr.image, ftr.code];
      return (
        <div className="horiz-features-container">
          <Divider style={{ marginBottom: 20, width: 1200 }} />
          <div className="counter">
            <img
              className="horiz-primary-img"
              src={featureImages[0]}
              alt="Project Hero"
            />
            <div className="horiz-ftr-details-container">
              <div className="horiz-feature-description">
                <Divider style={{ marginBottom: 20 }} />
                <Typography
                  style={{
                    lineHeight: '1.8em',
                    fontSize: 30,
                    fontWeight: 100,
                    maxWidth: '70%',
                    paddingLeft: 10,
                    paddingBottom: 15,
                  }}
                >
                  {ftr.title}
                </Typography>
                <Typography style={{ fontSize: 18 }}>
                  {ftr.description}
                </Typography>
              </div>
              <img
                className="horiz-secondary-img"
                src={featureImages[1]}
                alt="Secondary"
              />
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <React.Fragment>
      {/* <Divider style={{ marginBottom: 20 }} /> */}
      <div className="master-horiz-container">{renderFeatures()}</div>
    </React.Fragment>
  );
};

export const Whirligig = ({ features }) => {
  const [autoplay, setAutoplay] = useState(false);
  const renderFeatures = () => {
    return features.map((ftr, idx) => {
      const featureImages = [ftr.image, ftr.code];
      return (
        <div className="whirl-features-container">
          <div className="whirl-carousel">
            <Carousel
              animation="slide"
              autoPlay={autoplay}
              interval={1500}
              indicators={true}
              timeout={500}
              style={{
                maxWidth: 300,
              }}
            >
              {featureImages.map((img, i) => (
                <div
                  className="feature-image-container"
                  style={
                    {
                      // height: 310,
                      //   width: 400
                    }
                  }
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
                      // height: 300,
                    }}
                    alt="Feature"
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="whirl-feature-details">
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
            <Typography style={{ fontSize: 18 }}>{ftr.description}</Typography>
          </div>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <Divider style={{ marginBottom: 20, width: 1200 }} />
      <div className="master-whirl-container">{renderFeatures()}</div>
    </React.Fragment>
  );
};
