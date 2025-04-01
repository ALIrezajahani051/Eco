import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Autocomplete,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { IconlyDown } from "../../../public/Icons";
import MajorPriority from "./MajorPriority";

const customTheme = createTheme({
  direction: "rtl",
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

const options = [
  "تهران",
  "مشهد",
  "اصفهان",
  "شیراز",
  "تبریز",
  "اهواز",
  "کرج",
  "قم",
  "رشت",
  "قزوین",
];
const rasters = [
  "مهندسی برق",
  "مهندسی کامپیوتر",
  "مهندسی مکانیک",
  "مهندسی عمران",
  "مهندسی صنایع",
  "مهندسی شیمی",
  "پرستاری",
  "دندانپزشکی",
  "پزشکی",
  "حقوق",
];

const PriorityField = React.memo(({ label, options }) => (
  <Box sx={{ width: "100%" }}>
    <Typography sx={{ marginBottom: "5px" }}>{label} :</Typography>
    <Autocomplete
      noOptionsText="مورد یافت نشد"
      popupIcon={<IconlyDown size={21} />}
      options={options}
      autoComplete
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            backgroundColor: "#f0f0f0",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              padding: "5px",
              "& fieldset": {
                border: "none",
              },
            },
          }}
          placeholder="انتخاب کنید"
        />
      )}
    />
  </Box>
));

export default function FillPriority({ type, show, setShow }) {
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          backgroundColor: "white",
          height: "auto",
          position: "relative",
          borderRadius: "10px",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!show && <MajorPriority type={type} />}

        {show && (
          <>
            <Box
              sx={{
                display: "flex",
                gap: 5,
                flexDirection: type ? "row" : "row-reverse",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">انتخاب شهر</Typography>
                <Grid container spacing={3}>
                  {[...Array(5).keys()].map((index) => (
                    <Grid item xs={12} sm={12} md={12} key={index}>
                      <PriorityField
                        options={options}
                        label={`اولویت ${index + 1}`}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">انتخاب رشته</Typography>
                <Grid container spacing={3}>
                  {[...Array(5).keys()].map((index) => (
                    <Grid item xs={12} sm={12} md={12} key={index}>
                      <PriorityField
                        options={rasters}
                        label={`اولویت ${index + 1}`}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>

            <Button
              onClick={() => setShow(false)}
              sx={{
                padding: "15px 5px",
                width: "90%",
                color: "white",
                background:
                  "linear-gradient(150deg, rgba(89,165,167,1) 10%, rgba(0,129,255,0.7) 73%)",
                backgroundSize: "200% 200%",
                transition: "background-position 0.8s linear",
                "&:hover": {
                  backgroundPosition: "100% 0",
                },
              }}
            >
              ثبت و تایید
            </Button>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}
