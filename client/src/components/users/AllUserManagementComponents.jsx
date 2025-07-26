import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  CircularProgress,
  Paper,
  TextField,
} from "@mui/material";
import StatsCard from "./StatsCard";
import RolePieChart from "./RolePieChart";
import RegionBarChart from "./RegionBarChart";
import UsersTable from "./UsersTable";
import { baseUrl } from "../../utils/Localization";

const AllUserManagementComponents = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No authentication token found");
        }

        const [usersRes, statsRes] = await Promise.all([
          axios.get(`${baseUrl}/api/auth`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`${baseUrl}/api/auth/stats`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        console.log("🚀 ~ fetchData ~ statsRes:", statsRes);
        console.log("🚀 ~ fetchData ~ usersRes:", usersRes);

        setUsers(usersRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally handle the error in your UI
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter((user) => {
    // Apply role and region filters
    const roleAndRegionMatch =
      (filter === "all" || user.role === filter) &&
      (regionFilter === "all" || user.region === regionFilter);

    // Apply search term filter if it exists
    if (!searchTerm) return roleAndRegionMatch;

    const searchLower = searchTerm.toLowerCase();
    return (
      roleAndRegionMatch &&
      (user.username.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower) ||
        (user.region && user.region.toLowerCase().includes(searchLower)))
    );
  });

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Users Management Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <StatsCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            color={theme.palette.primary.main}
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: "100%", borderRadius: 2, boxShadow: 3 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, textAlign: "center", fontWeight: 500 }}
            >
              User Distribution by Role
            </Typography>
            <RolePieChart data={stats?.roleDistribution || []} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: "100%", borderRadius: 2, boxShadow: 3 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, textAlign: "center", fontWeight: 500 }}
            >
              User Distribution by Region
            </Typography>
            <RegionBarChart data={stats?.regionDistribution || []} />
          </Paper>
        </Grid>
      </Grid>

      {/* Filters and Search */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          p: 2,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 1,
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Search Users"
          variant="outlined"
          size="small"
          sx={{ minWidth: 250, flexGrow: 1 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by username, role, or region"
        />
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Role Filter</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Role Filter"
          >
            <MenuItem value="all">All Roles</MenuItem>
            <MenuItem value="global_admin">Global Admin</MenuItem>
            <MenuItem value="regional_admin">Regional Admin</MenuItem>
            <MenuItem value="sending_partner">Sending Partner</MenuItem>
            <MenuItem value="receiving_partner">Receiving Partner</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Region Filter</InputLabel>
          <Select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            label="Region Filter"
          >
            <MenuItem value="all">All Regions</MenuItem>
            {Array.from(new Set(users.map((user) => user.region))).map(
              (region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Box>

      {/* Users Table */}
      <UsersTable users={filteredUsers} />
    </Box>
  );
};

export default AllUserManagementComponents;
