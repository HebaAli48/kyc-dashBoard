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
} from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../utils/motion"; // Custom animation variants
import {
  LastPage,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      style={{ width: "100%" }}
    >
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
              ? transactions.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : transactions
            ).map((transaction, index) => (
              <motion.tr
                key={transaction._id}
                variants={fadeIn("up", "spring", index * 0.1, 0.5)}
                component={motion(TableRow)}
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
                      justifyContent: "center", // Center text horizontally
                      minWidth: 100, // Set a fixed minimum width
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
              </motion.tr>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}

            {transactions.length === 0 && (
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
                count={transactions.length}
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
