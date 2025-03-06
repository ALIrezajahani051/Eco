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
import Addcheck from "./Addcheck";

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

export default function Maincheck() {
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
        {item == 0 && <Addcheck setItem={setItem} />}

        {item == null && (
          <>
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
                <Typography>افزودن حضور و غیاب</Typography>
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
            <TableContainer
              sx={{
                paddingRight: "20px",
                direction: "ltr",
                height: "380px",
                overflowY: "scroll",
                boxShadow: "none",
                "&::-webkit-scrollbar": {
                  width: "8px",
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
                  <TableRow
                    sx={{ textAlign: "center", fontFamily: "BoldIran" }}
                  >
                    {[
                      "تاریخ",
                      "نام ثبت‌کننده",
                      "کلاس ثبت شده",
                      "درس",
                      "حاضر",
                      "غایب",
                      "تاخیر",
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
                  {[
                    {
                      date: "1403/08/18",
                      name: "علی خجسته فر",
                      class: "8/4",
                      subject: "ریاضی",
                      present: 4,
                      absent: 2,
                      late: 0,
                    },
                    {
                      date: "1403/08/18",
                      name: "بیژن مرتضوی",
                      class: "9/1",
                      subject: "شیمی",
                      present: 28,
                      absent: 0,
                      late: 1,
                    },
                  ].map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        textAlign: "center",
                        "& td,&th": { borderBottom: "2px dashed #c0c8d0" },
                      }}
                    >
                      <TableCell sx={{ textAlign: "center" }}>
                        {convertToPersianNumbers(row.date)}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {row.name}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {convertToPersianNumbers(row.class)}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {row.subject}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {convertToPersianNumbers(row.present)}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {convertToPersianNumbers(row.absent)}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {convertToPersianNumbers(row.late)}
                      </TableCell>
                      <TableCell sx={{ direction: "ltr" }}>
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
