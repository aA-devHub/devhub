import { PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TechPieChart = ({ data, ...props }) => (
  <div>
    <div style={{ width: '50%', height: '50%' }}>
      <PieChart {...props}>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      {/* <img src="https:res.cloudinary.com/willwang/image/upload/v1609703195/barchart_se1ck8.png" /> */}
    </div>
  </div>
);
export default TechPieChart;
