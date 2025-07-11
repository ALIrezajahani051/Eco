import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  Stack,
  Pagination,
  Autocomplete,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  TableRow,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  IconlyDrag,
  IconlyPrinter,
  IconlyFilter2,
  IconlyDown,
  IconlySearch,
} from "../../../public/Icons";
import { useAuth } from "../../AuthProvider";
import PaginationItem from "@mui/material/PaginationItem";
import JsonCity from "../../../public/cities.json";
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

const PriorityField = React.memo(
  ({ label, options, value, onChange, multiple }) => (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ marginBottom: "5px" }}>{label} :</Typography>
      <Autocomplete
        {...(multiple ? { multiple: true } : {})}
        disableClearable
        size="small"
        noOptionsText="مورد یافت نشد"
        popupIcon={<IconlyDown size={21} />}
        options={options}
        onChange={(event, newValue) => onChange(newValue)}
        autoComplete
        getOptionLabel={(option) => option}
        sx={{
          "& .MuiChip-root": {
            paddingLeft: "10px",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              backgroundColor: "#F8F8F8",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": {
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
  )
);

export default function FilterChoose() {
  const [page, setPage] = useState(1);
  const [dataGet, setDataGet] = useState({
    count: 0,
    next: null,
    previous: null,
    results: null,
  });
  const [filters, setFilters] = useState({
    university: [],
    state: [],
    major: [],
    gender: [],
    dormitory: [],
    admissionType: [],
    courseType: [],
  });

  const [filterOptions, setFilterOptions] = useState({
    university: [],
    state: [],
    major: [],
    gender: ["مرد", "زن"],
    dormitory: ["داشته باشد", "نداشته باشد"],
    admissionType: ["با آزمون", "سوابق تحصیلی"],
    courseType: [
      "روزانه",
      "روزانه - غیردولتی",
      "غیرانتفاعی",
      "پیام نور",
      "پردیس خودگردان",
      "مجازی",
      "مشترک",
      "نوبت دوم",
    ],
  });

  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const Auth = useAuth();

  useEffect(() => {
    setFilterOptions((prev) => {
      return {
        ...prev,
        state: JsonCity.map((obj) => obj.province),
      };
    });
  }, []);

  useEffect(() => {
    const fetchUni = async () => {
      try {
        Auth.setLoading(true);
        const response = await fetch(
          " https://emeettest.pythonanywhere.com/get_unis",
          { method: "GET" }
        );
        const data = await response.json();
        setFilterOptions((prev) => ({ ...prev, university: data }));
      } catch (err) {
        setError("خطا در دریافت لیست دانشگاه ها");
      } finally {
        Auth.setLoading(false);
      }
    };

    fetchUni();
  }, []);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        Auth.setLoading(true);
        const response = await fetch(
          " https://emeettest.pythonanywhere.com/get_majores/?field=2  ",
          { method: "GET" }
        );
        const data = await response.json();
        setFilterOptions((prev) => ({ ...prev, major: data }));
      } catch (err) {
        setError("خطا در دریافت لیست رشته‌ها");
      } finally {
        Auth.setLoading(false);
      }
    };

    fetchMajors();
  }, []);

  const handleFilterChange = (filterId, newValue) => {
    if (Array.isArray(newValue)) {
      if (
        filterId !== "major" &&
        filterId !== "university" &&
        filterId != "state"
      ) {
        const indexes = newValue.map((val) =>
          filterOptions[filterId].findIndex((option) => option === val)
        );
        setFilters((prev) => ({ ...prev, [filterId]: indexes }));
      } else {
        setFilters((prev) => ({ ...prev, [filterId]: newValue }));
      }
    } else {
      const index = filterOptions[filterId].findIndex(
        (option) => option === newValue
      );
      setFilters((prev) => ({ ...prev, [filterId]: index }));
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 1500);
  };

  const handleSearch = async () => {
    try {
      const MAJOR_TYPE_CHOICES = [
        "daytime",
        "daytime_nonpublic",
        "nonprofit",
        "payam_noor",
        "pardis",
        "virtual",
        "joint",
        "evening",
      ];

      console.log(
        JSON.stringify({
          filters: {
            ...filters,
            courseType: filters.courseType.map((mt) => MAJOR_TYPE_CHOICES[mt]),
          },
        })
      );
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://emeettest.pythonanywhere.com/filtering/?page=${page}`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filters: {
              ...filters,
              courseType: filters.courseType.map(
                (mt) => MAJOR_TYPE_CHOICES[mt]
              ),
            },
          }),
        }
      );

      console.log(response);
      if (!response.ok) throw new Error("خطا در دریافت داده‌ها");

      const data = await response.json();
      setDataGet(data);
      setFilteredUniversities(data.results);
    } catch (err) {
      setError(err.message);
      setFilteredUniversities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          backgroundColor: "#F8F8F8",
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                marginBottom: "5%",
              }}
            >
              <Typography variant="h6">راهنمای استفاده:</Typography>
              <Typography sx={{ display: "flex", gap: 0.5, fontSize: "0.8em" }}>
                - با انتخاب هر یک از موارد جستجو بر اساس در نظر گرفتن شرایط مد
                نظر انجام خواهد شد.
                <br />- در صورت انتخاب نکردن هر مورد در نظر گرفتن شرایط برای آن
                نادیده خواهد گرفته شد .
                <br />- در هر بخش میتوانید بیش از یک مورد انتخاب کنید.
                <br />- با کلیک بر روی کد رشته ، کد کپی خواهد شد.
              </Typography>
            </Box>

            <Grid
              container
              rowSpacing={2}
              columnSpacing={4}
              sx={{ marginTop: "5px", mb: 5, px: 20 }}
            >
              {Object.entries({
                university: "دانشگاه",
                state: "استان",
                major: "رشته",
                gender: "جنسیت",
                dormitory: "خوابگاه",
                admissionType: "نوع پذیرش",
                courseType: "دوره تحصیلی",
              }).map(([key, label]) => (
                <Grid item xs={6} sm={6} md={6} key={key}>
                  <PriorityField
                    multiple={key === "gender" ? false : true}
                    options={filterOptions[key]}
                    label={label}
                    value={filters[key]}
                    onChange={(newValue) => handleFilterChange(key, newValue)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Button
            onClick={handleSearch}
            disabled={loading}
            sx={{
              marginTop: "30px",
              width: "100%",
              padding: "10px 25px",
              color: "white",
              backgroundColor: "#5D6D7E",
              borderRadius: "10px",
              "&:disabled": { backgroundColor: "#cccccc" },
            }}
          >
            {loading && page == 1 ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "جستجو"
            )}
          </Button>

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
              <IconlySearch size={20} /> نتیجه جستجو :
            </Typography>
            <Typography sx={{ m: "5px" }}>
              {convertToPersianNumbers(dataGet.count)} مورد یافت شد.
            </Typography>

            <TableContainer
              sx={{ borderRadius: "10px", marginTop: "10px", padding: "10px" }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: "center" }}>دانشگاه</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>استان</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>شهر</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>رشته</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>جنسیت</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
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
                  {!loading && filteredUniversities.length > 0 ? (
                    filteredUniversities.map((major, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "& th, & td": {
                            padding: "10px",
                            borderBottom: "2px dashed rgba(212, 201, 190, 0.6)",
                          },
                        }}
                      >
                        <TableCell
                          sx={{ textAlign: "center", fontSize: "0.7rem" }}
                        >
                          {major.uni_name}
                        </TableCell>
                        <TableCell
                          sx={{ textAlign: "center", fontSize: "0.7rem" }}
                        >
                          {major.university_type === "public"
                            ? "دولتی"
                            : major.university_type === "private"
                            ? "خصوصی"
                            : major.university_type === "payam_noor"
                            ? "پیام نور"
                            : ""}
                        </TableCell>
                        <TableCell
                          sx={{ textAlign: "center", fontSize: "0.7rem" }}
                        >
                          {major.city.name}
                        </TableCell>
                        <TableCell
                          sx={{ textAlign: "center", fontSize: "0.7rem" }}
                        >
                          {major.major}
                        </TableCell>
                        <TableCell
                          sx={{ textAlign: "center", fontSize: "0.7rem" }}
                        >
                          {major.sex === 0
                            ? "هر دو"
                            : major.sex === 1
                            ? "فقط آقایان"
                            : major.sex === 2
                            ? "فقط خانم‌ها"
                            : ""}
                        </TableCell>
                        <TableCell
                          sx={{ textAlign: "center", fontSize: "0.7rem" }}
                        >
                          {major.major_type === "daytime"
                            ? "روزانه"
                            : major.major_type === "daytime_nonpublic"
                            ? "روزانه - غیردولتی"
                            : major.major_type === "nonprofit"
                            ? "غیردولتی"
                            : major.major_type === "payam_noor"
                            ? "پیام نور"
                            : major.major_type === "pardis"
                            ? "پردیس خودگردان"
                            : major.major_type === "virtual"
                            ? "مجازی"
                            : major.major_type === "joint"
                            ? "مشترک"
                            : major.major_type === "evening"
                            ? "نوبت دوم"
                            : ""}
                        </TableCell>
                        <TableCell
                          sx={{ textAlign: "center", fontSize: "0.7rem" }}
                        >
                          {major.dorm ? "دارد" : "ندارد"}
                        </TableCell>
                        <TableCell
                          sx={{ textAlign: "center", fontSize: "0.7rem" }}
                        >
                          {major.admission_requirements === 0
                            ? "با آزمون"
                            : "صرفا با سوابق تحصیلی"}
                        </TableCell>
                        <TableCell
                          onClick={() => handleCopy(major.code)}
                          sx={{
                            textAlign: "center",
                            cursor: "pointer",
                            position: "relative",
                          }}
                        >
                          {major.code}
                          {major.code === copiedCode && (
                            <Box
                              className="copyalert"
                              sx={{
                                position: "absolute",
                                top: "15%",
                                right: "-45px",
                                fontSize: "0.8rem",
                                padding: "6px",
                                backgroundColor: "#2C2C2C",
                                borderRadius: "10px",
                                color: "white",
                              }}
                            >
                              <Box
                                sx={{
                                  position: "absolute",
                                  width: "10px",
                                  height: "10px",
                                  backgroundColor: "#2C2C2C",
                                  top: "50%",
                                  borderRadius: "3px",
                                  transform:
                                    "translate(-40%,-50%) rotate(45deg)",
                                  left: 0,
                                }}
                              />
                              کپی شد!
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        sx={{ textAlign: "center", py: 15 }}
                      >
                        {loading ? (
                          <>
                            {" "}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <Typography>در حال بارگذاری</Typography>
                              <CircularProgress size={25} />
                            </Box>
                          </>
                        ) : (
                          "نتیجه‌ای یافت نشد. لطفاً فیلترهای دیگری را امتحان کنید."
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // mt:"25px",
                py: "25px",
              }}
            >
              <Pagination
                count={Math.ceil(dataGet.count / 100)}
                page={page}
                color="secondary"
                onChange={(e, newValue) => {
                  setPage(newValue);
                  handleSearch();
                }}
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    page={
                      typeof item.page === "number"
                        ? convertToPersianNumbers(item.page)
                        : item.page
                    }
                  />
                )}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
