import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Typography, Grid, useMediaQuery } from "@mui/material";
import {
  IconlyPlus,
  IconlyFilter,
  IconlyActivity,
  IconlyDelete,
} from "../../../public/Icons";
import Maincheck from "./Maincheck";
const theme = createTheme({
  typography: {
    fontFamily: "IranSans, Arial, sans-serif",
    h6: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "0.85rem",
    },
  },
});

const Checkabs = ({ open }) => {
  const items = [{ id: 0, label: "حضور و غیاب" }];

  const [activeItem, setActiveItem] = useState(0);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "95%",
          mt: "60px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            height: "auto",
            borderRadius: "10px",
            position: "relative",
            zIndex: 1,
            paddingRight: "30px",
            paddingLeft: "30px",
            paddingBottom: "20px",
            marginBottom: "10px",
            paddingTop: "25px",
            // overflow: "hidden",
          }}
        >
          {activeItem == 0 && <Maincheck />}
        </Box>

        <Grid
          container
          spacing={open ? 3 : 6}
          sx={{
            width: "100%",
            position: "absolute",
            top: -40,
            left: 0,
          }}
        >
          {items.map((item) => (
            <Grid item key={item.id}>
              <Box
                onClick={() => setActiveItem(item.id)}
                sx={{
                  backgroundColor:
                    activeItem === item.id ? "#417fee" : "#fcfcfc",
                  borderRadius: "10px",
                  height: "50px",
                  paddingRight: isSmallScreen ? "15px" : "25px",
                  paddingLeft: isSmallScreen ? "15px" : "25px",
                  paddingTop: "12px",
                  color: activeItem === item.id ? "white" : "inherit",
                  cursor: "pointer",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s, color 0.3s",
                  fontSize: isSmallScreen ? "0.75rem" : "0.85rem",
                }}
              >
                {item.label}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Checkabs;
