import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

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

const RolePieChart = ({ data }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          labelLine={false}
          dataKey="count"
          nameKey="role"
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value} users`, "Count"]}
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.divider,
            borderRadius: theme.shape.borderRadius,
          }}
        />
        <Legend
          formatter={(value) => (
            <span style={{ textTransform: "capitalize" }}>
              {value.replace(/_/g, " ")}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RolePieChart;
