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
import useAuthenticate from "../utils/useAuthenticate";
import { baseUrl } from "../utils/Localization";

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
  const {
    token,
    isGlobalAdmin,
    isRegionalAdmin,
    isSendingPartner,
    isRecevingPartner,
  } = useAuthenticate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Add cache-busting parameter
        const cacheBuster = Date.now();

        const res = await axios.get(`${baseUrl}/api/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            populate: "sender,receiver",
            _: cacheBuster, // Forces fresh data when needed
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
      <Box mb={3}>
        <Typography variant="h4" pb={5}>
          {isSendingPartner || isRecevingPartner
            ? "Transactions "
            : "Transactions Dashboard"}
        </Typography>
        {(isSendingPartner || isRecevingPartner) && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            fullWidth
          >
            Add Transaction
          </Button>
        )}
      </Box>
      {(isGlobalAdmin || isRegionalAdmin) && (
        <>
          <AnalyticsDashboard transactions={transactions} />
          <TransactionsTable transactions={transactions} />
        </>
      )}

      <AddTransactionDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Box>
  );
};

export default Transactions;
