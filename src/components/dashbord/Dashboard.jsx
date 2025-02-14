import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { Box, Typography, Divider, Grid, Paper } from "@mui/material";
import {
  IconlyArrowLeft2,
  IconlyHome,
  IconlyHomebold,
  IconlyInfoSquare,
  IconlyInfoSquarebold,
  IconlyProfileTick,
  IconlyBook,
  IconlyEdu,
  IconlyGame,
  IconlyEdit,
  IconlyCalendar,
  IconlyCalendarbold,
  IconlyBook2,
  IconlyWallet,
  IconlyReport,
  Iconlyuser,
  Iconlyuserbold,
  IconlyEditbold,
  IconlyWalletbold,
  IconlyGameBold,
} from "../../../public/Icons";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
  fontSize: "1rem",
  fontWeight: "bold",
  boxShadow: "none",
  borderRadius: "10px",
  transition: "all 0.3s",
  minHeight: "150px",
  gap: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  minWidth: "223px",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.00)",
    backgroundColor: "#F0F0F0",
  },
}));

const Dashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
          padding: 0,
        }}
      >
        <Box
          sx={{
            width: "95%",
            display: "flex",
            flexDirection: "column",
            padding: 2,
            borderRadius: "15px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontFamily: "BoldIran" }}>
              بازدیدهای اخیر شما
            </Typography>
            <Divider
              sx={{
                height: "0.5px",
                mx: 2,
                backgroundColor: "#bbb",
                flexGrow: 1,
              }}
            />
          </Box>

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={6} sm={3}>
              <Item>
                <Box
                  sx={{
                    backgroundColor: "#3a7af0",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                >
                  <IconlyBook size={35} color="white" />
                </Box>
                بانک سوالات
              </Item>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Item>
                <Box
                  sx={{
                    backgroundColor: "#3a7af0",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                >
                  <IconlyCalendar size={35} color="white" />
                </Box>
                تقویم آموزشی{" "}
              </Item>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Item>
                <Box
                  sx={{
                    backgroundColor: "#3a7af0",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                >
                  <IconlyEdit size={35} color="white" />
                </Box>
                تکالیف آموزشی
              </Item>{" "}
            </Grid>
            <Grid item xs={6} sm={3}>
              <Item>
                <Box
                  sx={{
                    backgroundColor: "#3a7af0",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                >
                  <IconlyWallet size={35} color="white" />
                </Box>
                شهریه{" "}
              </Item>{" "}
            </Grid>
            <Grid item xs={6} sm={3}>
              <Item>
                <Box
                  sx={{
                    backgroundColor: "#3a7af0",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                >
                  <IconlyProfileTick size={35} color="white" />
                </Box>
                حضورو غیاب{" "}
              </Item>{" "}
            </Grid>
            <Grid item xs={6} sm={3}>
              <Item>
                <Box
                  sx={{
                    backgroundColor: "#3a7af0",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                >
                  <IconlyGame size={35} color="white" />
                </Box>
                بازی و سرگرمی{" "}
              </Item>{" "}
            </Grid>
            <Grid item xs={6} sm={3}>
              <Item>
                <Box
                  sx={{
                    backgroundColor: "#3a7af0",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                >
                  <IconlyReport size={35} color="white" />
                </Box>
                گزارشات{" "}
              </Item>{" "}
            </Grid>
            <Grid item xs={6} sm={3}>
              <Item>
                <Box
                  sx={{
                    backgroundColor: "#3a7af0",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                >
                  <Iconlyuser size={35} color="white" />
                </Box>
                کاربران{" "}
              </Item>{" "}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
