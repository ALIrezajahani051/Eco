import React, { useState } from "react";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  Badge,
  InputBase,
} from "@mui/material";
import {
  IconlySearch,
  IconlyArrowLeft,
  IconlyProfile,
  IconlyCall,
  IconlyLock,
  IconlyEdit,
  IconlyCalendar,
  IconlyMoreSquare,
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

const AddUser = ({ setItem }) => {
  const [manual, setManual] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontFamily: "BoldIran", fontSize: "15px" }}>
          افزودن کاربر
        </Typography>
        <Box sx={{ display: "flex", gap: "15px" }}>
          <Button
            onClick={() => setManual(true)}
            sx={{
              padding: "8px 22px",
              backgroundColor: manual ? "black" : "white",
              borderRadius: "10px",
              color: manual ? "white" : "black",
              boxShadow: "none",
            }}
          >
            دستی
          </Button>
          <Button
            onClick={() => setManual(false)}
            sx={{
              padding: "8px 22px",
              backgroundColor: !manual ? "black" : "white",
              borderRadius: "10px",
              color: !manual ? "white" : "black",
              boxShadow: "none",
            }}
          >
            بارگذاری فایل اکسل{" "}
          </Button>
        </Box>

        <Button
          onClick={() => setItem(null)}
          sx={{ color: "black", "&:hover": { backgroundColor: "white" } }}
        >
          بازگشت
          <IconlyArrowLeft size={20} />
        </Button>
      </Box>

      {manual && (
        <>
          <Grid container spacing={5}>
            <Grid item sm={4} sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  display: "flex",
                  gap: "3px",
                  alignItems: "center",
                  mb: "5px",
                }}
              >
                <IconlyProfile size={20} />
                نام
              </Typography>{" "}
              <InputBase
                sx={{
                  backgroundColor: "#F3F3F3",
                  fontSize: "1rem",
                  width: "100%",
                  padding: "4px",
                  borderRadius: "10px",
                  direction: "rtl",
                }}
              />
            </Grid>
            <Grid item sm={4} sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  display: "flex",
                  gap: "3px",
                  alignItems: "center",
                  mb: "5px",
                }}
              >
                <IconlyProfile size={20} />
                نام خانوادگی
              </Typography>{" "}
              <InputBase
                sx={{
                  backgroundColor: "#F3F3F3",
                  fontSize: "1rem",
                  width: "100%",
                  padding: "4px",
                  borderRadius: "10px",
                  direction: "rtl",
                }}
              />
            </Grid>

            <Grid item sm={4} sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  display: "flex",
                  gap: "3px",
                  alignItems: "center",
                  mb: "5px",
                }}
              >
                <IconlyEdit />
                سمت
              </Typography>{" "}
              <InputBase
                sx={{
                  backgroundColor: "#F3F3F3",
                  fontSize: "1rem",
                  width: "100%",
                  padding: "4px",
                  borderRadius: "10px",
                  direction: "rtl",
                }}
              />
            </Grid>

            <Grid item sm={4} sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  display: "flex",
                  gap: "3px",
                  alignItems: "center",
                  mb: "5px",
                }}
              >
                <IconlyMoreSquare size={20} />
                کدملی
              </Typography>{" "}
              <InputBase
                sx={{
                  backgroundColor: "#F3F3F3",
                  fontSize: "1rem",
                  width: "100%",
                  padding: "4px",
                  borderRadius: "10px",
                  direction: "rtl",
                }}
              />
            </Grid>
            <Grid item sm={4} sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  display: "flex",
                  gap: "3px",
                  alignItems: "center",
                  mb: "5px",
                }}
              >
                <IconlyCall size={20} />
                تلفن ثابت
              </Typography>{" "}
              <InputBase
                sx={{
                  backgroundColor: "#F3F3F3",
                  fontSize: "1rem",
                  width: "100%",
                  padding: "4px",
                  borderRadius: "10px",
                  direction: "rtl",
                }}
              />
            </Grid>

            <Grid item sm={4} sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  display: "flex",
                  gap: "3px",
                  alignItems: "center",
                  mb: "5px",
                }}
              >
                <IconlyCall size={20} />
                تلفن همراه
              </Typography>{" "}
              <InputBase
                sx={{
                  backgroundColor: "#F3F3F3",
                  fontSize: "1rem",
                  width: "100%",
                  padding: "4px",
                  borderRadius: "10px",
                  direction: "rtl",
                }}
              />
            </Grid>
            <Grid item sm={4} sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  display: "flex",
                  gap: "3px",
                  alignItems: "center",
                  mb: "5px",
                }}
              >
                <IconlyCalendar />
                تاریخ تولد
              </Typography>{" "}
              <InputBase
                sx={{
                  backgroundColor: "#F3F3F3",
                  fontSize: "1rem",
                  width: "100%",
                  padding: "4px",
                  borderRadius: "10px",
                  direction: "rtl",
                }}
              />
            </Grid>

            <Grid item sm={4} sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  display: "flex",
                  gap: "3px",
                  alignItems: "center",
                  mb: "5px",
                }}
              >
                <IconlyLock size={20} />
                رمز عبور
              </Typography>{" "}
              <InputBase
                sx={{
                  backgroundColor: "#F3F3F3",
                  fontSize: "1rem",
                  width: "100%",
                  padding: "4px",
                  borderRadius: "10px",
                  direction: "rtl",
                }}
              />
            </Grid>
          </Grid>
          <Button
            sx={{
              width: "100%",
              backgroundColor: "#417fee",
              color: "white",
              borderRadius: "10px",
              padding: "12px 20px",
            }}
          >
            ثبت و تایید
          </Button>
        </>
      )}

      {!manual && <FileUploader />}
    </ThemeProvider>
  );
};

export default AddUser;
