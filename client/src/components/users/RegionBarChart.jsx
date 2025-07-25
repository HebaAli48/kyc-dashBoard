import React from "react";
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
import { useTheme } from "@mui/material";

const RegionBarChart = ({ data }) => {
  const theme = useTheme();

  // Sort data by count in descending order
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={sortedData} // Use the sorted data
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis type="number" tick={{ fill: theme.palette.text.secondary }} />
        <YAxis
          type="category"
          dataKey="region"
          width={150}
          tick={{ fill: theme.palette.text.secondary }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.divider,
            borderRadius: theme.shape.borderRadius,
          }}
        />
        <Legend />
        <Bar
          dataKey="count"
          fill={theme.palette.primary.main}
          name="Users"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RegionBarChart;
