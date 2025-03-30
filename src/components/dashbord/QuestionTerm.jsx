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
  IconlyArrowLeft,
  IconlyEdit,
  IconlyCalendar,
  IconlyCalendarbold,
  IconlyBook2,
  IconlyDiagram,
  IconlyWallet,
  IconlyReport,
  Iconlyuser,
  Iconlyuserbold,
  IconlyEditbold,
  IconlyWalletbold,
  IconlyGameBold,
  IconlyTelescope,
  IconlyGlobal,
} from "../../../public/Icons";
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

export default function QuestionTerm({ level, lesson, setLesson }) {
  const [term, setTerm] = useState(null);
  return (
    <ThemeProvider theme={customTheme}>
      {term == null && (
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
              {level == 7 && "پایه هفتم"}
              {level == 8 && "پایه هشتم"}
              {level == 9 && "پایه نهم"} {lesson == 1 && "ریاضی"}
              {lesson == 2 && "علوم"}
              {lesson == 3 && "مطالعات"}
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
              onClick={() => setLesson(null)}
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
          <Grid container columnGap={3} rowGap={3} justifyContent="center">
            <Grid
              item
              //   onClick={() => setLesson(1)}
              sm={5}
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
                  fontSize: "1.1rem",
                }}
              >
                میان نوبت اول{" "}
              </Typography>
            </Grid>

            <Grid
              item
              //   onClick={() => setLesson(1)}
              sm={5}
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
                  fontSize: "1.1rem",
                }}
              >
                ترم اول{" "}
              </Typography>
            </Grid>

            <Grid
              item
              //   onClick={() => setLesson(1)}
              sm={5}
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
                  fontSize: "1.1rem",
                }}
              >
                میان نوبت دوم{" "}
              </Typography>
            </Grid>
            <Grid
              item
              //   onClick={() => setLesson(1)}
              sm={5}
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
                  fontSize: "1.1rem",
                }}
              >
                ترم دوم{" "}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </ThemeProvider>
  );
}
