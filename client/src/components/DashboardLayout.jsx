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
import { Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import PaidIcon from "@mui/icons-material/Paid";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect } from "react";
import useAuthenticate from "../utils/useAuthenticate";

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
  const location = useLocation();
  const theme = useTheme();
  const {
    token,
    isGlobalAdmin,
    isRegionalAdmin,
    isSendingPartner,
    isRecevingPartner,
  } = useAuthenticate();
  // Debugging effect - remove in production
  // useEffect(() => {
  //   console.log("Current user role:", user?.role);
  //   console.log("User object:", user);
  // }, [user]);

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
          {/* Home - Available to all roles */}
          <ListItem disablePadding sx={{ mb: 1 }}>
            <StyledListItemButton
              onClick={() => navigate("/")}
              selected={location.pathname === "/"}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                primaryTypographyProps={{ variant: "body1" }}
              />
            </StyledListItemButton>
          </ListItem>

          {/* Transactions - Available to all roles */}
          <ListItem disablePadding sx={{ mb: 1 }}>
            <StyledListItemButton
              onClick={() => navigate("/transactions")}
              selected={location.pathname === "/transactions"}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <PaidIcon />
              </ListItemIcon>
              <ListItemText
                primary="Transactions"
                primaryTypographyProps={{ variant: "body1" }}
              />
            </StyledListItemButton>
          </ListItem>

          {/* Users - Only for admins */}
          {(isGlobalAdmin || isRegionalAdmin) && (
            <ListItem disablePadding sx={{ mb: 1 }}>
              <StyledListItemButton
                onClick={() => navigate("/users-management")}
                selected={location.pathname === "/users-management"}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Users"
                  primaryTypographyProps={{ variant: "body1" }}
                />
              </StyledListItemButton>
            </ListItem>
          )}

          {/* Audit Logs - Only for admins */}
          {(isGlobalAdmin || isRegionalAdmin) && (
            <ListItem disablePadding sx={{ mb: 1 }}>
              <StyledListItemButton
                onClick={() => navigate("/audit-logs")}
                selected={location.pathname === "/audit-logs"}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Audit Logs"
                  primaryTypographyProps={{ variant: "body1" }}
                />
              </StyledListItemButton>
            </ListItem>
          )}

          {/* Settings - Available to all roles */}
          <ListItem disablePadding sx={{ mb: 1 }}>
            <StyledListItemButton
              onClick={() => navigate("/settings")}
              selected={location.pathname === "/settings"}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{ variant: "body1" }}
              />
            </StyledListItemButton>
          </ListItem>
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
