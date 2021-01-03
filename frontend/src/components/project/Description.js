import React from 'react';
import { Typography } from '@material-ui/core';

function Description({ description }) {
  return (
    <Typography
      style={{
        margin: '2rem',
        lineHeight: '1.8em',
        fontSize: 30,
        fontWeight: 100,
        maxWidth: '70%',
      }}
    >
      {description}
    </Typography>
  );
}

export default Description;
