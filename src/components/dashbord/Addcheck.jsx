import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconlyArrowLeft, IconlyCalendar } from "../../../public/Icons";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Listabscheck from "./Listabscheck";

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

const Addcheck = ({ setItem }) => {
  const [liststd, setliststd] = useState(0);
  const [date, setDate] = useState(null);
  const [level, setLevel] = useState("");
  const [openLevel, setOpenLevel] = useState(false);

  const [classs, setClass] = useState("");
  const [openClass, setOpenClass] = useState(false);

  const convertToPersianNumbers = (num) => {
    return num.toString().replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: "5px" }}>
            {" "}
            <Typography sx={{ fontFamily: "BoldIran", fontSize: "15px" }}>
              افزودن حضور و غیاب
            </Typography>
            {liststd == 1 && (
              <Typography
                sx={{
                  fontFamily: "BoldIran",
                  fontSize: "15px",
                  color: "#417EEE",
                }}
              >
                {convertToPersianNumbers(classs)}{" "}
              </Typography>
            )}
          </Box>
          <Button
            onClick={() => setItem(null)}
            sx={{ color: "black", "&:hover": { backgroundColor: "white" } }}
          >
            بازگشت
            <IconlyArrowLeft size={20} />
          </Button>
        </Box>

        {liststd == 0 && (
          <>
            <Grid container columnSpacing={4} rowSpacing={4}>
              <Grid item sm={12}>
                <Typography>تاریخ</Typography>
                <Box sx={{ marginTop: "10px" }}>
                  <DatePicker
                    value={date}
                    onChange={(newDate) =>
                      setDate(newDate?.format?.("YYYY/MM/DD"))
                    }
                    calendar={persian}
                    locale={persian_fa}
                    format="YYYY/MM/DD"
                    render={(value, openCalendar) => (
                      <TextField
                        onClick={openCalendar}
                        value={value || date || ""}
                        placeholder="تاریخ مدنظر خود را انتخاب کنید"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconlyCalendar sx={{ color: "#888" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          cursor: "pointer",
                          borderRadius: "10px",
                          backgroundColor: "#f0f0f0",
                          width: "110%",
                          height: "50px",
                          "& rmdp-calendar rmdp-rtl": {
                            boxShadow: "none",
                          },
                          "& fieldset": { border: "none" },
                          "& .MuiInputBase-input::placeholder": {
                            color: "black",
                            opacity: 1,
                            fontSize: "0.8rem",
                            fontFamily: "IranSans",
                          },
                        }}
                      />
                    )}
                  />
                </Box>
              </Grid>

              <Grid item sm={6}>
                <Typography>پایه</Typography>
                <FormControl sx={{ width: "100%", marginTop: "10px" }}>
                  <Select
                    displayEmpty
                    open={openLevel}
                    onOpen={() => setOpenLevel(true)}
                    onClose={() => setOpenLevel(false)}
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    IconComponent={() =>
                      openLevel ? (
                        <KeyboardArrowUpIcon sx={{ fontSize: "1.6rem" }} />
                      ) : (
                        <KeyboardArrowDownIcon sx={{ fontSize: "1.6rem" }} />
                      )
                    }
                    sx={{
                      borderRadius: "10px",
                      height: "50px",
                      backgroundColor: "#f0f0f0",
                      border: "none",
                      pl: "8px",
                      boxShadow: "none",
                      "& fieldset": { border: "none" },
                    }}
                  >
                    <MenuItem value="" disabled>
                      پایه مد‌نظر را انتخاب کنید
                    </MenuItem>
                    <MenuItem value="پایه 1">
                      پایه {convertToPersianNumbers(1)}
                    </MenuItem>
                    <MenuItem value="پایه 2">
                      پایه {convertToPersianNumbers(2)}
                    </MenuItem>
                    <MenuItem value="پایه 3">
                      پایه {convertToPersianNumbers(3)}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={6}>
                <Typography>کلاس</Typography>
                <FormControl sx={{ width: "100%", marginTop: "10px" }}>
                  <Select
                    displayEmpty
                    open={openClass}
                    onOpen={() => setOpenClass(true)}
                    onClose={() => setOpenClass(false)}
                    value={classs}
                    onChange={(e) => setClass(e.target.value)}
                    IconComponent={() =>
                      openClass ? (
                        <KeyboardArrowUpIcon sx={{ fontSize: "1.6rem" }} />
                      ) : (
                        <KeyboardArrowDownIcon sx={{ fontSize: "1.6rem" }} />
                      )
                    }
                    sx={{
                      borderRadius: "10px",
                      height: "50px",
                      backgroundColor: "#f0f0f0",
                      border: "none",
                      pl: "8px",
                      boxShadow: "none",
                      "& fieldset": { border: "none" },
                    }}
                  >
                    <MenuItem value="" disabled>
                      کلاس مد‌نظر را انتخاب کنید
                    </MenuItem>
                    <MenuItem value="کلاس 1">
                      کلاس {convertToPersianNumbers(1)}
                    </MenuItem>
                    <MenuItem value="کلاس 2">
                      کلاس {convertToPersianNumbers(2)}
                    </MenuItem>
                    <MenuItem value="کلاس 3">
                      کلاس {convertToPersianNumbers(3)}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={12}>
                <Button
                  disabled={
                    date == null || level == "" || classs == "" ? true : false
                  }
                  onClick={() => {
                    setliststd(1);
                  }}
                  sx={{
                    marginTop: "7%",
                    backgroundColor:
                      date == null || level == "" || classs == ""
                        ? "#DDDDDD"
                        : "#417fee",
                    width: "100%",
                    color: "white",
                    borderRadius: "10px",
                    padding: "13px",
                  }}
                >
                  <Typography sx={{ fontSize: "15px" }}>
                    مشاهده لیست دانش‌آموزان
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </>
        )}

        {liststd == 1 && <Listabscheck />}
      </Box>
    </ThemeProvider>
  );
};

export default Addcheck;
