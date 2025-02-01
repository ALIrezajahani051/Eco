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
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toast.css";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const validatePhone = (phone) => {
    if (phone.length < 10 && 0 < phone.length) {
      setError((prevError) => ({
        ...prevError,
        username: "شماره موبایل باید 10 رقم باشد.",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        username: "",
      }));
    }
  };

  const handleUsernameChange = (e) => {
    const value = convertToEnglishDigits(e.target.value.replace(/\D/g, ""));
    setUsername(value);
    validatePhone(value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    toast.error("رمز عبور صحیح نیست!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    try {
      // عملیات ورود
    } catch (err) {
      console.log(err.message);
    } finally {
      // setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  function goSignup() {
    return navigate("/signup");
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
                boxShadow: "none", // حذف سایه اصلی
                "&:hover": {
                  boxShadow: "none", // حذف سایه هنگام هاور
                },
              }}
              variant="contained"
              color="primary"
            >
              <LoginIcon sx={{ marginLeft: "5px" }} />
              ورود
            </Button>
            <Button
              sx={{
                padding: "10px 20px",
                fontSize: "1rem",
                minWidth: "150px",
                boxShadow: "none", // حذف سایه اصلی
                "&:hover": {
                  boxShadow: "none", // حذف سایه هنگام هاور
                },
              }}
              variant="contained"
              color="white"
              onClick={goSignup}
            >
              <PersonAddAlt1OutlinedIcon sx={{ marginLeft: "5px" }} />
              ثبت نام
            </Button>
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              ورود به سایت
            </Typography>
            <Typography variant="body1" sx={{ color: "gray" }}>
              برای ورود لطفا شماره خود را وارد کنید.
            </Typography>
          </Box>

          <Divider variant="middle" />

          <Box>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "right",
              }}
            >
              <PhoneEnabledIcon
                sx={{
                  fontSize: "1.2rem",
                  marginLeft: "5px",
                  alignSelf: "center",
                }}
              />
              شماره موبایل:
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: "#f3f3f3",
                borderRadius: "4px",
                padding: 1,
                direction: "ltr",
                "&:hover": { backgroundColor: "#e0e0e0" },
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
                placeholder="9124867485"
                value={username}
                onChange={handleUsernameChange}
                sx={{
                  fontSize: "1rem",
                  width: "100%",
                  textAlign: "left",
                  direction: "ltr",
                }}
              />
            </Box>
            {error.username && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: "0.7rem",
                  textAlign: "right",
                  marginTop: "5px",
                }}
              >
                {error.username}
              </Typography>
            )}
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "right",
              }}
            >
              <LockIcon
                sx={{
                  fontSize: "1.2rem",
                  marginLeft: "5px",
                  alignSelf: "center",
                }}
              />
              رمز عبور:
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f3f3f3",
                borderRadius: "4px",
                padding: 1,
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <InputBase
                type={showPassword ? "text" : "password"}
                placeholder="رمز عبور خود را وارد کنید"
                value={password}
                onChange={handlePasswordChange}
                sx={{ fontSize: "0.8rem", width: "100%" }}
              />
              <IconButton onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </IconButton>
            </Box>
          </Box>

          <Button
            sx={{
              width: "100%",
              padding: "10px",
              fontSize: "1.1rem",
              marginTop: "16px",
            }}
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            ورود
            {isLoading ? (
              <CircularProgress
                sx={{ margin: "5px" }}
                color="white"
                size="1.3rem"
              />
            ) : (
              " "
            )}
          </Button>

          <Link to="/" style={{ textAlign: "center", marginTop: "16px" }}>
            <Typography
              fontSize={12}
              sx={{
                color: "gray",
                transition: "0.3s",
                "&:hover": { color: "#407eed" },
              }}
            >
              رمز خود را فراموش کرده ام
            </Typography>
          </Link>
        </Box>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
}
