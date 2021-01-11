import React from 'react';
// import { Typography } from '@material-ui/core';
import {
  // ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  // Legend, Tooltip
} from 'recharts';

const RADIAN = Math.PI / 180;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const renderLabel = ({ x, y, name, fill, midAngle, ...props }) => {
  const anchor = midAngle > 45 && midAngle < 275 ? 'end' : 'start';
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      width={100}
      height={100}
      fontSize={16}
      textAnchor={anchor}
    >
      {name}
    </text>
  );
};

// const RenderTooltip = ({ active, payload, label }) => {
//   if (active) {
//     return (
//       <div className="language-tooltip">
//         <Typography>{label}</Typography>
//       </div>
//     );
//   }
//   return null;
// };

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active) {
// 	return (
// 	  <div className="custom-tooltip">
// 		<p className="label">{`${label} : ${payload[0].value}`}</p>
// 		{/* <p className="intro">{getIntroOfPage(label)}</p> */}
// 		<p className="desc">Anything you want can be displayed here.</p>
// 	  </div>
// 	);
//   }
//   return null;
// };

const TechPieChart = ({ data, ...props }) => {
  // const [activeIndex, setActiveIndex] = React.useState(0);
  // const onPieEnter = (data, index) => {
  //   setActiveIndex(index);
  // };
  return (
    // <ResponsiveContainer>
    <div className="tech-pie-chart" style={{ width: '100%', height: '100%' }}>
      <PieChart {...props}>
        <Pie
          data={data}
          /* cx={120} */
          /* cy={200} */
          innerRadius={80}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={5}
          /* onMouseEnter={onPieEnter} */
          label={renderLabel}
        >
          {data.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
          {/* <Legend /> */}
          {/* <Tooltip */}
          {/*   position={{ y: -50 }} */}
          {/*   cursor={true} */}
          {/*   content={<CustomTooltip />} */}
          {/* /> */}
          {/* <Tooltip content={renderTooltip}/> */}
        </Pie>
      </PieChart>
    </div>
    // </ResponsiveContainer>
  );
};

export default TechPieChart;
