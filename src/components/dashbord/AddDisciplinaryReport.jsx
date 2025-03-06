import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
  FormControl,
  Grid,
  InputBase,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  IconlyPlus,
  IconlyDelete,
  IconlySquare,
  IconlySearch,
  IconlyArrowLeft,
  IconlyMoreSquare,
  IconlyCalendar,
} from "../../../public/Icons";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { color } from "framer-motion";
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

const AddClassification = ({ setItem }) => {
  const [type, setType] = useState(false);
  const [date, setDate] = useState("");
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography varient="h3" sx={{ fontSize: "0.94rem" }}>
              افزودن موارد انظباطی/تشویقی
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Button
              onClick={(e) => {
                setType(0);
              }}
              sx={{
                padding: "8px 22px",
                backgroundColor: !type ? "#D21919" : "white",
                borderRadius: "10px",
                color: !type ? "white" : "black",
                boxShadow: "none",
              }}
            >
              انضباطی
            </Button>
            <Button
              onClick={(e) => {
                setType(1);
              }}
              sx={{
                padding: "8px 22px",
                backgroundColor: type ? "#05A415" : "white",
                borderRadius: "10px",
                color: type ? "white" : "black",
                boxShadow: "none",
              }}
            >
              تشویقی
            </Button>
          </Box>

          <Box sx={{ flex: 1, direction: "ltr" }}>
            <Button
              onClick={() => setItem(null)}
              sx={{ color: "black", "&:hover": { backgroundColor: "white" } }}
            >
              بازگشت
              <IconlyArrowLeft size={20} />
            </Button>
          </Box>
        </Box>

        <Grid container rowSpacing={8} columnSpacing={3}>
          <Grid item sm={6}>
            <Typography>نوع مورد</Typography>
          </Grid>

          <Grid item sm={6}>
            نوع مورد
          </Grid>

          <Grid item sm={6}>
            <Typography>کسر نمره انضباطی</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            ></Box>
          </Grid>

          <Grid item sm={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "2px" }}
              >
                تاریخ
                <Typography sx={{ color: "red", marginLeft: "4px" }}>
                  *
                </Typography>
              </Typography>

              <DatePicker
                value={date}
                onChange={(newDate) => setDate(newDate?.format?.("YYYY/MM/DD"))}
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
                      width: "75%",
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
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default AddClassification;
