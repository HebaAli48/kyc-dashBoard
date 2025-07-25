import { Box, Typography, Paper, Stack } from "@mui/material";

const AuditLogsStats = ({ logs }) => {
  const totalLogs = logs.length;
  const activeUsers = new Set(logs.map((log) => log.user?._id)).size;
  const lastUpdated = logs[0]?.createdAt;

  return (
    <Box sx={{ mb: 4 }}>
      <Stack direction="row" spacing={2}>
        <StatCard title="Total Actions" value={totalLogs} color="primary" />
        <StatCard title="Active Users" value={activeUsers} color="secondary" />
        <StatCard
          title="Last Activity"
          value={lastUpdated ? new Date(lastUpdated).toLocaleString() : "N/A"}
          color="info"
        />
      </Stack>
    </Box>
  );
};

const StatCard = ({ title, value, color }) => (
  <Paper
    sx={{
      p: 3,
      flex: 1,
      borderRadius: 2,
      borderLeft: `4px solid`,
      borderColor: `${color}.main`,
    }}
  >
    <Typography variant="subtitle2" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="h5" color={`${color}.dark`} fontWeight={600}>
      {value}
    </Typography>
  </Paper>
);

export default AuditLogsStats;
