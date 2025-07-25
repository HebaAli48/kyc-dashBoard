import { Typography, Box, Paper, Avatar, Grid } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { CheckCircleOutline, Assignment, Security } from "@mui/icons-material";

const Home = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          {user && (
            <Avatar
              sx={{
                width: 64,
                height: 64,
                mr: 3,
                bgcolor: "primary.main",
                fontSize: "1.5rem",
              }}
            >
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <Box>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Welcome {user ? `back, ${user.username}!` : "to KYC Dashboard"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user
                ? `You are logged in as ${user.role}`
                : "Please sign in to access the dashboard"}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {user && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: "100%", borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Assignment color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  KYC Applications
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Manage and review all KYC applications in one place.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: "100%", borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CheckCircleOutline
                  color="success"
                  sx={{ fontSize: 40, mr: 2 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Verified Users
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                View and manage all verified customer profiles.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: "100%", borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Security color="warning" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Security Tools
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Access security and compliance management tools.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}

      {!user && (
        <Paper
          elevation={3}
          sx={{ p: 4, textAlign: "center", borderRadius: 2 }}
        >
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Get Started with KYC Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Sign in to access the complete suite of KYC verification tools and
            customer management features.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Home;
