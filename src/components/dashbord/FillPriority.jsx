import React, { useState } from "react";
import {
  Box,
  Autocomplete,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Delete } from "@mui/icons-material";
import {
  IconlyDelete,
  IconlyDown,
  IconlyPlus,
  IconlyProfileTick,
} from "../../../public/Icons";
import MajorPriority from "./MajorPriority";
const customTheme = createTheme({
  direction: "ltr",
  typography: {
    fontFamily: "IranSans, Arial, sans-serif",
    h6: { fontSize: "1rem", fontWeight: 700 },
    body1: { fontSize: "0.85rem" },
  },
});

const cities = [
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
];

const majors = [
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
];

const toPersianDigits = (num) =>
  num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const PriorityField = ({ label, options }) => (
  <Autocomplete
    noOptionsText="موردی یافت نشد"
    popupIcon={<IconlyDown size={21} />}
    options={options}
    autoComplete
    getOptionLabel={(option) => option}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder={label}
        size="small"
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          "& .MuiOutlinedInput-root": {
            padding: "4px",
            "& fieldset": {
              border: "1px solid #ddd",
              borderRadius: "10px",
            },
          },
        }}
      />
    )}
  />
);

export default function FillPriority({ setShowDetailsList }) {
  const [details, setDetails] = useState(false);
  const [categories, setCategories] = useState([
    {
      id: Date.now(),
      type: "city",
      cityPriorities: 4,
      majorPriorities: 4,
    },
  ]);

  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "city",
        cityPriorities: 4,
        majorPriorities: 4,
      },
    ]);
  };

  const removeCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const updateType = (id, value) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, type: value } : cat))
    );
  };

  const adjustCount = (id, key, type) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              [key]: type === "inc" ? cat[key] + 1 : Math.max(1, cat[key] - 1),
            }
          : cat
      )
    );
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 3, backgroundColor: "white", borderRadius: 2 }}>
        {!details && (
          <>
            <Typography variant="h6" sx={{ textAlign: "right" }}>
              راهنمای استفاده :
            </Typography>
            <Typography
              sx={{ mb: 10, textAlign: "right", fontSize: "0.82rem" }}
            >
              - ابتدا با استفاده از دکمه "افزودن دسته جدید" می‌توانید چندین
              دسته‌بندی برای انتخاب شهر و رشته ایجاد کنید.
              <br />
              - هر دسته می‌تواند "شهر محور" یا "رشته محور" باشد که قابل انتخاب
              از منوی مربوطه است.
              <br />
              - برای هر دسته، تعدادی اولویت شهر و رشته مشخص کنید. می‌توانید با
              دکمه‌های "افزودن" و "حذف" تعداد آن‌ها را تغییر دهید.
              <br />- در نهایت با زدن دکمه "ثبت و تایید" اطلاعات شما ذخیره خواهد
              شد.
            </Typography>

            <Grid container spacing={3}>
              {categories.map((cat, idx) => (
                <Grid item xs={12} key={cat.id}>
                  <Card variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardHeader
                      title={`دسته ${toPersianDigits(idx + 1)}`}
                      action={
                        <Tooltip title="حذف دسته">
                          <IconButton onClick={() => removeCategory(cat.id)}>
                            <IconlyDelete color="red" fill="red" />
                          </IconButton>
                        </Tooltip>
                      }
                      sx={{ pb: 0 }}
                    />
                    <CardContent
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "10px",
                          border: "none",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 3,
                        }}
                      >
                        <Typography>نوع دسته:</Typography>
                        <Select
                          sx={{
                            direction: "ltr",
                            width: "120px",
                          }}
                          size="small"
                          value={cat.type}
                          onChange={(e) => updateType(cat.id, e.target.value)}
                          // IconComponent={() => <IconlyDown size={22} />}
                        >
                          <MenuItem value="city">شهر محور</MenuItem>
                          <MenuItem value="major">رشته محور</MenuItem>
                        </Select>
                      </Box>

                      {cat.type === "city" ? (
                        <>
                          <Box sx={{ mb: 4 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <Typography fontWeight={600}>
                                اولویت شهر (
                                {toPersianDigits(cat.cityPriorities)} آیتم)
                              </Typography>
                              <Box>
                                <Button
                                  onClick={() =>
                                    adjustCount(cat.id, "cityPriorities", "inc")
                                  }
                                  size="small"
                                  variant="outlined"
                                  sx={{ mx: 0.5, borderRadius: 2 }}
                                >
                                  افزودن
                                </Button>
                                <Button
                                  onClick={() =>
                                    adjustCount(cat.id, "cityPriorities", "dec")
                                  }
                                  size="small"
                                  variant="outlined"
                                  sx={{ borderRadius: 2 }}
                                >
                                  حذف
                                </Button>
                              </Box>
                            </Box>
                            <Grid container spacing={2}>
                              {[...Array(cat.cityPriorities)].map((_, i) => (
                                <Grid item xs={12} sm={6} md={3} key={i}>
                                  <PriorityField
                                    label={`شهر ${toPersianDigits(i + 1)}`}
                                    options={cities}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </Box>

                          <Divider sx={{ my: 3 }} />

                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <Typography fontWeight={400}>
                                اولویت رشته (
                                {toPersianDigits(cat.majorPriorities)} آیتم)
                              </Typography>
                              <Box>
                                <Button
                                  onClick={() =>
                                    adjustCount(
                                      cat.id,
                                      "majorPriorities",
                                      "inc"
                                    )
                                  }
                                  size="small"
                                  variant="outlined"
                                  sx={{ mx: 0.5, borderRadius: 2 }}
                                >
                                  افزودن
                                </Button>
                                <Button
                                  onClick={() =>
                                    adjustCount(
                                      cat.id,
                                      "majorPriorities",
                                      "dec"
                                    )
                                  }
                                  size="small"
                                  variant="outlined"
                                  sx={{ borderRadius: 2 }}
                                >
                                  حذف
                                </Button>
                              </Box>
                            </Box>
                            <Grid container spacing={2}>
                              {[...Array(cat.majorPriorities)].map((_, i) => (
                                <Grid item xs={12} sm={6} md={3} key={i}>
                                  <PriorityField
                                    label={`رشته ${toPersianDigits(i + 1)}`}
                                    options={majors}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box sx={{ mb: 4 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <Typography fontWeight={600}>
                                اولویت رشته (
                                {toPersianDigits(cat.majorPriorities)} آیتم)
                              </Typography>
                              <Box>
                                <Button
                                  onClick={() =>
                                    adjustCount(
                                      cat.id,
                                      "majorPriorities",
                                      "inc"
                                    )
                                  }
                                  size="small"
                                  variant="outlined"
                                  sx={{ mx: 0.5, borderRadius: 2 }}
                                >
                                  افزودن
                                </Button>
                                <Button
                                  onClick={() =>
                                    adjustCount(
                                      cat.id,
                                      "majorPriorities",
                                      "dec"
                                    )
                                  }
                                  size="small"
                                  variant="outlined"
                                  sx={{ borderRadius: 2 }}
                                >
                                  حذف
                                </Button>
                              </Box>
                            </Box>
                            <Grid container spacing={2}>
                              {[...Array(cat.majorPriorities)].map((_, i) => (
                                <Grid item xs={12} sm={6} md={3} key={i}>
                                  <PriorityField
                                    label={`رشته ${toPersianDigits(i + 1)}`}
                                    options={majors}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </Box>

                          <Divider sx={{ my: 3 }} />

                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <Typography fontWeight={400}>
                                اولویت شهر (
                                {toPersianDigits(cat.cityPriorities)} آیتم)
                              </Typography>
                              <Box>
                                <Button
                                  onClick={() =>
                                    adjustCount(cat.id, "cityPriorities", "inc")
                                  }
                                  size="small"
                                  variant="outlined"
                                  sx={{ mx: 0.5, borderRadius: 2 }}
                                >
                                  افزودن
                                </Button>
                                <Button
                                  onClick={() =>
                                    adjustCount(cat.id, "cityPriorities", "dec")
                                  }
                                  size="small"
                                  variant="outlined"
                                  sx={{ borderRadius: 2 }}
                                >
                                  حذف
                                </Button>
                              </Box>
                            </Box>
                            <Grid container spacing={2}>
                              {[...Array(cat.cityPriorities)].map((_, i) => (
                                <Grid item xs={12} sm={6} md={3} key={i}>
                                  <PriorityField
                                    label={`شهر ${toPersianDigits(i + 1)}`}
                                    options={cities}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                onClick={addCategory}
                variant="contained"
                disableElevation
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  background: "#006A71",
                  color: "white",
                  boxShadow: "none",
                  fontWeight: 600,
                }}
              >
                <IconlyPlus color="white" size={20} />
                <Typography sx={{ marginRight: "5px" }}>
                  {" "}
                  افزودن دسته جدید
                </Typography>
              </Button>
            </Box>

            <Button
              onClick={() => {
                setDetails(true);
                setShowDetailsList(true);
              }}
              disableElevation
              variant="contained"
              sx={{
                width: "100%",
                mt: 8,
                px: 5,
                py: 1.5,
                borderRadius: 3,
                background: "#0081ff",
                color: "white",
                fontWeight: 600,
              }}
            >
              ثبت و تایید
            </Button>
          </>
        )}
        {details && <MajorPriority />}
      </Box>
    </ThemeProvider>
  );
}
