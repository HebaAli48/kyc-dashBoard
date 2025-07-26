import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TablePagination,
  TableFooter,
  useTheme,
  IconButton,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Chip,
  Grid,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../utils/motion";
import {
  LastPage,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Search,
  FilterList,
  Clear,
} from "@mui/icons-material";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        size="small"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        size="small"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        size="small"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        size="small"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

const AuditLogsTable = ({ logs }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [appliedFilters, setAppliedFilters] = useState([]);
  const theme = useTheme();

  // Extract unique actions for filter options
  const uniqueActions = [...new Set(logs.map((log) => log.action))];

  // Filter logs based on search and action filter
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      searchTerm === "" ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.details &&
        log.details.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.user?.username &&
        log.user.username.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesAction = actionFilter === "all" || log.action === actionFilter;

    return matchesSearch && matchesAction;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleActionFilterChange = (event) => {
    setActionFilter(event.target.value);
    setPage(0);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setActionFilter("all");
    setPage(0);
  };

  const removeFilter = (filterType) => {
    if (filterType === "search") {
      setSearchTerm("");
    } else if (filterType === "action") {
      setActionFilter("all");
    }
    setPage(0);
  };

  // Update applied filters display
  useEffect(() => {
    const filters = [];
    if (searchTerm)
      filters.push({ type: "search", label: `Search: "${searchTerm}"` });
    if (actionFilter !== "all")
      filters.push({ type: "action", label: `Action: ${actionFilter}` });
    setAppliedFilters(filters);
  }, [searchTerm, actionFilter]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredLogs.length) : 0;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      style={{ width: "100%", marginTop: "50px" }}
    >
      {/* Filter Controls */}
      <Box sx={{ mb: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Search Bar */}
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search logs by action, details, or user..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                size="small"
              />
            </Grid>

            {/* Action Filter */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Action</InputLabel>
                <Select
                  value={actionFilter}
                  onChange={handleActionFilterChange}
                  label="Action"
                >
                  <MenuItem value="all">All Actions</MenuItem>
                  {uniqueActions.map((action) => (
                    <MenuItem key={action} value={action}>
                      {action}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Applied Filters */}
          {appliedFilters.length > 0 && (
            <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <FilterList color="action" />
              <Typography variant="body2" color="text.secondary">
                Filters:
              </Typography>
              {appliedFilters.map((filter, index) => (
                <Chip
                  key={index}
                  label={filter.label}
                  size="small"
                  onDelete={() => removeFilter(filter.type)}
                />
              ))}
              <Button
                startIcon={<Clear />}
                onClick={clearAllFilters}
                size="small"
                sx={{ ml: "auto" }}
              >
                Clear All
              </Button>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Results Count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Showing {filteredLogs.length} of {logs.length} logs
      </Typography>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredLogs.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredLogs
            ).map((log, index) => (
              <TableRow
                key={log._id}
                component={motion.tr}
                initial="hidden"
                animate="show"
                variants={fadeIn("up", "spring", index * 0.05, 0.5)}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                  "& td": {
                    py: 2,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  },
                }}
              >
                <TableCell>
                  <Typography variant="body2" color="text.primary">
                    {new Date(log.createdAt).toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    textTransform="capitalize"
                  >
                    {log.action}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {log.user?.username || "System"}
                    </Typography>
                    {log.user?.email && (
                      <Typography variant="caption" color="text.secondary">
                        {log.user.email}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 200,
                    }}
                  >
                    {log.details}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}

            {filteredLogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No audit logs match your filters
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={filteredLogs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                sx={{
                  borderTop: `1px solid ${theme.palette.divider}`,
                  "& .MuiTablePagination-toolbar": {
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 1,
                  },
                  "& .MuiTablePagination-selectLabel": {
                    fontSize: "0.875rem",
                    margin: 0,
                  },
                  "& .MuiTablePagination-displayedRows": {
                    fontSize: "0.875rem",
                    margin: 0,
                  },
                  "& .MuiTablePagination-select": {
                    fontSize: "0.875rem",
                    padding: "6px 16px 6px 8px",
                    margin: 0,
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.25rem",
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default AuditLogsTable;
