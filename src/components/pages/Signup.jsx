import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  InputBase,
  Typography,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  IconlyHome,
  IconlyProfile,
  IconlyLogin,
  IconlyAdduser,
  IconlyMoreSquare,
  IconlyCall,
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
  const [subcity, setSubcity] = useState(0);
  const [opensubcity, setOpensubcity] = useState(false);
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
    setSubcity(0);
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
          // minHeight: "100vh",
          padding: "30px",
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
            padding: { xs: "20px", sm: "40px" },
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { xs: 2, sm: 8 },
            }}
          >
            <Button
              sx={{
                padding: "10px 20px",
                fontSize: "1rem",
                minWidth: { xs: "100px", sm: "150px" },
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
                display: "flex",
                gap: 0.5,
              }}
              variant="contained"
              color="white"
              onClick={goLogin}
            >
              <IconlyLogin size={25} sx={{ marginLeft: "10px" }} />
              ورود
            </Button>
            <Button
              sx={{
                padding: "10px 20px",
                fontSize: "1rem",
                minWidth: { xs: "100px", sm: "150px" },
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
                display: "flex",
                gap: 0.5,
              }}
              variant="contained"
              color="primary"
            >
              <IconlyAdduser />
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
                  fontFamily: "BoldIran",
                }}
              >
                اطلاعات مدیر مدرسه
              </Typography>
              <Divider sx={{ flexGrow: 1, mr: 1, borderColor: "gray" }} />
            </Box>

            <Grid container spacing={2} sx={{ marginTop: "10px" }}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    {" "}
                    <IconlyProfile size={17} sx={{ fontSize: "1.2rem" }} />
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
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    <IconlyProfile size={17} sx={{ fontSize: "1.2rem" }} />
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
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    <IconlyMoreSquare size={17} sx={{ fontSize: "1.2rem" }} />
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
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    <IconlyCall size={17} sx={{ fontSize: "1.2rem" }} />
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
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontFamily: "BoldIran",
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                }}
              >
                اطلاعات مدرسه
              </Typography>
              <Divider sx={{ flexGrow: 1, mr: 1, borderColor: "gray" }} />
            </Box>
            <Grid container spacing={2} sx={{ marginTop: "10px" }}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: "right" }}>
                  <Typography>نام مدرسه</Typography>{" "}
                  <InputBase
                    value={schoolname}
                    onChange={(e) => {
                      setSchoolname(e.target.value);
                    }}
                    sx={{
                      backgroundColor: "#F3F3F3",
                      fontSize: "1rem",
                      width: "100%",
                      padding: "4px",
                      borderRadius: "10px",
                      direction: "rtl",
                      marginBottom: "0.4rem",
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}></Grid>

              <Grid item xs={12} sm={6} md={3}></Grid>

              <Grid item xs={12} sm={6} md={3}></Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl sx={{ width: "100%" }}>
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
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl sx={{ width: "100%" }}>
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
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl sx={{ width: "100%" }}>
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
                    <MenuItem value={1}>خراسان رضوی</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    open={opensubcity}
                    onOpen={() => setOpensubcity(true)}
                    onClose={() => setOpensubcity(false)}
                    value={subcity}
                    onChange={(e) => setSubcity(e.target.value)}
                    displayEmpty
                    IconComponent={() =>
                      opensubcity ? (
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
              </Grid>
            </Grid>

            <Typography
              sx={{
                whiteSpace: "nowrap",
                mt: "20px",
                mb: "5px",
                display: "flex",
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <IconlyHome sx={{ fontSize: "1rem", ml: "5px" }} />
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
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
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
