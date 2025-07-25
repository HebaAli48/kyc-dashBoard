import React from "react";
import { Box, Typography } from "@mui/material";

const StatsCard = ({ title, value, color }) => {
  return (
    <Box
      sx={{
        p: 3,
        textAlign: "center",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: color,
        color: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
    </Box>
  );
};

export default StatsCard;
