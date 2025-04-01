import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  Autocomplete,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  TableRow,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import {
  IconlyDrag,
  IconlyPrinter,
  IconlyFilter2,
  IconlyDown,
  IconlySearch,
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

const items = [
  {
    label: "شهر",
    options: [
      "تهران",
      "مشهد",
      "اصفهان",
      "شیراز",
      "تبریز",
      "اهواز",
      "کرج",
      "قم",
      "رشت",
      "قزوین",
    ],
  },
  {
    label: "رشته",
    options: [
      "مهندسی برق",
      "مهندسی کامپیوتر",
      "مهندسی مکانیک",
      "مهندسی عمران",
      "مهندسی صنایع",
      "مهندسی شیمی",
      "پرستاری",
      "دندانپزشکی",
      "پزشکی",
      "حقوق",
    ],
  },
  {
    label: "تیپ",
    options: ["تیپ ۱", "تیپ ۲", "تیپ ۳"],
  },
  {
    label: "جنسیت",
    options: ["مرد", "زن"],
  },
  {
    label: "خوابگاه",
    options: ["داشته باشد", "نداشته باشد"],
  },
  {
    label: "نوع دانشگاه",
    options: ["دولتی", "آزاد", "پیام نور", "غیرانتفاعی", "فرهنگیان"],
  },
  {
    label: "دوره تحصیلی",
    options: ["کارشناسی", "کارشناسی ارشد", "دکتری"],
  },
];

const PriorityField = React.memo(({ label, options }) => (
  <Box sx={{ width: "100%" }}>
    <Typography sx={{ marginBottom: "5px" }}>{label} :</Typography>
    <Autocomplete
      noOptionsText="مورد یافت نشد"
      popupIcon={<IconlyDown size={21} />}
      options={options}
      //   defaultValue={options[0]}
      autoComplete
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            backgroundColor: "#f0f0f0",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              padding: "5px",
              "& fieldset": {
                border: "none",
              },
            },
          }}
          placeholder="انتخاب کنید"
        />
      )}
    />
  </Box>
));
export default function FilterChoose({}) {
  const [copyed, setCopyed] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopyed(text);
    setTimeout(() => {
      setCopyed(null);
    }, 1500);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          backgroundColor: "#F5F4FC",
          height: "auto",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            minHeight: "80vh",
            width: "90%",
            marginBottom: "30px",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">جستجوی رشته</Typography>
            <Grid container spacing={3} sx={{ marginTop: "5px" }}>
              {items.map((item, index) => (
                <Grid item xs={6} sm={6} md={6} key={index}>
                  <PriorityField options={item.options} label={item.label} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Button sx={{
            marginTop:"30px",
            width:"15%",
            padding:"10px 25px 10px 25px",
            color:"white",
            backgroundColor:"#FF9B17",
            borderRadius:"10px",
          }}>جستجو</Button>
          <Box
            sx={{
              marginTop: "30px",
              borderTop: "2px dashed #F1EFEC",
              paddingTop: "15px",
            }}
          >
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              نتیجه جستجو <IconlySearch size={20} />:
            </Typography>
            <TableContainer
              sx={{
                borderRadius: "10px",
                marginTop: "10px",
                padding: "10px",
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: "center" }}>
                      نام دانشگاه
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>شهر</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>رشته</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>تیپ</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>جنسیت</TableCell>
                    <TableCell
                      sx={{ textAlign: "center", fontSize: "0.75rem" }}
                    >
                      نوع دانشگاه
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center", fontSize: "0.75rem" }}
                    >
                      دوره تحصیلی
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>خوابگاه</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      نحوه پذیرش
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>کد رشته</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      name: "دانشگاه تهران",
                      city: "تهران",
                      major: "مهندسی برق",
                      type: "دولتی",
                      level: "کارشناسی",
                      dorm: "دارد",
                      gender: "مرد",
                      tier: "تیپ ۱",
                      admission: "روزانه",
                      code: "12345",
                    },
                    {
                      name: "دانشگاه فردوسی مشهد",
                      city: "مشهد",
                      major: "پزشکی",
                      type: "دولتی",
                      level: "کارشناسی ارشد",
                      dorm: "ندارد",
                      gender: "زن",
                      tier: "تیپ ۲",
                      admission: "نیمسال دوم",
                      code: "67890",
                    },
                    {
                      name: "دانشگاه آزاد کرج",
                      city: "کرج",
                      major: "حقوق",
                      type: "آزاد",
                      level: "دکتری",
                      dorm: "دارد",
                      gender: "هر دو",
                      tier: "تیپ ۳",
                      admission: "روزانه",
                      code: "11223",
                    },
                    {
                      name: "دانشگاه صنعتی اصفهان",
                      city: "اصفهان",
                      major: "مهندسی مکانیک",
                      type: "دولتی",
                      level: "کارشناسی",
                      dorm: "ندارد",
                      gender: "زن",
                      tier: "تیپ ۱",
                      admission: "نیمسال دوم",
                      code: "33445",
                    },
                    {
                      name: "دانشگاه غیرانتفاعی شیراز",
                      city: "شیراز",
                      major: "پرستاری",
                      type: "غیرانتفاعی",
                      level: "کارشناسی ارشد",
                      dorm: "ندارد",
                      gender: "هر دو",
                      tier: "تیپ ۲",
                      admission: "روزانه",
                      code: "55667",
                    },
                  ].map((uni, index) => (
                    <TableRow
                      sx={{
                        "& th, & td": {
                          padding: "17px",

                          borderBottom: "2px dashed rgb(212, 201, 190,0.6)",
                        },
                      }}
                      key={index}
                    >
                      <TableCell sx={{ textAlign: "center" }}>
                        {uni.name}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {uni.city}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {uni.major}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {uni.tier}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {uni.gender}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {uni.type}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {uni.level}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {uni.dorm}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {uni.admission}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          handleCopy(uni.code);
                        }}
                        sx={{
                          textAlign: "center",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        {uni.code}
                        {uni.code == copyed && (
                          <Box
                            className="copyalert"
                            sx={{
                              position: "absolute",
                              top: "20%",
                              right: "-45px",
                              fontSize: "0.8rem",
                              padding: "6px",
                              backgroundColor: "black",
                              borderRadius: "10px",
                              color: "white",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                width: "10px",
                                height: "10px",
                                backgroundColor: "black",
                                top: "50%",
                                borderRadius: "3px",
                                transform: "translate(-45%,-50%) rotate(45deg)",
                                left: 0,
                              }}
                            />
                            کپی شد!
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
