import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  InputBase,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import LockIcon from "@mui/icons-material/Lock";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Select from "@mui/material/Select";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import TextField from "@mui/material/TextField";
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

function convertToEnglishDigits(value) {
  return value
    .replace(/[\u0660-\u0669]/g, (digit) =>
      String.fromCharCode(digit.charCodeAt(0) - 0x0660)
    )
    .replace(/[\u06f0-\u06f9]/g, (digit) =>
      String.fromCharCode(digit.charCodeAt(0) - 0x06f0)
    );
}

export default function Login() {
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [nationalcode, setNationalcode] = useState("");
  const [phone, setPhone] = useState("");

  const [schoolname, setSchoolname] = useState("");

  const [typeschool, setTypeschool] = useState(0);
  const [opentype, setOpentype] = useState(false);

  const [levelschool, setLevelschool] = useState(0);
  const [openlevel, setOpenlevel] = useState(false);

  const [city, setCity] = useState(0);
  const [opencity, setOpencity] = useState(false);

  const [schooladress, setSchooladress] = useState("");

  const handleReset = () => {
    setName("");
    setFamily("");
    setNationalcode("");
    setPhone("");
    setSchoolname("");
    setTypeschool(0);
    setLevelschool(0);
    setCity(0);
    setSchooladress("");
  };
  const handleSchooladress = (e) => {
    setSchooladress(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleNationalcode = (e) => {
    setNationalcode(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const navigate = useNavigate();
  function goLogin() {
    return navigate("/login");
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "40px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", gap: 8 }}>
            <Button
              sx={{
                padding: "10px 20px",
                fontSize: "1rem",
                minWidth: "150px",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
              variant="contained"
              color="white"
              onClick={goLogin}
            >
              <LoginIcon sx={{ marginLeft: "5px" }} />
              ورود
            </Button>
            <Button
              sx={{
                padding: "10px 20px",
                fontSize: "1rem",
                minWidth: "150px",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
              variant="contained"
              color="primary"
            >
              <PersonAddAlt1OutlinedIcon sx={{ marginLeft: "5px" }} />
              ثبت نام مدارس
            </Button>
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                }}
              >
                اطلاعات مدیر مدرسه
              </Typography>
              <Divider sx={{ flexGrow: 1, mr: 1, borderColor: "gray" }} />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <Box
                sx={{ textAlign: "right", width: { xs: "100%", sm: "auto" } }}
              >
                <Typography>
                  {" "}
                  <PermIdentityOutlinedIcon sx={{ fontSize: "1.2rem" }} />
                  نام
                </Typography>{" "}
                <InputBase
                  value={name}
                  onChange={handleName}
                  sx={{
                    backgroundColor: "#F3F3F3",
                    fontSize: "1rem",
                    width: "100%",
                    padding: "4px",
                    borderRadius: "10px",
                    direction: "rtl",
                  }}
                />
              </Box>
              <Box
                sx={{ textAlign: "right", width: { xs: "100%", sm: "auto" } }}
              >
                <Typography>
                  <PermIdentityOutlinedIcon sx={{ fontSize: "1.2rem" }} />
                  نام‌خانوادگی
                </Typography>{" "}
                <InputBase
                  value={family}
                  onChange={(e) => {
                    setFamily(e.target.value);
                  }}
                  sx={{
                    backgroundColor: "#F3F3F3",
                    fontSize: "1rem",
                    width: "100%",
                    padding: "4px",
                    borderRadius: "10px",
                    direction: "rtl",
                  }}
                />
              </Box>
              <Box
                sx={{ textAlign: "right", width: { xs: "100%", sm: "auto" } }}
              >
                <Typography>
                  <MoreHorizIcon sx={{ fontSize: "1.2rem" }} />
                  کد ملی
                </Typography>{" "}
                <InputBase
                  dir="rtl"
                  inputMode="numeric"
                  value={nationalcode}
                  onChange={handleNationalcode}
                  sx={{
                    backgroundColor: "#F3F3F3",
                    fontSize: "1rem",
                    width: "100%",
                    padding: "4px",
                    borderRadius: "10px",
                    direction: "ltr",
                  }}
                />
              </Box>
              <Box
                sx={{ textAlign: "right", width: { xs: "100%", sm: "auto" } }}
              >
                <Typography>
                  <PhoneEnabledOutlinedIcon sx={{ fontSize: "1.2rem" }} />
                  شماره تلفن
                </Typography>{" "}
                <Box
                  sx={{
                    backgroundColor: "#F3F3F3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    borderRadius: "10px",
                    padding: "4px",
                    direction: "ltr",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      marginLeft: "8px",
                    }}
                  >
                    98+
                  </Typography>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ margin: "0 8px" }}
                  />
                  <InputBase
                    dir="rtl"
                    type="tel"
                    inputProps={{
                      maxLength: 10,
                      pattern: "[0-9]*",
                    }}
                    value={phone}
                    onChange={handlePhone}
                    sx={{
                      fontSize: "1rem",
                      width: "100%",
                      textAlign: "left",
                      direction: "ltr",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                }}
              >
                اطلاعات مدرسه
              </Typography>
              <Divider sx={{ flexGrow: 1, mr: 1, borderColor: "gray" }} />
            </Box>
            <Box
              sx={{
                textAlign: "right",
                width: { xs: "100%", sm: "auto" },
                mb: "5px",
              }}
            >
              <Typography>نام مدرسه</Typography>{" "}
              <InputBase
                value={schoolname}
                onChange={(e) => {
                  setSchoolname(e.target.value);
                }}
                sx={{
                  backgroundColor: "#F3F3F3",
                  fontSize: "1rem",
                  width: "23%",
                  padding: "4px",
                  borderRadius: "10px",
                  direction: "rtl",
                  marginBottom: "0.4rem",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "1.5rem",
                alignItems: "center",
              }}
            >
              <FormControl sx={{ minWidth: "23%" }}>
                <Select
                  open={opentype}
                  onOpen={() => setOpentype(true)}
                  onClose={() => setOpentype(false)}
                  value={typeschool}
                  onChange={(e) => setTypeschool(e.target.value)}
                  displayEmpty
                  IconComponent={() =>
                    opentype ? (
                      <KeyboardArrowUpIcon sx={{ fontSize: "1.2rem" }} />
                    ) : (
                      <KeyboardArrowDownIcon sx={{ fontSize: "1.2rem" }} />
                    )
                  }
                  sx={{
                    borderRadius: "10px",
                    height: "40px",
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
                  <MenuItem value={0}>دولتی</MenuItem>
                  <MenuItem value={1}>نمونه‌دولتی</MenuItem>
                  <MenuItem value={2}>غیردولتی</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: "23%" }}>
                <Select
                  open={openlevel}
                  onOpen={() => setOpenlevel(true)}
                  onClose={() => setOpenlevel(false)}
                  value={levelschool}
                  onChange={(e) => {
                    setLevelschool(e.target.value);
                  }}
                  displayEmpty
                  IconComponent={() =>
                    openlevel ? (
                      <KeyboardArrowUpIcon sx={{ fontSize: "1.2rem" }} />
                    ) : (
                      <KeyboardArrowDownIcon sx={{ fontSize: "1.2rem" }} />
                    )
                  }
                  sx={{
                    borderRadius: "10px",
                    height: "40px",
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
                  <MenuItem value={0}>متوسطه دوره اول</MenuItem>
                  <MenuItem value={1}>متوسطه دوره دوم</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: "23%" }}>
                <Select
                  open={opencity}
                  onOpen={() => setOpencity(true)}
                  onClose={() => setOpencity(false)}
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  displayEmpty
                  IconComponent={() =>
                    opencity ? (
                      <KeyboardArrowUpIcon sx={{ fontSize: "1.2rem" }} />
                    ) : (
                      <KeyboardArrowDownIcon sx={{ fontSize: "1.2rem" }} />
                    )
                  }
                  sx={{
                    borderRadius: "10px",
                    height: "40px",
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
                  <MenuItem value={0}>تهران</MenuItem>
                  <MenuItem value={1}>پاکدشت</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: "23%" }}>
                <Select
                  // open={opentype}
                  // onOpen={() => setopenType(true)}
                  // onClose={() => setopenType(false)}
                  // value={typeschool}
                  // onChange={handleTypeschool}
                  displayEmpty
                  // IconComponent={() =>
                  //   opentype ? (
                  //     <KeyboardArrowUpIcon sx={{ fontSize: "1.2rem" }} />
                  //   ) : (
                  //     <KeyboardArrowDownIcon sx={{ fontSize: "1.2rem" }} />
                  //   )
                  // }
                  sx={{
                    borderRadius: "10px",
                    height: "40px",
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
                  <MenuItem value={0}>تهران</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Typography
              sx={{
                whiteSpace: "nowrap",
                mt: "20px",
                mb: "5px",
              }}
            >
              <HomeWorkOutlinedIcon sx={{ fontSize: "1rem", ml: "5px" }} />
              آدرس مدرسه
            </Typography>

            <TextField
              sx={{
                backgroundColor: "#f0f0f0",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              multiline
              value={schooladress}
              onChange={handleSchooladress}
              rows={3}
              variant="outlined"
              fullWidth
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row-reverse",
              gap: 2,
            }}
          >
            <Button
              sx={{
                padding: "5px 15px",
                fontSize: "0.9rem",
                minWidth: "100px",
                backgroundColor: "#417EEE",
                borderRadius: "8px",
                boxShadow: "none", // حذف سایه اصلی
                "&:hover": {
                  boxShadow: "none", // حذف سایه هنگام هاور
                },
              }}
              variant="contained"
            >
              ثبت و تایید{" "}
            </Button>

            <Button
              onClick={handleReset}
              sx={{
                padding: "5px 15px",
                fontSize: "0.9rem",
                minWidth: "100px",
                backgroundColor: "#f0f0f0",
                color: "black",
                boxShadow: "none",
                borderRadius: "8px",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
              variant="contained"
            >
              بازنشانی{" "}
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
