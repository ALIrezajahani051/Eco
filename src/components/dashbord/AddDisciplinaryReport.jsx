import React, { useEffect, useState } from "react";
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
  IconlyCloseSquare,
  IconlyArrowLeft,
  IconlyMoreSquare,
  IconlyCalendar,
} from "../../../public/Icons";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Autocomplete from "@mui/material/Autocomplete";

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

const AddDisciplinaryReport = ({ setItem }) => {
  const [listitems, setListitems] = useState([]);
  const [mored, setmored] = useState("");

  const [type, setType] = useState(false);
  const [date, setDate] = useState("");

  const [openclass, setOpenclass] = useState(false);
  const [classs, setClass] = useState("");

  const [openlevel, setOpenlevel] = useState(false);
  const [level, setLevel] = useState("");

  const [openstudent, setOpenstudent] = useState(false);
  const [student, setStudent] = useState("");

  const [grade, setGrade] = useState(null);

  const [students, setStudents] = useState([]);

  const setnewitem = () => {
    if (mored != "") {
      setListitems([...listitems, mored]);
    }
  };

  const removemored = (rkey) => {
    setListitems((prevItems) => prevItems.filter((_, key) => key !== rkey));
  };

  useEffect(() => {
    // fetch based on classs for get students
    setStudents([
      { name: "علیرضا" },
      { name: "علیرضا حسینی" },
      { name: "علیرضا محمدی" },
      { name: "علیرضایی" },
      { name: "علیرضا.م" },
      { name: "علیرضا 2" },
      { name: "علیرضا علیپور" },
      { name: "علیرضا - کوچک" },
      { name: "علیرضا بزرگ" },
      { name: "علیرضا (قدیم)" },
      { name: "محمد" },
    ]);
  }, [classs]);

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

        <Grid container rowSpacing={3.5} columnSpacing={3}>
          <Grid
            item
            sm={6}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <Typography sx={{ display: "flex" }}>
              نوع مورد
              <Typography sx={{ color: "red", marginRight: "4px" }}>
                *
              </Typography>
            </Typography>
            <Box
              sx={{
                display: "flex",
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
                justifyContent: "space-evently",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                paddingLeft: "5px",
              }}
            >
              <TextField
                value={mored}
                onChange={(e) => {
                  setmored(e.target.value);
                }}
                placeholder={` مورد${
                  !type ? " انضباطی " : " تشویقی "
                }را وارد کنید
                `}
                sx={{
                  cursor: "pointer",
                  borderRadius: "10px",
                  justifyContent: "center",
                  backgroundColor: "#f0f0f0",
                  width: "90%",
                  height: "45px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
              />

              <Button onClick={setnewitem} sx={Savebuttonstyle}>
                ذخیره مورد
              </Button>
            </Box>
          </Grid>

          <Grid item sm={6}>
            <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
              <Typography sx={{ display: "flex", gap: "2px" }}>
                موارد ذخیره شده{" "}
              </Typography>
              <Grid container columnGap={1} rowGap={1} sx={{ width: "100%" }}>
                {listitems.map((item, key) => (
                  <Grid
                    item
                    key={key}
                    sx={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: "10px",
                      fontSize: "0.8rem",
                      padding: "5px 5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        wordBreak: "break-word",
                      }}
                    >
                      {item}
                    </Box>
                    <Button
                      disableElevation
                      disableRipple
                      disableFocusRipple
                      onClick={(e) => {
                        removemored(key);
                      }}
                      sx={{
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <IconlyCloseSquare size={20} />
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          <Grid
            item
            sm={6}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <Typography>
              {!type ? "کسر" : "افزایش"} نمره {!type ? "انضباطی" : "تشویقی"}
            </Typography>
            <Box
              sx={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Button
                onClick={(e) => {
                  setGrade(0);
                }}
                sx={{
                  ...Gradebuttonstyle,
                  backgroundColor: grade != 0 ? "#f0f0f0" : "#417EEE",
                  color: grade == 0 ? "white" : "black",
                }}
              >
                {convertToPersianNumbers(0.5)} نمره
              </Button>
              <Button
                onClick={(e) => {
                  setGrade(1);
                }}
                sx={{
                  ...Gradebuttonstyle,
                  backgroundColor: grade != 1 ? "#f0f0f0" : "#417EEE",
                  color: grade == 1 ? "white" : "black",
                }}
              >
                {convertToPersianNumbers(1)} نمره
              </Button>
              <Button
                onClick={(e) => {
                  setGrade(2);
                }}
                sx={{
                  ...Gradebuttonstyle,
                  backgroundColor: grade != 2 ? "#f0f0f0" : "#417EEE",
                  color: grade == 2 ? "white" : "black",
                }}
              >
                {convertToPersianNumbers(1.5)} نمره
              </Button>
              <Button
                onClick={(e) => {
                  setGrade(3);
                }}
                sx={{
                  ...Gradebuttonstyle,
                  backgroundColor: grade != 3 ? "#f0f0f0" : "#417EEE",
                  color: grade == 3 ? "white" : "black",
                }}
              >
                {convertToPersianNumbers(2)} نمره
              </Button>
            </Box>
          </Grid>

          <Grid item sm={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                تاریخ
                <Typography sx={{ color: "red", marginRight: "4px" }}>
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
                    placeholder="تاریخ مدنظر را انتخاب کنید"
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
                      display: "flex",
                      justifyContent: "center",
                      height: "45px",
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
            <Box>
              <Typography varient="h5" sx={{ display: "flex" }}>
                پایه
                <Typography sx={{ color: "red", marginRight: "4px" }}>
                  *
                </Typography>
              </Typography>
              <FormControl sx={{ width: "100%", marginTop: "10px" }}>
                <Select
                  open={openlevel}
                  onOpen={() => setOpenlevel(true)}
                  onClose={() => setOpenlevel(false)}
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  displayEmpty
                  IconComponent={() =>
                    openlevel ? (
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
                    "& .MuiSelect-icon": {
                      left: "20rem",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    پایه مد‌نظر را انتخاب کنید
                  </MenuItem>
                  <MenuItem value={0}>ابتدایی</MenuItem>
                  <MenuItem value={1}>متوسطه اول</MenuItem>
                  <MenuItem value={2}>متوسطه دوم</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item sm={6}>
            <Box>
              <Typography sx={{ display: "flex" }}>
                کلاس{" "}
                <Typography sx={{ color: "red", marginRight: "4px" }}>
                  *
                </Typography>
              </Typography>
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
                    paddingRight: "0px",
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
                  <MenuItem value={0}>
                    {convertToPersianNumbers(7) +
                      "/" +
                      convertToPersianNumbers(5)}
                  </MenuItem>
                  <MenuItem value={1}>
                    {convertToPersianNumbers(8) +
                      "/" +
                      convertToPersianNumbers(1)}
                  </MenuItem>
                  <MenuItem value={2}>
                    {convertToPersianNumbers(10) +
                      "/" +
                      convertToPersianNumbers(2)}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item sm={12}>
            <Box>
              <Typography sx={{ display: "flex" }}>
                دانش‌آموز{" "}
                <Typography sx={{ color: "red", marginRight: "4px" }}>
                  *
                </Typography>
              </Typography>
              {/* <FormControl sx={{ width: "100%", marginTop: "10px" }}>
                <Select
                  open={openstudent}
                  onOpen={() => setOpenstudent(true)}
                  onClose={() => setOpenstudent(false)}
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  displayEmpty
                  IconComponent={() =>
                    openstudent ? (
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
                    "& .MuiSelect-icon": {
                      left: "20rem",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    دانش‌آموز مدنظر را انتخاب کنید{" "}
                  </MenuItem>
                  <MenuItem value={0}>محمد بروجنی</MenuItem>
                  <MenuItem value={1}>صدرا کاظمی</MenuItem>
                  <MenuItem value={2}>میلاد پوراکبری</MenuItem>
                </Select>
              </FormControl> */}
              <Autocomplete
                disabled={
                  classs === "" ||
                  classs === null ||
                  classs === undefined ||
                  isNaN(classs)
                }
                disablePortal
                disableClearable
                freeSolo={false}
                noOptionsText="موردی یافت نشد"
                options={students.map((student) => student.name)}
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "#f0f0f0",
                  textAlign: "right",
                  height: "50px",
                  mt: "10px",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "none",
                  "& fieldset": { border: "none" },
                  "& .MuiSvgIcon-root": { display: "none" },
                }}
                renderInput={(params) => (
                  <TextField
                    placeholder="دانش‌آموز مدنظر را انتخاب کنید"
                    {...params}
                  />
                )}
              />
            </Box>
          </Grid>

          <Grid item sm={12}>
            <Button
              disabled={
                type === "" || date === "" || classs === "" || level === ""
              }
              sx={{
                marginTop: "4%",
                backgroundColor:
                  type === "" || date === "" || classs === "" || level === ""
                    ? "gray"
                    : "#417fee",
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

export default AddDisciplinaryReport;

const Gradebuttonstyle = {
  padding: "8px 20px",
  borderRadius: "10px",
  boxShadow: "none",
  width: "80px",
  height: "45px",
  textWrap: "nowrap",
  fontSize: "0.80rem",
};

const Savebuttonstyle = {
  padding: "8px 12px",
  backgroundColor: "#417EEE",
  borderRadius: "10px",
  color: "white",
  boxShadow: "none",
  height: "78%",
  textWrap: "nowrap",
  // fontFamily: "Regular",
  fontSize: "0.75rem",
};
