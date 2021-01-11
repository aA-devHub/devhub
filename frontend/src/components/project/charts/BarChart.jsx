import React from 'react';

const renderLabel = ({ x, y, name, fill, midAngle, ...props }) => {
  const anchor = midAngle > 45 && midAngle < 275 ? 'end' : 'start';
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      width={100}
      height={100}
      fontSize={30}
      textAnchor={anchor}
    >
      {name}
    </text>
  );
};

const BarChart = ({ project }) => (
  <div style={{ width: '50%', height: '50%' }}>
    <img src="https://res.cloudinary.com/willwang/image/upload/v1609703195/barchart_se1ck8.png" />
  </div>
);

export default BarChart;
