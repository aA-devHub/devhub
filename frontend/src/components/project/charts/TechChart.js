import React from 'react';

import ChartContainer from './ChartContainer';

export const BarChart = ({ project }) => (
  <ChartContainer project={project}>
    <div style={{ width: '50%', height: '50%' }}>
      <img src="https://res.cloudinary.com/willwang/image/upload/v1609703195/barchart_se1ck8.png" />
    </div>
  </ChartContainer>
);

export const PieChart = ({ project }) => (
  <ChartContainer project={project}>
    <div>
      <div style={{ width: '50%', height: '50%' }}>
        <img src="https://res.cloudinary.com/willwang/image/upload/v1609703195/barchart_se1ck8.png" />
      </div>
    </div>
  </ChartContainer>
);
