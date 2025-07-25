import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AmountLineChart = ({ transactions }) => {
  // Prepare data - group by date and sum amounts
  const prepareLineData = () => {
    const dateMap = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + transaction.amount;
      return acc;
    }, {});

    return Object.entries(dateMap)
      .map(([date, amount]) => ({
        date,
        amount: parseFloat(amount.toFixed(2)),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const lineData = prepareLineData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={lineData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`$${value}`, "Amount"]}
          labelFormatter={(date) => `Date: ${date}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          name="Total Amount"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AmountLineChart;
