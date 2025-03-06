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
  Paper,
} from "@mui/material";
import {
  IconlySearch,
  IconlyPlus,
  IconlyMoreSquare,
} from "../../../public/Icons";
import AddDisciplinaryReport from "./AddDisciplinaryReport";

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

const disciplinaryData = [
  {
    date: "1403/08/18",
    nameadder: "علی خجسته‌فر",
    student: "امیرعلی پیری",
    subject: "ریاضی",
    classstd: "8/1",
    type: "فحش ناموسی",
  },
  {
    date: "1403/08/19",
    nameadder: "مهدی رضایی",
    student: "سینا شاکری",
    subject: "علوم",
    classstd: "7/2",
    type: "بی‌نظمی در کلاس",
  },
  {
    date: "1403/08/20",
    nameadder: "زهرا کریمی",
    student: "محمدرضا قاسمی",
    subject: "ادبیات",
    classstd: "9/3",
    type: "تقلب در امتحان",
  },
  {
    date: "1403/08/21",
    nameadder: "نرگس احمدی",
    student: "علیرضا مرادی",
    subject: "تاریخ",
    classstd: "10/1",
    type: "دعوا با همکلاسی",
  },
  {
    date: "1403/08/22",
    nameadder: "حسین نوری",
    student: "یاسین رجبی",
    subject: "جغرافیا",
    classstd: "11/2",
    type: "خراب کردن وسایل مدرسه",
  },
  {
    date: "1403/08/23",
    nameadder: "سعید محمدی",
    student: "پارسا نادری",
    subject: "فیزیک",
    classstd: "12/3",
    type: "بی‌احترامی به معلم",
  },
];

export default function DisciplinaryReports() {
  const [item, setItem] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          gap: 3,
          height: "auto",
        }}
      >
        {item === 0 && <AddDisciplinaryReport setItem={setItem} />}

        {item === null && (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Button
                  onClick={() => setItem(0)}
                  variant="contained"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    backgroundColor: "#003089",
                    borderRadius: "10px",
                    boxShadow: "none",
                    padding: "10.5px 20px",
                    fontSize: "16px",
                    "&:hover": { boxShadow: "none" },
                  }}
                >
                  <IconlyPlus color="white" size={20} />
                  <Typography>افزودن موارد انظباطی</Typography>
                </Button>
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    backgroundColor: "#F5F4FC",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <IconlySearch />
                </Box>
              </Box>
            </Box>

            <TableContainer
              component={Paper}
              sx={{
                paddingRight: "20px",
                direction: "ltr",
                height: "380px",
                overflowY: "scroll",
                boxShadow: "none",
                "&::-webkit-scrollbar": {
                  width: "5px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#003089",
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                  borderRadius: "10px",
                },
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {[
                      "تاریخ",
                      "نام ثبت‌کننده",
                      "دانش‌آموز",
                      "درس",
                      "کلاس",
                      "نوع مورد انضباطی",
                      "",
                    ].map((header, index) => (
                      <TableCell
                        key={index}
                        sx={{ textAlign: "center", fontFamily: "BoldIran" }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {disciplinaryData.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        textAlign: "center",
                        "& td, & th": { borderBottom: "2px dashed #c0c8d0" },
                      }}
                    >
                      <TableCell sx={{ textAlign: "center" }}>
                        {convertToPersianNumbers(row.date)}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {row.nameadder}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {row.student}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {row.subject}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {convertToPersianNumbers(row.classstd)}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {row.type}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <IconlyMoreSquare />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}
