import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Typography,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Listabscheck = () => {
  const initstudents = [
    { id: 1, name: "علیرضا جهانی فر", status: 0 },
    { id: 2, name: "محسن معین فر", status: 0 },
    { id: 3, name: "زهرا", status: 0 },
    { id: 4, name: "محمد", status: 0 },
    { id: 5, name: "زهرا", status: 0 },
    { id: 6, name: "محمد", status: 0 },
    { id: 7, name: "زهرا", status: 0 },
    { id: 8, name: "محمد", status: 0 },
    { id: 9, name: "زهرا", status: 0 },
    { id: 10, name: "محمد", status: 0 },
    { id: 11, name: "زهرا", status: 0 },
    { id: 12, name: "محمد", status: 0 },
  ];
  const [students, setStudents] = useState(initstudents);
  function setstatus(id, status) {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, status: status } : student
    );
    setStudents(updatedStudents);
  }
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TableContainer
          sx={{
            paddingRight: "0px",
            direction: "ltr",
            height: "360px",
            overflowY: "auto",
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
          <Table>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell
                    sx={{
                      width: "20px",
                      textAlign: "right",
                      borderLeft: "1px solid gray",
                    }}
                  >
                    {convertToPersianNumbers(student.id)}
                  </TableCell>
                  <TableCell sx={{ textAlign: "right", textWrap: "nowrap" }}>
                    {student.name}
                  </TableCell>
                  <TableCell sx={{ width: "40%" }}></TableCell>
                  <TableCell sx={{ width: "50%", textAlign: "right" }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 4,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        onClick={(e) => {
                          setstatus(student.id, 3);
                        }}
                        sx={{
                          backgroundColor: student.status == 3 ? "#D21919" : "",
                          border: "1px solid #D21919",
                          color: student.status == 3 ? "white" : "black",
                          borderRadius: "10px",
                          fontSize: "0.85rem",
                          paddingRight: "30px",
                          paddingLeft: "30px",

                          textWrap: "nowrap",
                        }}
                      >
                        غیبت غیر موجه
                      </Button>
                      <Button
                        onClick={(e) => {
                          setstatus(student.id, 2);
                        }}
                        sx={{
                          border: "1px solid #747474",
                          color: student.status == 2 ? "white" : "black",
                          borderRadius: "10px",
                          fontSize: "0.85rem",
                          paddingRight: "30px",
                          paddingLeft: "30px",
                          textWrap: "nowrap",
                          backgroundColor: student.status == 2 ? "#747474" : "",
                        }}
                      >
                        غیبت موجه
                      </Button>
                      <Button
                        onClick={(e) => {
                          setstatus(student.id, 1);
                        }}
                        sx={{
                          border: "1px solid #BB4C08",
                          color: student.status == 1 ? "white" : "black",
                          borderRadius: "10px",
                          fontSize: "0.85rem",
                          paddingRight: "25px",
                          paddingLeft: "25px",
                          textWrap: "nowrap",

                          backgroundColor: student.status == 1 ? "#BB4C08" : "",
                        }}
                      >
                        تاخیر
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>توضیحات</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          sx={{
            marginTop: "2%",
            backgroundColor: "#417fee",
            width: "100%",
            color: "white",
            borderRadius: "10px",
            padding: "13px",
          }}
        >
          <Typography sx={{ fontSize: "15px" }}>ثبت و تایید </Typography>
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Listabscheck;
