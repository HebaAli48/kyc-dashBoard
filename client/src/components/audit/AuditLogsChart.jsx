import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { colors } from "../../utils/Colors";

const getActionColor = (action) => {
  return colors[action.toLowerCase()] || "#9E9E9E"; // Grey for unknown actions
};

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

const AuditLogsChart = ({ logs }) => {
  // Process data
  const actionCounts = logs.reduce((acc, log) => {
    acc[log.action] = (acc[log.action] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(actionCounts).map(([name, value]) => ({
    name,
    value,
    color: getActionColor(name),
  }));

  if (pieData.length === 0) {
    return (
      <Box sx={{ height: 400, display: "grid", placeItems: "center" }}>
        <Typography color="text.secondary">No audit logs available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 300 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Audit Log Actions
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
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
          <Tooltip formatter={(value) => [`${value} logs`, "Count"]} />
          <Legend
            formatter={(value) => (
              <span style={{ textTransform: "capitalize" }}>
                {value.replace(/_/g, " ")}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AuditLogsChart;
