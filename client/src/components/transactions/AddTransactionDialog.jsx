import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/Localization";

const AddTransactionDialog = ({ open, onClose }) => {
  const currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "USDC", label: "USDC" },
  ];

  const [transaction, setTransaction] = useState({
    amount: "",
    currencyFrom: "USD",
    currencyTo: "USDC",
    receiverUsername: "",
    status: "pending",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReverseCurrencies = () => {
    setTransaction((prev) => ({
      ...prev,
      currencyFrom: prev.currencyTo,
      currencyTo: prev.currencyFrom,
    }));
  };

  const getDisabledCurrencies = (fieldName) => {
    if (fieldName === "currencyFrom") {
      return [transaction.currencyTo];
    }
    return [transaction.currencyFrom];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const response = await axios.post(
        `${baseUrl}/api/transactions`,
        {
          ...transaction,
          sender: userId, // Set sender from logged-in user
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Reset form and close dialog
      setTransaction({
        amount: "",
        currencyFrom: "USD",
        currencyTo: "USDC",
        receiverUsername: "",
        status: "pending",
      });
      onClose();
      return response.data;
    } catch (err) {
      console.error("Transaction creation failed:", err);
      setError(err.response?.data?.message || "Failed to create transaction");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Transaction</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            margin="normal"
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={transaction.amount}
            onChange={handleInputChange}
            required
            inputProps={{ min: 0.01, step: 0.01 }}
          />

          <Stack direction="row" alignItems="center" spacing={3} mt={3}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Currency From</InputLabel>
              <Select
                name="currencyFrom"
                value={transaction.currencyFrom}
                onChange={handleInputChange}
                label="Currency From"
                required
              >
                {currencyOptions.map((option) => (
                  <MenuItem
                    key={`from-${option.value}`}
                    value={option.value}
                    disabled={getDisabledCurrencies("currencyFrom").includes(
                      option.value
                    )}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <IconButton
              onClick={handleReverseCurrencies}
              sx={{ mt: 2 }}
              aria-label="Reverse currencies"
            >
              <SwapHorizIcon />
            </IconButton>

            <FormControl fullWidth margin="normal">
              <InputLabel>Currency To</InputLabel>
              <Select
                name="currencyTo"
                value={transaction.currencyTo}
                onChange={handleInputChange}
                label="Currency To"
                required
              >
                {currencyOptions.map((option) => (
                  <MenuItem
                    key={`to-${option.value}`}
                    value={option.value}
                    disabled={getDisabledCurrencies("currencyTo").includes(
                      option.value
                    )}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <TextField
            margin="normal"
            fullWidth
            label="Receiver Username"
            name="receiverUsername"
            value={transaction.receiverUsername}
            onChange={handleInputChange}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={
            !transaction.amount ||
            !transaction.currencyFrom ||
            !transaction.currencyTo ||
            !transaction.receiverUsername ||
            loading
          }
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransactionDialog;
