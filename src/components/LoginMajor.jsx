import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  createTheme,
  ThemeProvider,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Button,
  InputBase,
} from "@mui/material";
import logoall from "../../public/logoall.svg";
import {
  IconlyLock,
  IconlyProfile,
  IconlyHide,
  IconlyShow,
} from "../../public/Icons";
import { useAuth } from "../AuthProvider";
const theme = createTheme({
  direction: "ltr",
  typography: {
    fontFamily: "IranSans, Arial, sans-serif",
    fontSize: 12,
    h6: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "0.85rem",
    },
  },
});

export default function LoginMajor() {
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [visiblePass, setVisiblePass] = useState(false);
  const [error, setError] = useState(false);
  const Auth = useAuth();
  const [form, setForm] = useState({
    username: null,
    password: null,
  });
  const toggle = () => {
    setLoadingCheck((prev) => !prev);
  };
  const navigate = useNavigate();
  const LoginHandler = async () => {
    toggle();
    console.log("FFF");
    await Auth.loginAction(form.username, form.password, setError);
    toggle();
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#F8F8F8",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            width: "80%",
            height: "80%",
            borderRadius: "30px",
            display: "flex",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "50%",
              backgroundImage: 'url("/book.svg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Box>

          <Box
            sx={{
              width: "50%",
              p: "8% 10% 20% 10%",
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {" "}
                <img src={logoall} style={{ alignSelf: "center" }} />
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", fontFamily: "Bold", mt: "20px" }}
                >
                  اکو کنکور
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", fontSize: "0.85rem", mt: "5px" }}
                >
                  سیستم انتخاب رشته آنلاین{" "}
                </Typography>
              </Box>

              <Box
                sx={{
                  mt: "50px",
                  display: "flex",
                  gap: "15px",
                  flexDirection: "column",
                }}
              >
                {error && (
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "center",
                      fontSize: "0.85rem",
                      mt: "5px",
                      color: "red",
                    }}
                  >
                    نام کاربری یا رمز‌عبور اشتباه است.{" "}
                  </Typography>
                )}
                <Box
                  sx={{
                    width: "100%",
                    height: "40px",
                    backgroundColor: "#F3F3F3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    px: "10px",
                    gap: "5px",
                  }}
                >
                  <IconlyProfile size={20} fill="black" />
                  <InputBase
                    onChange={(e) => {
                      setForm((prev) => {
                        const formt = { ...prev };
                        formt.username = e.target.value;
                        return formt;
                      });
                    }}
                    value={form.username}
                    disabled={loadingCheck}
                    sx={{
                      alignItems: "center",
                      flex: 1,
                    }}
                    placeholder="نام کاربری خود را وارد کنید."
                  />
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    height: "40px",
                    backgroundColor: "#F3F3F3",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    px: "10px",
                    gap: "5px",
                  }}
                >
                  <IconlyLock size={20} color="black" />
                  <InputBase
                    value={form.password}
                    onChange={(e) => {
                      setForm((prev) => {
                        const formt = { ...prev };
                        formt.password = e.target.value;
                        return formt;
                      });
                    }}
                    type={visiblePass ? undefined : "password"}
                    disabled={loadingCheck}
                    sx={{
                      flex: 1,
                      alignItems: "center",
                    }}
                    placeholder="رمز‌عبور خود را وارد نمایید."
                  />
                  <IconButton
                    sx={{
                      p: 0,
                    }}
                    onClick={() => {
                      setVisiblePass((prev) => !prev);
                    }}
                  >
                    {visiblePass ? (
                      <IconlyShow size={17} fill="black" />
                    ) : (
                      <IconlyHide size={17} fill="black" />
                    )}
                  </IconButton>
                </Box>
              </Box>
              <Button
                disabled={loadingCheck}
                sx={{
                  mt: "30px",
                  width: "100%",
                  color: "white",
                  p: "10px",
                  borderRadius: "10px",
                  backgroundColor: loadingCheck ? "gray" : "#5D6D7E",
                }}
                onClick={LoginHandler}
              >
                ورود{" "}
                {loadingCheck && (
                  <CircularProgress
                    color="inherit"
                    size="20px"
                    sx={{ mr: "5px" }}
                  />
                )}
              </Button>
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
                onClick={() => {
                  navigate("/major/forgot");
                }}
              >
                <Typography
                  sx={{
                    mt: "10px",
                    fontSize: "0.7rem",
                    cursor: "pointer",
                  }}
                >
                  رمز‌عبور خود را فراموش کردم{" "}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
