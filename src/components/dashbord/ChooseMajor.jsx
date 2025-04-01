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
import MajorPriority from "./MajorPriority";
import FillPriority from "./FillPriority";

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

export default function ChooseMajor() {
  const [type, setType] = useState(null);
  const [show, setShow] = useState(true);

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          width: "95%",
          mt: "25px",
          position: "relative",
        }}
      >
        <Typography
          sx={{ marginBottom: "1%", display: "flex", alignItems: "center" }}
        >
          انتخاب رشته{" "}
          {type != null && (
            <>
              <IconlyArrowLeft2 size={18} />
              {type ? "شهر محور " : "رشته محور"}
              <IconlyArrowLeft2 size={18} />
              انتخاب اولویت ها
            </>
          )}
          {!show && (
            <>
              <IconlyArrowLeft2 size={18} />
              جزئیات
            </>
          )}
        </Typography>
        {type != null && (
          <FillPriority show={show} setShow={setShow} type={type} />
        )}
        {type == null && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                backgroundColor: "white",
                height: "auto",
                borderRadius: "10px",
                position: "relative",
                padding: "30px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography>اولویت خود را انتخاب کنید.</Typography>{" "}
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  justifyContent: "center",
                  padding: "50px",
                }}
              >
                <Button
                  onClick={(e) => setType(0)}
                  style={{
                    background:
                      "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    border: 0,
                    borderRadius: 10,
                    color: "white",
                    padding: "10px 30px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textTransform: "none",
                    transition: "0.3s",
                  }}
                >
                  رشته محور
                </Button>

                <Button
                  onClick={(e) => setType(1)}
                  style={{
                    background:
                      "linear-gradient(45deg, #48A6A7 30%, #006A71 90%)",
                    border: 0,
                    borderRadius: 10,
                    color: "white",
                    padding: "10px 30px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textTransform: "none",
                    transition: "0.3s",
                  }}
                >
                  شهر محور{" "}
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "3%",
                  gap: 1,
                }}
              >
                <Typography variant="h6">راهنمای استفاده:</Typography>
                <Typography>
- این سامانه صرفا به عنوان تسهیل دهنده اولویت ها ایجاد شده است برای انتخاب در موعد مقرر به سایت اصلی جهت انتخاب رشته مراجعه کنید.                </Typography>
                <Typography>
                  - با انتخاب هر یک از دکمه‌های بالا، اولویت خود را تعیین کنید.
                </Typography>
                <Typography>
                  - گزینه "رشته محور" به شما امکان می‌دهد ابتدا رشته تحصیلی مورد
                  نظر خود را انتخاب کنید و سپس شهرهای ارائه‌دهنده آن رشته را
                  مشاهده کنید.
                </Typography>
                <Typography>
                  - گزینه "شهر محور" به شما این امکان را می‌دهد که ابتدا شهر
                  مورد نظر خود را انتخاب کنید و سپس رشته‌های موجود در آن شهر را
                  بررسی کنید.
                </Typography>
                <Typography>
                  - بعد از انتخاب اولویت، اطلاعات تکمیلی نمایش داده خواهد شد تا
                  بتوانید تصمیم‌گیری بهتری داشته باشید.
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
