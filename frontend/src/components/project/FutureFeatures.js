import { Typography } from '@material-ui/core';
import { disconnect } from 'mongoose';
import React from 'react';

function FutureFeatures({ features }) {
  const futureFeatures = features.map((ftr, idx) => (
    <div className="future-feature-bucket">
      <Typography
        style={{
          lineHeight: '1.4em',
          fontSize: 24,
          fontWeight: 100,
        }}
      >
        {ftr.title}
      </Typography>
      <Typography style={{ fontSize: 18 }}>{ftr.description}</Typography>
    </div>
  ));
  return (
    <div className="future-features-grid">
      <img
        className="future-features-image"
        src="https://cdn.tkmkt.com/wp-content/uploads/2019/04/tk-services-01-1024x866.png"
      ></img>
      <div className="future-features-desc">
        <Typography
          style={{
            lineHeight: '1.8em',
            fontSize: 30,
            fontWeight: 100,
          }}
        >
          Future Features
        </Typography>
        <div className="future-features-container">{futureFeatures}</div>
      </div>
    </div>
  );
}

export default FutureFeatures;
