import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Collapse,
  Autocomplete,
  InputBase,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconlyArrowLeft2 } from "../../../public/Icons";
import FillPriority from "./FillPriority";

const customTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IranSans, Arial, sans-serif",
  },
});

const provinces = [
  "تهران",
  "اصفهان",
  "خراسان رضوی",
  "فارس",
  "آذربایجان شرقی",
  "گیلان",
  "مازندران",
  "کرمانشاه",
  "سیستان و بلوچستان",
  "هرمزگان",
  "یزد",
  "قزوین",
  "کردستان",
];

const cities = [
  "تهران",
  "مشهد",
  "اصفهان",
  "شیراز",
  "تبریز",
  "رشت",
  "ساری",
  "زاهدان",
  "بندرعباس",
  "کرمان",
  "سنندج",
  "قزوین",
];

export default function ChooseMajor() {
  const [type, setType] = useState(null);
  const [show, setShow] = useState(true);
  const [student, setStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetailsList, setShowDetailsList] = useState(false);

  const [formData, setFormData] = useState({
    nationalCode: "",
    field: "",
    hometownCity: "",
    hometownProvince: "",
    examId: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "انتخاب رشته";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "این فیلد الزامی است";
      }
    });
    return newErrors;
  };

  const handleSubmit = () => {
    setStudent(true);

    const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length === 0) {
    setType(0);
    // } else {
    //   setErrors(validationErrors);
    // }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ width: "95%", mt: "60px" }}>
        <Typography
          sx={{
            mb: 1.0,
            display: "flex",
            alignItems: "center",
            gap: 0.1,
            fontSize: "0.85rem",
          }}
        >
          انتخاب رشته
          {student && (
            <>
              <IconlyArrowLeft2 size={18} /> دانش آموز محمد میرابی
              <IconlyArrowLeft2 size={18} />
              انتخاب اولویت‌ها
              {showDetailsList && (
                <>
                  {" "}
                  <IconlyArrowLeft2 size={18} />
                  لیست جزئیات{" "}
                </>
              )}
            </>
          )}
        </Typography>

        {type !== null && (
          <FillPriority
            show={show}
            setShowDetailsList={setShowDetailsList}
            setShow={setShow}
            type={type}
            formData={formData}
          />
        )}

        {type === null && (
          <Box
            sx={{
              backgroundColor: "white",
              p: 2.5,
              minHeight: "35vh",
              borderRadius: 3,
              width: "100%",
              mx: "auto",
              mt: 0.5,
            }}
          >
            <Typography variant="h6" textAlign="rignt" mb={1.1} fontSize="1rem">
              راهنمای استفاده
            </Typography>

            <Typography mb={0.5} sx={{ fontSize: "0.85rem" }}>
              - این سامانه صرفاً جهت تسهیل انتخاب اولویت‌ها است.
            </Typography>
            <Typography mb={3} sx={{ fontSize: "0.85rem" }}>
              - پس از ثبت اطلاعات اولیه، امکان انتخاب اولویت‌ها فعال خواهد شد.
            </Typography>

            {!showForm && (
              <Box textAlign="center">
                <Button
                  disableElevation
                  onClick={() => setShowForm(true)}
                  variant="contained"
                  sx={{
                    marginTop: 3,
                    px: 4,
                    py: 1,
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #1976d2, #2196f3)",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "white",
                  }}
                >
                  شروع فرایند
                </Button>
              </Box>
            )}

            <Collapse in={showForm}>
              <Typography mb={2} mt={1} fontWeight={600}>
                اطلاعات اولیه دانش‌آموز:
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  minHeight: "calc(100vh - 400px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "800px",
                    backgroundColor: "#fff",
                    borderRadius: 3,
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography sx={{ fontSize: "0.85rem" }}>
                        نام و نام خانوادگی :
                      </Typography>
                      <TextField
                        size="small"
                        sx={inputStyle}
                        fullWidth
                        placeholder="بیژن مرادی"
                        name="hometownCity"
                        onChange={handleChange}
                        // error={!!errors.hometownCity}
                        // helperText={errors.hometownCity}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography sx={{ fontSize: "0.85rem" }}>
                        کد ملی :{" "}
                      </Typography>
                      <TextField
                        sx={inputStyle}
                        size="small"
                        placeholder="1234567891"
                        name="nationalCode"
                        value={formData.nationalCode}
                        onChange={handleChange}
                        fullWidth
                        // error={!!errors.nationalCode}
                        // helperText={errors.nationalCode}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography sx={{ fontSize: "0.85rem" }}>
                        شماره داوطلبی :{" "}
                      </Typography>
                      <TextField
                        sx={inputStyle}
                        size="small"
                        placeholder="شماره داوطلبی"
                        name="examId"
                        value={formData.examId}
                        onChange={handleChange}
                        fullWidth
                        // error={!!errors.examId}
                        // helperText={errors.examId}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography sx={{ fontSize: "0.85rem" }}>
                        رشته :
                      </Typography>
                      <Autocomplete
                        disableClearable
                        size="small"
                        freeSolo
                        options={["نظری ریاضی", "نظری تجربی", "نظری انسانی"]}
                        value={formData.hometownCity}
                        onChange={(e, value) =>
                          setFormData((prev) => ({
                            ...prev,
                            highSchoolMajor: value || "",
                          }))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={inputStyle}
                            placeholder="رشته"
                            name="hometownCity"
                            onChange={handleChange}
                            // error={!!errors.hometownCity}
                            // helperText={errors.hometownCity}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography sx={{ fontSize: "0.85rem" }}>
                        شهر بومی :
                      </Typography>
                      <Autocomplete
                        disableClearable
                        size="small"
                        freeSolo
                        options={cities}
                        value={formData.hometownCity}
                        onChange={(e, value) =>
                          setFormData((prev) => ({
                            ...prev,
                            hometownCity: value || "",
                          }))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={inputStyle}
                            placeholder="شهر بومی"
                            name="hometownCity"
                            onChange={handleChange}
                            // error={!!errors.hometownCity}
                            // helperText={errors.hometownCity}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography sx={{ fontSize: "0.85rem" }}>
                        استان بومی :{" "}
                      </Typography>
                      <Autocomplete
                        disableClearable
                        size="small"
                        freeSolo
                        options={provinces}
                        value={formData.hometownProvince}
                        onChange={(e, value) =>
                          setFormData((prev) => ({
                            ...prev,
                            hometownProvince: value || "",
                          }))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={inputStyle}
                            placeholder="استان بومی"
                            name="hometownProvince"
                            onChange={handleChange}
                            // error={!!errors.hometownProvince}
                            // helperText={errors.hometownProvince}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Box textAlign="center" mt={4}>
                    <Button
                      disableElevation
                      onClick={handleSubmit}
                      variant="contained"
                      sx={{
                        px: 5,
                        py: 1,
                        borderRadius: 2,
                        backgroundColor: "#4caf50",
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      مرحله بعدی{" "}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Collapse>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

const inputStyle = {
  backgroundColor: "#F3F3F3",
  borderRadius: "10px",
  width: "100%",
  "& .MuiOutlinedInput-root": {
    padding: "0px",
    fontSize: "0.9rem",
    marginRight: "5px",
    "& fieldset": {
      borderRadius: "10px",
      fontSize: "0.9rem",
      border: "none",
    },
  },
};
