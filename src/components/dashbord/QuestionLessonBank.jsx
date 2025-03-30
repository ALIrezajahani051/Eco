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

import QuestionTerm from "./QuestionTerm";
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

export default function QuestionLessonBank({ level, setLevel }) {
  const [lesson, setLesson] = useState(null);
  return (
    <ThemeProvider theme={customTheme}>
      {lesson != null && <QuestionTerm lesson={lesson} setLesson={setLesson} level={level} />}
      {lesson == null && (
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
              {level == 9 && "پایه نهم"}
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
              onClick={() => setLevel(null)}
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
          <Grid container columnGap={3} rowGap={2} justifyContent="center">
            <Grid
              item
              onClick={() => setLesson(1)}
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
                    padding: "10px",
                    borderRadius: "50%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.4rem",
                    }}
                  >
                    <IconlyDiagram color="white" />
                  </Typography>
                </Box>
                ریاضی{" "}
              </Typography>
            </Grid>

            <Grid
              item
              onClick={() => setLesson(2)}
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
                    padding: "10px",
                    borderRadius: "50%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.4rem",
                    }}
                  >
                    <IconlyTelescope color="white" />
                  </Typography>
                </Box>
                علوم{" "}
              </Typography>
            </Grid>

            <Grid
              item
              onClick={() => setLesson(3)}
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
                    padding: "10px",
                    borderRadius: "50%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "1.4rem",
                    }}
                  >
                    <IconlyGlobal color="white" />
                  </Typography>
                </Box>
                مطالعات{" "}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </ThemeProvider>
  );
}
