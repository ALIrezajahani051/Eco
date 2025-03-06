import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  useMediaQuery,
  TableHead,
  TableRow,
  Grid,
  Paper,
} from "@mui/material";
import {
  IconlySearch,
  IconlyPlus,
  IconlyMoreSquare,
} from "../../../public/Icons";
import Addcheck from "./Addcheck";
import DisciplinaryReports from "./DisciplinaryReports";
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

const convertToPersianNumbers = (num) => {
  return num.toString().replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};

export default function Disciplinary() {
  const [item, setItem] = useState(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeItem, setActiveItem] = useState(0);
  const items = [
    { id: 0, label: "موارد انضباطی" },
    { id: 1, label: "گزارشات موارد انضباطی" },
  ];
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
            zIndex: 2,
            paddingRight: "30px",
            paddingLeft: "30px",
            paddingBottom: "20px",
            marginBottom: "10px",
            paddingTop: "25px",
          }}
        >
          {item == null && <DisciplinaryReports />}
        </Box>

        <Grid
          container
          spacing={6}
          sx={{
            width: "100%",
            position: "absolute",
            top: -40,
            left: 0,
            zIndex: 1,
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
}
