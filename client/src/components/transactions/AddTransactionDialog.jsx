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
} from "@mui/material";

const AddTransactionDialog = ({
  open,
  onClose,
  transaction,
  onInputChange,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Transaction</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={transaction.amount}
            onChange={onInputChange}
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Currency From</InputLabel>
            <Select
              name="currencyFrom"
              value={transaction.currencyFrom}
              onChange={onInputChange}
              label="Currency From"
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
            </Select>
          </FormControl>

          {/* Other form fields... */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransactionDialog;
