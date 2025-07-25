import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  TablePagination,
  TableFooter,
  IconButton,
} from "@mui/material";
import {
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { motion } from "framer-motion";

// Animation variants (same as your transactions table)
const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const getRoleColor = (role) => {
  const colors = {
    global_admin: "primary",
    regional_admin: "secondary",
    sending_partner: "success",
    receiving_partner: "warning",
  };
  return colors[role] || "default";
};

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

const UsersTable = ({ users }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      style={{ width: "100%" }}
    >
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
          User List
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                <TableCell sx={{ fontWeight: 600 }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Region</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? users.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : users
              ).map((user, index) => (
                <motion.tr
                  key={user._id}
                  variants={fadeIn("up", "spring", index * 0.1, 0.5)}
                  component={motion(TableRow)}
                  whileHover={{ backgroundColor: theme.palette.action.hover }}
                  transition={{ duration: 0.2 }}
                >
                  <TableCell>
                    <Typography variant="body2">{user.username}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role.replace(/_/g, " ")}
                      color={getRoleColor(user.role)}
                      size="small"
                      sx={{
                        textTransform: "capitalize",
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" textTransform="capitalize">
                      {user.region}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                </motion.tr>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )}

              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No users found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={4}
                  count={users.length}
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
      </Paper>
    </motion.div>
  );
};

export default UsersTable;
