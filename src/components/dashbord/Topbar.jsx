import React from "react";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { Box, Typography, Divider, Grid, Badge } from "@mui/material";
import {
  IconlyArrowDown2,
  IconlyNotification,
  IconlySearch,
} from "../../../public/Icons";
import FileUploader from "./FileUploader";
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

const Topbar = ({ open }) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "white",
          width: "95%",
          height: isSmallScreen ? "auto" : "80px",
          borderRadius: "10px",
          display: "flex",
          padding: isSmallScreen ? "10px" : "20px",
          alignItems: "center",
          flexDirection: isSmallScreen ? "column" : "row",
          // gap: isSmallScreen ? "10px" : "30px",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={12} sm={3} md={2}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: isSmallScreen ? "center" : "flex-start",
            }}
          >
            <img
              src="/man.png"
              alt="User"
              style={{
                borderRadius: "10px",
                width: isSmallScreen ? "30px" : "50px",
                height: isSmallScreen ? "30px" : "50px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 0.8,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                <Typography
                  sx={{ fontSize: isSmallScreen ? "0.8rem" : "0.98rem" }}
                >
                  علی خجسته‌فر
                </Typography>
                <IconlyArrowDown2 size={16} />
              </Box>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  backgroundColor: "#faf5d8",
                  color: "#e0a913",
                  width: "85px",
                  minHeight: "20px",
                  borderRadius: "5px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                مشاور مدرسه
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />

        <Grid item xs={12} sm={4} md={8}>
          <Box
            sx={{
              width: open ? "550px" : "650px",
              height: "48px",
              backgroundColor: "#F5F4FC",
              borderRadius: "10px",
              display: "flex",
              padding: "12px",
              alignItems: "center",
              gap: "10px",
              margin: isSmallScreen ? "10px 0" : "0",
            }}
          >
            <IconlySearch color="gray" size={21} />
            <input
              type="text"
              placeholder="جستجو کنید"
              style={{
                fontFamily: "Regular",
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: isSmallScreen ? "0.8rem" : "15px",
                width: "100%",
              }}
            />
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={12} sm={3} md={2}>
          <Box
            sx={{
              width: "48px",
              height: "48px",
              backgroundColor: "#F5F4FC",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              marginLeft: isSmallScreen ? "0" : "auto",
            }}
          >
            <Badge
              badgeContent={2}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.6rem",
                  minWidth: "16px",
                  height: "16px",
                  transform: "translate(25%, -25%)",
                },
              }}
            >
              <IconlyNotification size={25} />
            </Badge>
          </Box>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Topbar;
