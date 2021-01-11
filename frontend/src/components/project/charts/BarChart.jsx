import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  // Legend, Tooltip
} from 'recharts';

const TechBarChart = ({ data, ...props }) => (
  <div className="barchart-container">
    <ResponsiveContainer height={150} width={600}>
      <BarChart
        data={data}
        barCategoryGap={1}
        layout="vertical"
        margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          width={150}
          padding={{ left: 20 }}
          dataKey="name"
        />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default TechBarChart;
