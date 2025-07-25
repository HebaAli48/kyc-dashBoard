import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Alert,
  IconButton,
  InputAdornment,
  Fade,
  Grid,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock as LockIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await login({ username, password });
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again."
      );
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left side - Login Form (1/3) */}
      <Grid
        item
        xs={12}
        md={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "#f5f5f5" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: "100%", maxWidth: 400 }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Box textAlign="center" mb={2}>
              <LockIcon color="primary" sx={{ fontSize: 50 }} />
              <Typography variant="h4" component="h1" gutterBottom>
                KYC Portal
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Secure access to your financial dashboard
              </Typography>
            </Box>

            {error && (
              <Fade in={!!error}>
                <Alert
                  severity="error"
                  sx={{ mb: 2 }}
                  onClose={() => setError("")}
                >
                  {error}
                </Alert>
              </Fade>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              noValidate
            >
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                error={!!error}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!error}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  mt: 2,
                  background:
                    "linear-gradient(90deg, #1976d2 0%, #2196f3 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)",
                  },
                }}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </Box>

            <Box textAlign="center" mt={2}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
                underline="hover"
                sx={{ color: "text.secondary" }}
              >
                Forgot password?
              </Link>
            </Box>
          </Paper>
        </motion.div>
      </Grid>
      {/* Right side - Background image (2/3) */}
      <Grid
        item
        xs={false}
        md={7}
        sx={{
          backgroundImage:
            "url('https://www.treezor.com/app/uploads/2025/04/KYC-scaled.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
};

export default LoginForm;
