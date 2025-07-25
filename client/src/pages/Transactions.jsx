import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import AnalyticsDashboard from "../components/transactions/AnalyticsDashboard";
import TransactionsTable from "../components/transactions/TransactionsTable";
import AddTransactionDialog from "../components/transactions/AddTransactionDialog";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    currencyFrom: "USD",
    currencyTo: "USDC",
    sender: "",
    receiver: "",
    region: "",
    status: "pending",
  });

  const baseURL = "http://localhost:5000";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await axios.get(`${baseURL}/api/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            populate: "sender,receiver",
          },
        });

        setTransactions(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${baseURL}/api/transactions`,
        newTransaction,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions((prev) => [res.data, ...prev]);
      setOpenDialog(false);
      setNewTransaction({
        amount: "",
        currencyFrom: "USD",
        currencyTo: "USDC",
        sender: "",
        receiver: "",
        region: "",
        status: "pending",
      });
    } catch (error) {
      console.error("Failed to create transaction:", error);
      setError(error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Transactions Dashboard</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Transaction
        </Button>
      </Box>

      <AnalyticsDashboard transactions={transactions} />
      <TransactionsTable transactions={transactions} />

      <AddTransactionDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        transaction={newTransaction}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Transactions;
