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
import Majordetail from "./Majordetail";
import Majortitle from "./Majortitle";

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

export default function MajorPriority({ type }) {
  const majors = [
    {
      uni_name: "دانشگاه تهران",
      major: "مهندسی کامپیوتر",
      sex: 0,
      code: "40001",
      dorm: true,
      university_type: "public",
      capacity: 100,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه صنعتی شریف",
      major: "مهندسی برق",
      sex: 1,
      code: "40002",
      dorm: true,
      university_type: "public",
      capacity: 60,
      major_type: "daytime",
      description: "برنامه درسی به‌روز و اساتید مجرب",
    },
    {
      uni_name: "دانشگاه امیرکبیر",
      major: "مهندسی مکانیک",
      sex: 0,
      code: "40003",
      dorm: false,
      university_type: "public",
      capacity: 70,
      major_type: "nighttime",
      description: null,
    },
    {
      uni_name: "دانشگاه تبریز",
      major: "مهندسی عمران",
      sex: 0,
      code: "50004",
      dorm: true,
      university_type: "public",
      capacity: 80,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه تبریز",
      major: "مهندسی عمران",
      sex: 0,
      code: "50004",
      dorm: true,
      university_type: "public",
      capacity: 80,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه تبریز",
      major: "مهندسی عمران",
      sex: 0,
      code: "50004",
      dorm: true,
      university_type: "public",
      capacity: 80,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه تبریز",
      major: "مهندسی عمران",
      sex: 0,
      code: "50004",
      dorm: true,
      university_type: "public",
      capacity: 80,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه تبریز",
      major: "مهندسی عمران",
      sex: 0,
      code: "50004",
      dorm: true,
      university_type: "public",
      capacity: 80,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه تبریز",
      major: "مهندسی عمران",
      sex: 0,
      code: "50004",
      dorm: true,
      university_type: "public",
      capacity: 80,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه تبریز",
      major: "مهندسی عمران",
      sex: 0,
      code: "50004",
      dorm: true,
      university_type: "public",
      capacity: 80,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه تبریز",
      major: "مهندسی عمران",
      sex: 0,
      code: "50004",
      dorm: true,
      university_type: "public",
      capacity: 80,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه تبریز",
      major: "مهندسی عمران",
      sex: 0,
      code: "50004",
      dorm: true,
      university_type: "public",
      capacity: 80,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه تبریز",
      major: "مهندسی عمران",
      sex: 0,
      code: "50004",
      dorm: true,
      university_type: "public",
      capacity: 80,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه تبریز",
      major: "مهندسی عمران",
      sex: 0,
      code: "50004",
      dorm: true,
      university_type: "public",
      capacity: 80,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه تبریز",
      major: "مهندسی عمران",
      sex: 0,
      code: "50004",
      dorm: true,
      university_type: "public",
      capacity: 80,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه تبریز",
      major: "مهندسی عمران",
      sex: 0,
      code: "50004",
      dorm: true,
      university_type: "public",
      capacity: 80,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه تبریز",
      major: "مهندسی عمران",
      sex: 0,
      code: "50004",
      dorm: true,
      university_type: "public",
      capacity: 80,
      major_type: "daytime",
      description: null,
    },
    {
      uni_name: "دانشگاه فردوسی مشهد",
      major: "علوم کامپیوتر",
      sex: 1,
      code: "50005",
      dorm: true,
      university_type: "public",
      capacity: 50,
      major_type: "daytime",
      description: "محیط دانشگاهی پویا و امکانات آموزشی عالی",
    },
  ];

  const title = [
    {
      uni_name: "دانشگاه",
      major: "رشته",
      sex: 1,
      code: "50005",
      dorm: "وضعیت خوابگاه",
      university_type: "public",
      capacity: 50,
      major_type: "",
      description: "توضیحات",
    },
  ];

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ width: "100%" ,position:"relative"}}>
        <Majortitle />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {majors.map((major, index) => (
            <Majordetail key={index} major={major} />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
