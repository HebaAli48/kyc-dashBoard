import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useTheme,
  styled,
  keyframes,
} from "@mui/material";

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
  50% { transform: translateY(-15px) scale(1.2); opacity: 1; }
`;

const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const FloatingSymbol = styled("div")(({ theme, delay }) => ({
  position: "absolute",
  color: theme.palette.primary.main,
  fontWeight: "bold",
  fontSize: "1.25rem",
  animation: `${floatAnimation} 3s ease-in-out ${delay}s infinite`,
  top: `${Math.random() * 60 + 20}%`,
  left: `${Math.random() * 60 + 20}%`,
}));

const BouncingDot = styled("div")(({ theme, delay }) => ({
  width: 8,
  height: 8,
  backgroundColor: theme.palette.primary.light,
  borderRadius: "50%",
  animation: `${bounceAnimation} 1.5s infinite ${delay}s`,
}));

const Loading = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height={256}
      width="100%"
      gap={2}
    >
      <Box position="relative" width={128} height={128}>
        <CircularProgress
          thickness={4}
          size="100%"
          variant="determinate"
          value={100}
          sx={{ color: theme.palette.grey[300], position: "absolute" }}
        />
        <CircularProgress
          thickness={4}
          size="100%"
          variant="indeterminate"
          sx={{
            position: "absolute",
            color: theme.palette.primary.main,
            "& .MuiCircularProgress-circle": {
              strokeLinecap: "round",
            },
            animationDuration: "3s",
          }}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            color: theme.palette.primary.main,
            fontSize: "2.5rem",
            fontWeight: "bold",
            fontFamily: "Arial",
          }}
        >
          $
        </Box>

        {[1, 2, 3].map((i) => (
          <FloatingSymbol key={i} delay={i * 0.5}>
            {["$", "€", "£", "¥"][i % 4]}
          </FloatingSymbol>
        ))}
      </Box>

      <Box textAlign="center">
        <Typography variant="body1" color="text.secondary" mb={1}>
          Loading
        </Typography>
        <Box display="flex" gap={0.5} justifyContent="center">
          {[1, 2, 3].map((dot) => (
            <BouncingDot key={dot} delay={dot * 0.2} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Loading;
