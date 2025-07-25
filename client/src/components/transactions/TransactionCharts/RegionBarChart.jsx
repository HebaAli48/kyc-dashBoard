import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RegionBarChart = ({ transactions }) => {
  // Prepare data - count transactions by region
  const prepareBarData = () => {
    const regionCounts = transactions.reduce((acc, transaction) => {
      acc[transaction.region] = (acc[transaction.region] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(regionCounts).map(([name, count]) => ({
      name,
      count,
    }));
  };

  const barData = prepareBarData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`${value} transactions`, "Count"]}
          labelFormatter={(region) => `Region: ${region}`}
        />
        <Legend />
        <Bar
          dataKey="count"
          fill="#8884d8"
          name="Transaction Count"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RegionBarChart;
