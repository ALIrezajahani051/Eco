import React, { useState, useEffect } from "react";
import {
  Box,
  Autocomplete,
  TextField,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  IconButton,
  CircularProgress,
  MenuItem,
  Select,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
} from "@mui/material";
import citiesJson from "../../../public/cities.json";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  IconlyDelete,
  IconlyDown,
  IconlyPlus,
  IconlyArrowDown2,
} from "../../../public/Icons";

const customTheme = createTheme({
  direction: "ltr",
  typography: {
    fontFamily: "IranSans, Arial, sans-serif",
    h6: { fontSize: "1rem", fontWeight: 700 },
    body1: { fontSize: "0.85rem" },
  },
});

const doreOptions = [
  "روزانه",
  "پیام نور",
  "روزانه - غیردولتی",
  "غیرانتفاعی",
  "پردیس خودگردان",
  "مجازی",
  "مشترک",
  "نوبت دوم",
];

const toPersianDigits = (num) =>
  num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const PriorityField = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  getOptionDisabled = null,
}) => (
  <Autocomplete
    noOptionsText="موردی یافت نشد"
    popupIcon={<IconlyDown size={21} />}
    options={options}
    value={value}
    disabled={disabled}
    onChange={onChange}
    getOptionDisabled={getOptionDisabled}
    sx={{ flex: 1 }}
    autoComplete
    getOptionLabel={(option) => option || ""}
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

export default function FillPriority({
  programCurr,
  setProgramCurr,
  setPrograms,
  details,
  setIsSave,
  setPriorityService,
}) {
  const [majoresList, setMajoresList] = useState([]);
  const [majors, setMajoresOptions] = useState([]);

  const [categories, setCategories] = useState([
    {
      id: Date.now(),
      type: "city",
      cityPriorities: 4,
      majorPriorities: 4,
      dorePriorities: 4,
      provPrioritiesList: Array(4).fill(null),
      cityPrioritiesList: Array(4).fill(null),
      majorPrioritiesList: Array(4).fill(null),
      dorePriorityList: Array(4).fill(null),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    setProvinces(citiesJson.map((Object) => Object.province));
  }, []);
  useEffect(() => {
    console.log("📡 شروع درخواست به get_majores");

    const get_fetch = async () => {
      try {
        const res = await fetch(
          "https://emeettest.pythonanywhere.com/get_majores?field=2",
          {
            method: "GET",
            // headers: {
            //   "Content-Type": "application/json",
            //   Authorization: `Token ${localStorage.getItem("token")}`, // اگه نیاز داره
            // },
          }
        );

        console.log("📥 پاسخ دریافت شد. status:", res.status);

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("❌ خطای API:", res.status, errorData);
          return;
        }

        const data = await res.json();
        console.log("✅ داده‌های دریافتی:", data);
        setMajoresOptions(data);
      } catch (error) {
        console.error("❌ خطای fetch (مثل مشکل شبکه):", error.message || error);
      }
    };

    get_fetch();
  }, []);

  const updateProvince = (categoryId, priorityIndex, value) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          const newProvList = [...cat.provPrioritiesList];
          newProvList[priorityIndex] = value;
          return {
            ...cat,
            provPrioritiesList: newProvList,
            cityPrioritiesList: value
              ? cat.cityPrioritiesList.map((city, idx) =>
                  idx === priorityIndex ? null : city
                )
              : cat.cityPrioritiesList,
          };
        }
        return cat;
      })
    );
  };

  const getCitiesForProvince = (province) => {
    if (!province) return [];
    const provinceData = citiesJson.find((item) => item.province === province);
    return provinceData ? provinceData.cities : [];
  };

  const isMajorAlreadySelected = (categoryId, currentPriorityIndex, major) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return false;
    return category.majorPrioritiesList.some(
      (selectedMajor, idx) =>
        selectedMajor === major && idx !== currentPriorityIndex
    );
  };

  const isCityAlreadySelected = (categoryId, currentPriorityIndex, city) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return false;
    return category.cityPrioritiesList.some(
      (selectedCity, idx) =>
        selectedCity === city && idx !== currentPriorityIndex
    );
  };

  const isDoreAlreadySelected = (categoryId, currentPriorityIndex, dore) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return false;
    return category.dorePriorityList.some(
      (selectedDore, idx) =>
        selectedDore === dore && idx !== currentPriorityIndex
    );
  };

  const updateCity = (categoryId, priorityIndex, value) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          const newCityList = [...cat.cityPrioritiesList];
          newCityList[priorityIndex] = value;
          return { ...cat, cityPrioritiesList: newCityList };
        }
        return cat;
      })
    );
  };

  const updateMajor = (categoryId, priorityIndex, value) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          const newMajorList = [...cat.majorPrioritiesList];
          newMajorList[priorityIndex] = value;
          return { ...cat, majorPrioritiesList: newMajorList };
        }
        return cat;
      })
    );
  };

  const updateDore = (cat_id, i, newValue = null) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== cat_id) return cat;
        const cat_dorePriority = [...cat.dorePriorityList];
        cat_dorePriority[i] = newValue;
        return {
          ...cat,
          dorePriorityList: cat_dorePriority,
        };
      })
    );
  };

  const adjustArrayLength = (array, newLength, fillValue = null) => {
    if (array.length < newLength) {
      return [...array, ...Array(newLength - array.length).fill(fillValue)];
    }
    return array.slice(0, newLength);
  };

  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "city",
        cityPriorities: 4,
        majorPriorities: 4,
        dorePriorities: 4,
        provPrioritiesList: Array(4).fill(null),
        cityPrioritiesList: Array(4).fill(null),
        majorPrioritiesList: Array(4).fill(null),
        dorePriorityList: Array(4).fill(null),
      },
    ]);
  };

  const removeCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const updateType = (id, value) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === id) {
          return {
            ...cat,
            type: value,
          };
        }
        return cat;
      })
    );
  };

  const adjustCount = (id, key, type) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== id) return cat;

        const currentLength = cat[key];
        const newCount =
          type === "inc" ? currentLength + 1 : Math.max(1, currentLength - 1);

        // تابع فقط لیست خاص رو تغییر می‌ده
        const adjustList = (list) => {
          if (list.length < newCount) {
            return [...list, ...Array(newCount - list.length).fill(null)];
          }
          return list.slice(0, newCount);
        };

        const updated = {
          ...cat,
          [key]: newCount,
        };

        if (key === "provPriorities") {
          updated.provPrioritiesList = adjustList(cat.provPrioritiesList);
        } else if (key === "cityPriorities") {
          updated.cityPrioritiesList = adjustList(cat.cityPrioritiesList);
        } else if (key === "majorPriorities") {
          updated.majorPrioritiesList = adjustList(cat.majorPrioritiesList);
        } else if (key === "dorePriorities") {
          updated.dorePriorityList = adjustList(cat.dorePriorityList);
        }

        return updated;
      })
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const doreMapping = {
        روزانه: "daytime",
        "پیام نور": "payam_noor",
        "روزانه - غیردولتی": "daytime_nonpublic",
        غیرانتفاعی: "nonprofit",
        "پردیس خودگردان": "pardis",
        مجازی: "virtual",
        مشترک: "joint",
        "نوبت دوم": "evening",
      };

      const orders = categories.map((category) => ({
        type: category.type === "city" ? 1 : 0,
        major: category.majorPrioritiesList.filter(Boolean),
        city: category.cityPrioritiesList.filter(Boolean),
        dore: category.dorePriorityList
          .filter(Boolean)
          .map((item) => doreMapping[item] || item),
      }));

      const response = await fetch(
        "https://emeettest.pythonanywhere.com/major/order/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ orders }),
        }
      );

      if (!response.ok) {
        throw new Error("خطا در پاسخ سرور");
      }

      const data = await response.json();

      setPrograms((prevPrograms) =>
        prevPrograms.map((program) =>
          program.id === programCurr.id ? { ...program, data: data } : program
        )
      );
      setIsSave(true);
      setProgramCurr((prev) => ({ ...prev, data: data }));
      setPriorityService(false);
    } catch (error) {
      console.error("خطا در ارسال درخواست:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ p: 3, backgroundColor: "white", borderRadius: 2 }}>
        {!details && (
          <>
            <Box mb="10px">
              <Accordion
                sx={{
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "#F8F8F8",
                }}
              >
                <AccordionSummary expandIcon={<IconlyArrowDown2 />}>
                  <Typography variant="h6" sx={{ fontSize: "0.9rem" }}>
                    راهنمای استفاده از سیستم اولویت بندی
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    <Typography>
                      - ابتدا با استفاده از دکمه "افزودن دسته جدید" می‌توانید
                      چندین دسته‌بندی ایجاد کنید.
                    </Typography>
                    <Typography>
                      - هر دسته می‌تواند "شهر محور" یا "رشته محور" باشد.
                    </Typography>
                    <Typography>
                      - برای هر دسته، تعدادی اولویت شهر و رشته مشخص کنید.
                    </Typography>
                    <Typography>
                      - در نهایت با زدن دکمه "ثبت و تایید" اطلاعات ذخیره خواهد
                      شد.
                    </Typography>
                    <Typography>
                      - ممکن است برخی از شهر های انتخاب شده دانشگاه نداشته
                      باشند.
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>

            <Grid container spacing={3}>
              {categories.length === 0 && (
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: "0.8rem", opacity: "0.8" }}>
                    بدون انتخاب دسته
                  </Typography>
                </Grid>
              )}

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
                    <CardContent>
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
                          sx={{ width: "120px" }}
                          size="small"
                          value={cat.type}
                          onChange={(e) => updateType(cat.id, e.target.value)}
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
                            <Grid container spacing={1.5}>
                              {[...Array(cat.cityPriorities)].map((_, i) => (
                                <Grid item xs={12} sm={6} md={6} key={i}>
                                  <Typography sx={{ fontSize: "0.85rem" }}>
                                    اولویت {toPersianDigits(i + 1)}
                                  </Typography>
                                  <Box
                                    sx={{
                                      mt: "2px",
                                      backgroundColor: "white",
                                      borderRadius: "10px",
                                      p: "8px",
                                      display: "flex",
                                      gap: "5px",
                                    }}
                                  >
                                    <PriorityField
                                      label={`استان ${toPersianDigits(i + 1)}`}
                                      options={provinces}
                                      value={cat.provPrioritiesList[i]}
                                      onChange={(_, newValue) =>
                                        updateProvince(cat.id, i, newValue)
                                      }
                                    />
                                    <PriorityField
                                      label={`شهر ${toPersianDigits(i + 1)}`}
                                      options={getCitiesForProvince(
                                        cat.provPrioritiesList[i]
                                      )}
                                      value={cat.cityPrioritiesList[i]}
                                      onChange={(_, newValue) =>
                                        updateCity(cat.id, i, newValue)
                                      }
                                      disabled={!cat.provPrioritiesList[i]}
                                      getOptionDisabled={(option) =>
                                        isCityAlreadySelected(cat.id, i, option)
                                      }
                                    />
                                  </Box>
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
                                    value={cat.majorPrioritiesList[i]}
                                    onChange={(_, newValue) =>
                                      updateMajor(cat.id, i, newValue)
                                    }
                                    getOptionDisabled={(option) =>
                                      isMajorAlreadySelected(cat.id, i, option)
                                    }
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
                                اولویت دوره (
                                {toPersianDigits(cat.dorePriorities)} آیتم)
                              </Typography>
                              <Box>
                                <Button
                                  onClick={() =>
                                    adjustCount(cat.id, "dorePriorities", "inc")
                                  }
                                  size="small"
                                  variant="outlined"
                                  sx={{ mx: 0.5, borderRadius: 2 }}
                                >
                                  افزودن
                                </Button>
                                <Button
                                  onClick={() =>
                                    adjustCount(cat.id, "dorePriorities", "dec")
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
                              {[...Array(cat.dorePriorities)].map((_, i) => (
                                <Grid item xs={12} sm={6} md={3} key={i}>
                                  <PriorityField
                                    label={`دوره ${toPersianDigits(i + 1)}`}
                                    options={doreOptions}
                                    value={cat.dorePriorityList[i]}
                                    onChange={(_, newValue) =>
                                      updateDore(cat.id, i, newValue)
                                    }
                                    getOptionDisabled={(option) =>
                                      isDoreAlreadySelected(cat.id, i, option)
                                    }
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
                                    value={cat.majorPrioritiesList[i]}
                                    onChange={(_, newValue) =>
                                      updateMajor(cat.id, i, newValue)
                                    }
                                    getOptionDisabled={(option) =>
                                      isMajorAlreadySelected(cat.id, i, option)
                                    }
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
                            <Grid container spacing={1.5}>
                              {[...Array(cat.cityPriorities)].map((_, i) => (
                                <Grid item xs={12} sm={6} md={6} key={i}>
                                  <Typography sx={{ fontSize: "0.85rem" }}>
                                    اولویت {toPersianDigits(i + 1)}
                                  </Typography>
                                  <Box
                                    sx={{
                                      mt: "2px",
                                      backgroundColor: "white",
                                      borderRadius: "10px",
                                      p: "8px",
                                      display: "flex",
                                      gap: "5px",
                                    }}
                                  >
                                    <PriorityField
                                      label={`استان ${toPersianDigits(i + 1)}`}
                                      options={provinces}
                                      value={cat.provPrioritiesList[i]}
                                      onChange={(_, newValue) =>
                                        updateProvince(cat.id, i, newValue)
                                      }
                                    />
                                    <PriorityField
                                      label={`شهر ${toPersianDigits(i + 1)}`}
                                      options={getCitiesForProvince(
                                        cat.provPrioritiesList[i]
                                      )}
                                      value={cat.cityPrioritiesList[i]}
                                      onChange={(_, newValue) =>
                                        updateCity(cat.id, i, newValue)
                                      }
                                      disabled={!cat.provPrioritiesList[i]}
                                      getOptionDisabled={(option) =>
                                        isCityAlreadySelected(cat.id, i, option)
                                      }
                                    />
                                  </Box>
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
                                اولویت دوره (
                                {toPersianDigits(cat.dorePriorities)} آیتم)
                              </Typography>
                              <Box>
                                <Button
                                  onClick={() =>
                                    adjustCount(cat.id, "dorePriorities", "inc")
                                  }
                                  size="small"
                                  variant="outlined"
                                  sx={{ mx: 0.5, borderRadius: 2 }}
                                >
                                  افزودن
                                </Button>
                                <Button
                                  onClick={() =>
                                    adjustCount(cat.id, "dorePriorities", "dec")
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
                              {[...Array(cat.dorePriorities)].map((_, i) => (
                                <Grid item xs={12} sm={6} md={3} key={i}>
                                  <PriorityField
                                    label={`دوره ${toPersianDigits(i + 1)}`}
                                    options={doreOptions}
                                    value={cat.dorePriorityList[i]}
                                    onChange={(_, newValue) =>
                                      updateDore(cat.id, i, newValue)
                                    }
                                    getOptionDisabled={(option) =>
                                      isDoreAlreadySelected(cat.id, i, option)
                                    }
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
                  افزودن دسته جدید
                </Typography>
              </Button>
            </Box>

            <Button
              onClick={handleSubmit}
              disableElevation
              variant="contained"
              sx={{
                width: "100%",
                mt: 8,
                px: 5,
                py: 1.5,
                borderRadius: 3,
                background: "#34495E",
                color: "white",
                fontWeight: 600,
              }}
            >
              ثبت و تایید
              {loading && (
                <CircularProgress
                  size={20}
                  color="inherit"
                  sx={{
                    mr: "10px",
                  }}
                />
              )}
            </Button>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}
