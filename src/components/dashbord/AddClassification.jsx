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
} from "../../../public/Icons";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
  const [teacher, setTeacher] = useState("");
  const [openteacher, setOpenteacher] = useState(false);

  const [level, setLevel] = useState("");
  const [openlevel, setOpenlevel] = useState(false);

  const [classs, setClass] = useState("");
  const [openclass, setOpenclass] = useState(false);

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
          <Typography sx={{ fontFamily: "BoldIran", fontSize: "15px" }}>
            افزودن
          </Typography>
          <Button
            onClick={() => setItem(null)}
            sx={{ color: "black", "&:hover": { backgroundColor: "white" } }}
          >
            بازگشت
            <IconlyArrowLeft size={20} />
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Box>
              <Typography varient="h5">پایه</Typography>
              <FormControl sx={{ width: "100%", marginTop: "10px" }}>
                <Select
                  displayEmpty
                  open={openlevel}
                  onOpen={() => setOpenlevel(true)}
                  onClose={() => setOpenlevel(false)}
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  IconComponent={() =>
                    openlevel ? (
                      <KeyboardArrowUpIcon sx={{ fontSize: "1.2rem" }} />
                    ) : (
                      <KeyboardArrowDownIcon sx={{ fontSize: "1.2rem" }} />
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
                    "& .MuiSelect-icon": {
                      left: "20rem",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    پایه مد‌نظر را انتخاب کنید{" "}
                  </MenuItem>
                  <MenuItem value={0}>بیژن مرادی</MenuItem>
                  <MenuItem value={1}>علی معینی نژاد</MenuItem>
                  <MenuItem value={2}>میلاد زبردست</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item sm={12}>
            <Box>
              <Typography varient="h5">کلاس</Typography>
              <FormControl sx={{ width: "100%", marginTop: "10px" }}>
                <Select
                  open={openclass}
                  onOpen={() => setOpenclass(true)}
                  onClose={() => setOpenclass(false)}
                  value={classs}
                  onChange={(e) => setClass(e.target.value)}
                  displayEmpty
                  IconComponent={() =>
                    openclass ? (
                      <KeyboardArrowUpIcon sx={{ fontSize: "1.2rem" }} />
                    ) : (
                      <KeyboardArrowDownIcon sx={{ fontSize: "1.2rem" }} />
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
                    "& .MuiSelect-icon": {
                      left: "20rem",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    کلاس مد‌نظر را انتخاب کنید
                  </MenuItem>
                  <MenuItem value={0}>بیژن مرادی</MenuItem>
                  <MenuItem value={1}>علی معینی نژاد</MenuItem>
                  <MenuItem value={2}>میلاد زبردست</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Box>
              <Typography varient="h5">دانش‌آموز</Typography>
              <FormControl sx={{ width: "100%", marginTop: "10px" }}>
                <Select
                  open={openteacher}
                  onOpen={() => setOpenteacher(true)}
                  onClose={() => setOpenteacher(false)}
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  displayEmpty
                  IconComponent={() =>
                    openteacher ? (
                      <KeyboardArrowUpIcon sx={{ fontSize: "1.2rem" }} />
                    ) : (
                      <KeyboardArrowDownIcon sx={{ fontSize: "1.2rem" }} />
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
                    "& .MuiSelect-icon": {
                      left: "20rem",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    دانش‌آموز مد‌نظر را انتخاب کنید{" "}
                  </MenuItem>
                  <MenuItem value={0}>بیژن مرادی</MenuItem>
                  <MenuItem value={1}>علی معینی نژاد</MenuItem>
                  <MenuItem value={2}>میلاد زبردست</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Button
              sx={{
                marginTop: "2%",
                backgroundColor: "#417fee",
                width: "100%",
                color: "white",
                borderRadius: "10px",
                padding: "13px",
              }}
            >
              <Typography sx={{ fontSize: "15px" }}>ثبت و تایید</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default AddClassification;
