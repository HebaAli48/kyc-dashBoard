import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "#4CAF50"; // Green
    case "pending":
      return "#FFC107"; // Amber
    case "rejected":
      return "#F44336"; // Red
    default:
      return "#9E9E9E"; // Grey
  }
};

// Custom label renderer (for full pie)
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 0.7;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight="bold"
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

const StatusPieChart = ({ transactions }) => {
  const statusData = transactions.reduce((acc, transaction) => {
    acc[transaction.status] = (acc[transaction.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(statusData).map(([name, value]) => ({
    name,
    value,
    color: getStatusColor(name),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius={90}
          labelLine={false}
          dataKey="value"
          label={renderCustomizedLabel}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} transactions`, "Count"]} />
        <Legend
          formatter={(value) => (
            <span style={{ textTransform: "capitalize" }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusPieChart;
