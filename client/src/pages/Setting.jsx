import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  Chip,
  Alert,
  Modal,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Construction as ConstructionIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

const Setting = () => {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [email, setEmail] = useState("global_admin");
  const [name, setName] = useState("Demo User");
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "regional_admin",
    region: "",
  });

  const roles = [
    "global_admin",
    "regional_admin",
    "sending_partner",
    "receiving_partner",
  ];

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleCreateUserOpen = () => {
    setOpenCreateUser(true);
  };

  const handleCreateUserClose = () => {
    setOpenCreateUser(false);
    setNewUser({
      username: "",
      password: "",
      role: "regional_admin",
      region: "",
    });
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateUserSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would call an API here
    console.log("New user data:", newUser);
    handleCreateUserClose();
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 800,
        mx: "auto",
        position: "relative",
        opacity: 0.9,
        filter: "grayscale(10%)",
      }}
    >
      {/* Demo Mode Banner */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1,
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleCreateUserOpen}
          sx={{
            fontWeight: "bold",
            backdropFilter: "blur(4px)",
            backgroundColor: "primary.main",
            color: "white",
          }}
        >
          Create User
        </Button>
        <Chip
          icon={<ConstructionIcon />}
          label="DEMO UI ONLY"
          color="warning"
          variant="outlined"
          sx={{
            fontWeight: "bold",
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(255,255,255,0.7)",
          }}
        />
      </Box>

      {/* Create User Modal */}
      <Modal
        open={openCreateUser}
        onClose={handleCreateUserClose}
        aria-labelledby="create-user-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create New User
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            This is a demonstration. No users will actually be created.
          </Alert>
          <form onSubmit={handleCreateUserSubmit}>
            <TextField
              label="Username"
              name="username"
              value={newUser.username}
              onChange={handleUserInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={newUser.password}
              onChange={handleUserInputChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={newUser.role}
                label="Role"
                onChange={handleUserInputChange}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role.split("_").join(" ")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Region"
              name="region"
              value={newUser.region}
              onChange={handleUserInputChange}
              fullWidth
              margin="normal"
              required
            />
            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleCreateUserClose}
                sx={{ mr: 2 }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Create User
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Rest of your existing component */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 3,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        Settings
        <ConstructionIcon color="action" />
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        This is a demonstration interface. Changes will not affect actual
        settings.
      </Alert>

      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px dashed",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              mr: 2,
              filter: "grayscale(30%)",
              backgroundColor: theme.palette.grey[300],
            }}
          >
            <AccountIcon
              sx={{ fontSize: 40, color: theme.palette.grey[600] }}
            />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Demo User Profile
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is a Demo UI - changes are not saved
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled
            sx={{ mb: 2 }}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            disabled
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px dashed",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          UI Demonstration
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              {darkMode ? (
                <DarkModeIcon color="disabled" />
              ) : (
                <LightModeIcon color="disabled" />
              )}
            </ListItemIcon>
            <ListItemText
              primary="Theme Settings"
              secondary="Visual demonstration only"
            />
            <Switch
              checked={darkMode}
              onChange={handleThemeChange}
              color="primary"
            />
          </ListItem>

          <Divider component="li" sx={{ my: 1 }} />

          <ListItem>
            <ListItemIcon>
              <LanguageIcon color="disabled" />
            </ListItemIcon>
            <ListItemText
              primary="Language Preferences"
              secondary="Not functional in demo"
            />
            <Button variant="outlined" size="small">
              Change
            </Button>
          </ListItem>
        </List>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px dashed",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Notification Demo
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              color="primary"
            />
          }
          label="Enable Notifications (Demo)"
          sx={{ mb: 1 }}
        />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ ml: 4, mb: 2 }}
        >
          UI demonstration only - no actual notifications
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={securityAlerts}
              onChange={() => setSecurityAlerts(!securityAlerts)}
              color="primary"
            />
          }
          label="Security Alerts (Demo)"
          sx={{ mb: 1 }}
        />

        <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
          Visual demonstration of toggle controls
        </Typography>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px dashed",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Security Controls
        </Typography>

        <Button
          variant="outlined"
          startIcon={<SecurityIcon color="disabled" />}
          sx={{ mr: 2, mb: 2 }}
        >
          Change Password
        </Button>

        <Button
          variant="outlined"
          startIcon={<SecurityIcon color="disabled" />}
          sx={{ mb: 2 }}
        >
          Two-Factor Auth
        </Button>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="text"
            color="error"
            startIcon={<LogoutIcon color="error" />}
            disabled
          >
            Logout (Disabled in Demo)
          </Button>
        </Box>
      </Paper>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 4,
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        This is a UI demonstration only. No settings can be permanently
        modified.
      </Typography>
    </Box>
  );
};

export default Setting;
