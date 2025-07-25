import {
  Box,
  Button,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  CircularProgress,
  Divider,
  useTheme,
  styled,
  Avatar,
} from "@mui/material";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PaidIcon from "@mui/icons-material/Paid";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";

const drawerWidth = 260;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    background: theme.palette.background.paper,
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
    borderRight: "none",
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0, 2),
  "&.Mui-selected": {
    backgroundColor: theme.palette.action.selected,
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const DashboardLayout = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Transactions", icon: <PaidIcon />, path: "/transactions" },
    { text: "Users", icon: <PeopleIcon />, path: "/users-management" },
    { text: "Audit Logs", icon: <AssessmentIcon />, path: "/audit-logs" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <StyledDrawer variant="permanent">
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              width: 64,
              height: 64,
              mb: 2,
              bgcolor: theme.palette.primary.main,
              fontSize: "1.5rem",
            }}
          >
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h6" noWrap>
            {user.username}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {user.role} • {user.region}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <List sx={{ p: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <StyledListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ variant: "body1" }}
                />
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: "auto", p: 2 }}>
          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            variant="outlined"
            fullWidth
            color="error"
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Sign Out
          </Button>
        </Box>
      </StyledDrawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
