import { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Alert, Typography } from "@mui/material";
import AuditLogsTable from "../components/audit/AuditLogsTable";
import AuditLogsChart from "../components/audit/AuditLogsChart";
import AuditLogsStats from "../components/audit/AuditLogsStats";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = "http://localhost:5000";

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await axios.get(`${baseURL}/api/audit`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLogs(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch audit logs:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Audit Logs
      </Typography>

      <AuditLogsStats logs={logs} />
      <AuditLogsChart logs={logs} />
      <AuditLogsTable logs={logs} />
    </Box>
  );
};

export default AuditLogs;
