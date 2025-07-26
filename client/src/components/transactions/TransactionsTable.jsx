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
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import { useState, useMemo } from "react";
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

const TransactionsTable = ({ transactions }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get unique regions and statuses for filter options
  const uniqueRegions = useMemo(() => {
    const regions = new Set();
    transactions.forEach((t) => t.region && regions.add(t.region));
    return Array.from(regions);
  }, [transactions]);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set();
    transactions.forEach((t) => t.status && statuses.add(t.status));
    return Array.from(statuses);
  }, [transactions]);

  // Filter transactions based on search and filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Search term filter
      const matchesSearch =
        searchTerm === "" ||
        transaction.sender?.username
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.receiver?.username
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.amount.toString().includes(searchTerm);

      // Status filter
      const matchesStatus =
        statusFilter === "all" || transaction.status === statusFilter;

      // Region filter
      const matchesRegion =
        regionFilter === "all" || transaction.region === regionFilter;

      return matchesSearch && matchesStatus && matchesRegion;
    });
  }, [transactions, searchTerm, statusFilter, regionFilter]);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredTransactions.length)
      : 0;

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setRegionFilter("all");
    setPage(0);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      style={{ width: "100%" }}
    >
      {/* Filter Controls */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
          alignItems: "center",
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
            maxWidth: 400,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0);
            }}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            {uniqueStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Region</InputLabel>
          <Select
            value={regionFilter}
            label="Region"
            onChange={(e) => {
              setRegionFilter(e.target.value);
              setPage(0);
            }}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="all">All Regions</MenuItem>
            {uniqueRegions.map((region) => (
              <MenuItem key={region} value={region}>
                {region.replace("_", " ")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {(searchTerm !== "" ||
          statusFilter !== "all" ||
          regionFilter !== "all") && (
          <Chip
            label="Clear filters"
            onClick={handleClearFilters}
            onDelete={handleClearFilters}
            deleteIcon={<Clear />}
            variant="outlined"
            sx={{
              borderRadius: 2,
              borderColor: theme.palette.divider,
              "& .MuiChip-deleteIcon": {
                color: theme.palette.text.secondary,
              },
            }}
          />
        )}

        <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
          <FilterList color="action" sx={{ mr: 1 }} />
          <Typography variant="caption" color="text.secondary">
            {filteredTransactions.length} results
          </Typography>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow
              sx={{ backgroundColor: theme.palette.background.default }}
            >
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Sender</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Receiver</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Region</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredTransactions.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredTransactions
            ).map((transaction, index) => (
              <TableRow
                key={transaction._id}
                component={motion.tr}
                variants={fadeIn("up", "spring", index * 0.1, 0.5)}
                initial="hidden"
                animate="show"
                whileHover={{ backgroundColor: theme.palette.action.hover }}
                transition={{ duration: 0.2 }}
              >
                <TableCell>
                  <Typography variant="body2">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {transaction.currencyFrom} {transaction.amount.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {transaction.sender?.username || "N/A"}
                  </Typography>
                  {transaction.sender?.role && (
                    <Typography variant="caption" color="text.secondary">
                      {transaction.sender.role}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {transaction.receiver?.username || "N/A"}
                  </Typography>
                  {transaction.receiver?.role && (
                    <Typography variant="caption" color="text.secondary">
                      {transaction.receiver.role}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" textTransform="capitalize">
                    {transaction.region?.replace("_", " ") || "N/A"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 100,
                      fontWeight: 600,
                      textTransform: "capitalize",
                      letterSpacing: 0.5,
                      backgroundColor:
                        transaction.status === "completed"
                          ? theme.palette.success.light + "80"
                          : transaction.status === "rejected"
                          ? theme.palette.error.light + "80"
                          : theme.palette.warning.light + "80",
                      color:
                        transaction.status === "completed"
                          ? theme.palette.success.dark
                          : transaction.status === "rejected"
                          ? theme.palette.error.dark
                          : theme.palette.warning.dark,
                      boxShadow: `0 1px 2px ${theme.palette.divider}`,
                      "&:hover": {
                        transform: "scale(1.03)",
                        transition: "transform 0.2s ease-in-out",
                      },
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      sx={{
                        lineHeight: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      {transaction.status}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}

            {filteredTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No transactions found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={filteredTransactions.length}
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

export default TransactionsTable;
