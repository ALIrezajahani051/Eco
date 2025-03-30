import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
  Grid,
  Paper,
  Divider,
} from "@mui/material";

import {
  IconlyArrowLeft2,
  IconlyHome,
  IconlyHomebold,
  IconlyInfoSquare,
  IconlyInfoSquarebold,
  IconlyProfileTick,
  IconlyBook,
  IconlyEdu,
  IconlyGame,
  IconlyEdit,
  IconlyCalendar,
  IconlyCalendarbold,
  IconlyBook2,
  IconlyWallet,
  IconlyReport,
  Iconlyuser,
  Iconlyuserbold,
  IconlyEditbold,
  IconlyArrowLeft,
  IconlyWalletbold,
  IconlyGameBold,
} from "../../../public/Icons";
import QuestionLessonBank from "./QuestionLessonBank";
const convertToPersianNumbers = (num) => {
  return num.toString().replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};
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

export default function QuestionBank() {
  const [level, setLevel] = useState(null);

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          width: "95%",
          mt: "40px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: "auto",
            borderRadius: "10px",
            position: "relative",
            zIndex: 2,
            paddingRight: "30px",
            paddingLeft: "30px",
            // paddingBottom: "20px",
            marginBottom: "10px",
            // paddingTop: "0px",
          }}
        >
          {level == null && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Typography variant="h6">
                  {level == null && "بانک سوالات"}
                </Typography>

                <Divider
                  sx={{
                    flex: 1,
                    mr: "5px",
                    opacity: 0.4,
                    borderWidth: "0.5px",
                  }}
                />

                <Button
                  disableElevation
                  disableFocusRipple
                  disableRipple
                  onClick={() => setLevel(null)} // navigate
                  sx={{
                    color: "black",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  بازگشت
                  <IconlyArrowLeft size={20} />
                </Button>
              </Box>
              <Grid container columnGap={3} rowGap={1} justifyContent="center">
                <Grid
                  item
                  onClick={() => setLevel(7)}
                  sm={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "50px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      rowGap: "10px",
                      fontSize: "0.95rem",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#417fee",
                        width: "45px",
                        height: "45px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "1.4rem",
                          marginTop: "7px",
                          marginLeft: "-1px",
                        }}
                      >
                        {convertToPersianNumbers("07")}
                      </Typography>
                    </Box>
                    پایه هفتم
                  </Typography>
                </Grid>

                <Grid
                  item
                  onClick={() => setLevel(8)}
                  sm={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "50px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      rowGap: "10px",
                      fontSize: "0.95rem",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#417fee",
                        width: "45px",
                        height: "45px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "1.4rem",
                          marginTop: "7px",
                          marginLeft: "-1px",
                        }}
                      >
                        {convertToPersianNumbers("08")}
                      </Typography>
                    </Box>
                    پایه هشتم
                  </Typography>
                </Grid>

                <Grid
                  item
                  onClick={() => setLevel(9)}
                  sm={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "50px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      rowGap: "10px",
                      fontSize: "0.95rem",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#417fee",
                        width: "45px",
                        height: "45px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "1.4rem",
                          marginTop: "7px",
                          marginLeft: "-1px",
                        }}
                      >
                        {convertToPersianNumbers("09")}
                      </Typography>
                    </Box>
                    پایه نهم
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}

          {level != null && (
            <QuestionLessonBank level={level} setLevel={setLevel} />
          )}
        </Box>{" "}
      </Box>
    </ThemeProvider>
  );
}
