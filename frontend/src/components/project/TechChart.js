import React from 'react';

const Chart =
  'https://res.cloudinary.com/willwang/image/upload/v1609703195/barchart_se1ck8.png';

export const BarChart = () => (
  <div
    style={{
      width: '100%',
      backgroundImage:
        'url(https://res.cloudinary.com/willwang/image/upload/v1609703195/barchart_se1ck8.png)',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  ></div>
);
export const PieChart = () => (
  <div
    style={{
      backgroundImage: `url(${Chart})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  ></div>
);
