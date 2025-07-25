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
import { Avatar, Box, Typography } from "@mui/material";

const TopSendersChart = ({ transactions }) => {
  // Prepare data - count transactions by sender and get top 5
  const prepareSenderData = () => {
    const senderCounts = transactions.reduce((acc, transaction) => {
      if (transaction.sender) {
        const senderId = transaction.sender._id || transaction.sender;
        acc[senderId] = acc[senderId] || {
          count: 0,
          sender: transaction.sender,
        };
        acc[senderId].count += 1;
      }
      return acc;
    }, {});

    return Object.values(senderCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8) // Get top 8 senders
      .map((item) => ({
        name: item.sender.username,
        count: item.count,
        avatar: item.sender.username?.charAt(0).toUpperCase(),
        role: item.sender.role,
      }));
  };

  const senderData = prepareSenderData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          sx={{
            backgroundColor: "background.paper",
            p: 2,
            borderRadius: 1,
            boxShadow: 2,
          }}
        >
          <Box display="flex" alignItems="center" mb={1}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>{data.avatar}</Avatar>
            <Typography variant="subtitle1">{data.name}</Typography>
          </Box>
          <Typography variant="body2">Role: {data.role}</Typography>
          <Typography variant="body2">
            Transactions: <strong>{data.count}</strong>
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={senderData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis
          type="category"
          dataKey="name"
          width={100}
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="count"
          name="Transaction Count"
          fill="#8884d8"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopSendersChart;
