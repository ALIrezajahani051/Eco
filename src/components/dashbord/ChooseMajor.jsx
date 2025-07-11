import React, { useState, useEffect } from "react";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Collapse,
  Autocomplete,
  CircularProgress,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputBase,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  IconlyAdduser,
  IconlyArrowLeft2,
  IconlyDelete,
  IconlyDown,
  IconlySearch,
  IconlySquare,
} from "../../../public/Icons";
import citiesJson from "../../../public/cities.json";
import MajorPriority from "./MajorPriority";

const toPersianNumber = (input) =>
  String(input).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const customTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IranSans, Arial, sans-serif",
  },
});

const inputStyle = (loading) => ({
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
  "& .Mui-disabled": {
    backgroundColor: "#e0e0e0",
  },
});

const headerStyle = {
  fontSize: "0.95rem",
  fontFamily: "Bold",
  textAlign: "center",
  fontWeight: "bold",
  p: 1.4,
};
const bodyStyle = {
  fontSize: "0.9rem",
  textAlign: "center",
  fontWeight: "bold",
  p: 1.1,
};

export default function ChooseMajor() {
  const [type, setType] = useState(null);
  const [show, setShow] = useState(true);
  const [student, setStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetailsList, setShowDetailsList] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nationalCode: "",
    field: "",
    hometownCity: "",
    hometownProvince: "",
    examId: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    nationalCode: "",
    field: "",
    hometownCity: "",
    hometownProvince: "",
    examId: "",
  });
  const MAJOR_OPTIONS = [
    { value: 0, label: "نظری ریاضی" },
    { value: 1, label: "نظری تجربی" },
    { value: 2, label: "نظری انسانی" },
  ];
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    setProvinces(citiesJson.map((obj) => obj.province));
    document.title = "انتخاب رشته";
  }, []);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, hometownCity: "" }));
    if (formData.hometownProvince) {
      const provinceData = citiesJson.find(
        (obj) => obj.province === formData.hometownProvince
      );
      setCityOptions(provinceData ? provinceData.cities : []);
    }
  }, [formData.hometownProvince]);

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

    if (!/^\d{10,}$/.test(formData.nationalCode)) {
      newErrors.nationalCode = "کد ملی باید حداقل ۱۰ رقم و فقط عدد باشد";
    }

    if (!/^\d{10,}$/.test(formData.examId)) {
      newErrors.examId = "شماره داوطلبی باید حداقل ۱۰ رقم و فقط عدد باشد";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);

      try {
        const res = await fetch(
          "https://emeettest.pythonanywhere.com/major/student/",
          {
            method: "POST",
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              ...formData,
              field: ["نظری ریاضی", "نظری تجربی", "نظری انسانی"].findIndex(
                (item) => item === formData.field
              ),
            }),
          }
        );
        if (res.ok) {
          // setType(0);
          // setStudent({
          //   name: formData.name,
          //   nationalCode: formData.nationalCode,
          // });
          const newUser = await res.json();
          setUsers((users) => [...users, newUser]);

          try {
            const res = await fetch(
              `https://emeettest.pythonanywhere.com/create/program/${newUser.id}/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              }
            );
            if (res.ok) {
              toast.success("دانش آموز اضافه شد!", {
                position: "top-right",
                autoClose: 2500,
                theme: "light",
                transition: Bounce,
              });

              setShowForm(false);
            } else {
              const as = await res.json();
              console.log(as);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log(res);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);

  const [loadUser, setLoadUsers] = useState(false);
  useEffect(() => {
    setLoadUsers(true);
    const get_users = async () => {
      try {
        const res = await fetch(
          "https://emeettest.pythonanywhere.com/get_users_major/",
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          const users = await res.json();
          setUsers(users);
          setOriginalUsers(users);
        }
      } catch (error) {
        toast.error("خطا در برقراری ارتباط با سرور", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        console.log(error);
      } finally {
        setLoadUsers(false);
      }
    };

    get_users();
  }, []);
  const handleDeleteUser = (name, id) => {
    Swal.fire({
      title: "حذف دانش‌آموز",
      text: `حذف دانش‌آموز "${name}"، این عملیات غیرقابل بازگشت است. آیا اطمینان دارید؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#5D6D7E", // Adjusted color
      confirmButtonText: "بله، حذف کن!",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://emeettest.pythonanywhere.com/user/major/action/${id}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.ok) {
              Swal.fire({
                title: "حذف شد!",
                text: "با موفقیت حذف شد.",
                icon: "success",
                confirmButtonText: "تایید",
              });
              setOriginalUsers((prev) =>
                prev.filter((user) => user.name !== name)
              );
              setUsers((prev) => prev.filter((user) => user.name !== name));
            } else {
              Swal.fire({
                title: "خطا!",
                text: "حذف موفقیت‌آمیز نبود.",
                icon: "error",
                confirmButtonText: "تایید",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "خطا!",
              text: "ارتباط با سرور برقرار نشد.",
              icon: "error",
              confirmButtonText: "تایید",
            });
            console.error("Error deleting user:", error);
          });
      }
    });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ width: "95%", mt: "60px" }}>
        <Box
          sx={{
            mb: 1.0,
            display: "flex",
            alignItems: "center",
            gap: 0.1,
            fontSize: "0.85rem",
            cursor: "default",
          }}
        >
          <Box
            component="span"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (student) {
                Swal.fire({
                  title: "بازگشت به صفحه نخست",
                  text: `لطفا قبل از بازگشت به صفحه نخست ، از ذخیره کردن برنامه های خود اطمینان حاصل کنید.`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#5D6D7E", // Adjusted color
                  confirmButtonText: "ذخیره کردم",
                  cancelButtonText: "لغو",
                }).then((result) => {
                  if (result.isConfirmed) {
                    setStudent(null);
                    setType(null);
                    setShowDetailsList(false);
                    setShowForm(false);
                    setDetails(false);
                    setFormData({
                      name: "",
                      nationalCode: "",
                      field: "",
                      hometownCity: "",
                      hometownProvince: "",
                      examId: "",
                    });
                  }
                });
              }
            }}
          >
            انتخاب رشته
          </Box>

          {student && (
            <>
              <IconlyArrowLeft2 size={18} />
              <Box component="span" sx={{ cursor: "pointer" }}>
                دانش آموز {student.name}
              </Box>

              <IconlyArrowLeft2 size={18} />
              <Box component="span" sx={{ cursor: "pointer" }}>
                انتخاب اولویت‌ها
              </Box>

              {showDetailsList && (
                <>
                  <IconlyArrowLeft2 size={18} />
                  <Box component="span" sx={{ cursor: "pointer" }}>
                    لیست جزئیات
                  </Box>
                </>
              )}
            </>
          )}
        </Box>

        {type != null ? (
          <MajorPriority student_id={student.id} />
        ) : (
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
            <Accordion
              sx={{
                boxShadow: "none",
                mb: 3,
              }}
            >
              <AccordionSummary
                expandIcon={<IconlyDown />}
                sx={{
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h6" fontSize="1rem" fontWeight="500">
                  راهنمای استفاده
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    lineHeight: 2,
                  }}
                >
                  - این سامانه صرفاً جهت تسهیل انتخاب اولویت‌ها است.
                  <br />- پس از ثبت اطلاعات اولیه، امکان انتخاب اولویت‌ها فعال
                  خواهد شد.
                  <br />- طی فرآیند به هیچ عنوان از دکمه بازگشت یا رفرش صفحه
                  استفاده نفرمایید.
                </Typography>
              </AccordionDetails>
            </Accordion>

            {!showForm ? (
              <>
                <Typography variant="body1" mb={2}>
                  دانش آموزان من:
                </Typography>
                <TableContainer
                  sx={{
                    mt: "30px",
                    direction: "ltr",
                    width: "100%",
                    px: "2%",
                    position: "relative",
                    minHeight: "200px",
                    maxHeight: "620px",
                    overflowY: "auto",
                    boxShadow: "none",
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#34495E", // Darker scrollbar
                      borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#e0e0e0", // Lighter track
                      borderRadius: "10px",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "220px",
                      py: "5px",
                      backgroundColor: "#F8F8F8",
                      borderRadius: "10px",
                      display: "flex",
                      px: "1%",
                      alignItems: "center",
                      gap: "10px",
                      margin: "0",
                      mb: "10px",
                    }}
                  >
                    <IconlySearch color="gray" size={21} />
                    <InputBase
                      type="text"
                      placeholder="جستجو کنید"
                      onChange={(e) => {
                        const value = e.target.value.toLowerCase();

                        if (value !== "") {
                          const filtered = originalUsers.filter((user) =>
                            user.name.toLowerCase().startsWith(value)
                          );
                          setUsers(filtered);
                        } else {
                          setUsers(originalUsers);
                        }
                      }}
                      sx={{
                        fontFamily: "IranSans, Arial, sans-serif",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        fontSize: "15px",
                        width: "100%",
                      }}
                    />
                  </Box>
                  <Table
                    stickyHeader
                    sx={{
                      mt: "5px",
                    }}
                  >
                    <TableHead>
                      <TableRow
                        sx={{
                          "& th": {
                            backgroundColor: "#34495E", // Darker header background
                            borderBottom: "none",
                            color: "white",
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            borderTopRightRadius: "5px",
                            borderBottomRightRadius: "5px",
                            ...headerStyle,
                          }}
                        >
                          ردیف
                        </TableCell>
                        <TableCell
                          sx={{
                            ...headerStyle,
                          }}
                        >
                          نام دانش‌آموز
                        </TableCell>
                        <TableCell sx={{ ...headerStyle }}>رشته</TableCell>
                        <TableCell sx={bodyStyle}>کدملی</TableCell>
                        <TableCell
                          sx={{
                            borderTopLeftRadius: "5px",
                            borderBottomLeftRadius: "5px",
                            ...headerStyle,
                          }}
                        >
                          عملیات ها{" "}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {loadUser ? (
                      <Box
                        sx={{
                          p: "50px",
                          width: "90%",
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography>در حال بارگذاری</Typography>
                        <CircularProgress size={30} sx={{ mr: "10px" }} />
                      </Box>
                    ) : (
                      <TableBody>
                        {users.length !== 0 ? (
                          <>
                            {users.map((user, index) => (
                              <TableRow key={user.id || index}>
                                <TableCell sx={bodyStyle}>
                                  {toPersianNumber(index + 1)}
                                </TableCell>
                                <TableCell sx={bodyStyle}>
                                  {user.name}
                                </TableCell>
                                <TableCell sx={bodyStyle}>
                                  {["ریاضی", "تجربی", "انسانی"][user.field]}
                                </TableCell>
                                <TableCell sx={bodyStyle}>
                                  {toPersianNumber(user.nationalCode)}
                                </TableCell>
                                <TableCell sx={bodyStyle}>
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "8px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Button
                                      style={{
                                        backgroundColor: "#5f7e9e",
                                        color: "white",
                                        padding: "4px 14px",
                                        border: "none",
                                        borderRadius: "10px",
                                      }}
                                      onClick={() => {
                                        setType(0);
                                        sessionStorage.setItem(
                                          "student",
                                          JSON.stringify(user)
                                        );
                                        setStudent(user);
                                      }}
                                    >
                                      انتخاب رشته
                                    </Button>
                                    <Button
                                      style={{
                                        backgroundColor: "#910c3d",
                                        color: "white",
                                        padding: "4px 14px",
                                        border: "none",
                                        borderRadius: "10px",
                                      }}
                                      onClick={() => {
                                        handleDeleteUser(user.name, user.id);
                                      }}
                                    >
                                      حذف
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              sx={{ textAlign: "center", py: 5 }}
                            >
                              <Typography
                                variant="body1"
                                color="text.secondary"
                              >
                                موردی برای نمایش وجود ندارد
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
                <Box textAlign="center">
                  <Button
                    disableElevation
                    onClick={() => setShowForm(true)}
                    variant="contained"
                    sx={{
                      mt: 5,
                      mb: 1,
                      px: 2.5,
                      py: 1,
                      borderRadius: 2,
                      background: "#3498DB", // A solid blue for "add new student"
                      fontWeight: 600,
                      fontSize: "15px",
                      color: "white",
                    }}
                  >
                    اضافه کردن دانش‌آموز جدید{" "}
                  </Button>
                </Box>
              </>
            ) : (
              <Collapse in={showForm}>
                <Typography mb={5} mt={1} fontWeight={600}>
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
                      maxWidth: "600px",
                      backgroundColor: "#fff",
                      borderRadius: 3,
                      p: 3, // Added padding here for the form box
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontSize: "0.85rem" }}>
                          نام و نام خانوادگی :
                        </Typography>
                        <TextField
                          size="small"
                          sx={inputStyle(loading)}
                          fullWidth
                          placeholder="بیژن مرادی"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          error={!!errors.name}
                          helperText={errors.name}
                          disabled={loading}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontSize: "0.85rem" }}>
                          کد ملی :
                        </Typography>
                        <TextField
                          sx={inputStyle(loading)}
                          size="small"
                          placeholder="1234567891"
                          name="nationalCode"
                          value={formData.nationalCode}
                          onChange={handleChange}
                          fullWidth
                          error={!!errors.nationalCode}
                          helperText={errors.nationalCode}
                          disabled={loading}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontSize: "0.85rem" }}>
                          شماره داوطلبی :
                        </Typography>
                        <TextField
                          sx={inputStyle(loading)}
                          size="small"
                          placeholder="شماره داوطلبی"
                          name="examId"
                          value={formData.examId}
                          onChange={handleChange}
                          fullWidth
                          error={!!errors.examId}
                          helperText={errors.examId}
                          disabled={loading}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontSize: "0.85rem" }}>
                          رشته :
                        </Typography>
                        <Autocomplete
                          disablePortal
                          disableClearable
                          size="small"
                          freeSolo
                          options={["نظری ریاضی", "نظری تجربی", "نظری انسانی"]}
                          value={formData.field}
                          onChange={(e, value) =>
                            setFormData((prev) => ({
                              ...prev,
                              field: value || "",
                            }))
                          }
                          disabled={loading}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              sx={inputStyle(loading)}
                              placeholder="رشته"
                              name="field"
                              error={!!errors.field}
                              helperText={errors.field}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontSize: "0.85rem" }}>
                          استان بومی :
                        </Typography>
                        <Autocomplete
                          disablePortal
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
                          disabled={loading}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={inputStyle(loading)}
                              placeholder="استان بومی"
                              name="hometownProvince"
                              error={!!errors.hometownProvince}
                              helperText={errors.hometownProvince}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontSize: "0.85rem" }}>
                          شهر بومی :
                        </Typography>
                        <Autocomplete
                          disablePortal
                          disableClearable
                          size="small"
                          freeSolo
                          options={cityOptions}
                          value={formData.hometownCity}
                          onChange={(e, value) =>
                            setFormData((prev) => ({
                              ...prev,
                              hometownCity: value || "",
                            }))
                          }
                          disabled={!formData.hometownProvince || loading}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={inputStyle(loading)}
                              placeholder="شهر بومی"
                              name="hometownCity"
                              error={!!errors.hometownCity}
                              helperText={errors.hometownCity}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>

                    <Box
                      mt={6}
                      mb={2}
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        disableElevation
                        disabled={!isFormValid || loading}
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                          px: 5,
                          py: 1,
                          borderRadius: 2,
                          backgroundColor: "#27AE60", // Green for submit
                          fontWeight: "bold",
                          color: "white",
                          "&:disabled": {
                            backgroundColor: "#e0e0e0",
                          },
                        }}
                      >
                        {loading ? (
                          <>
                            در حال پردازش
                            <CircularProgress
                              size={20}
                              sx={{ color: "white", mr: 1 }}
                            />
                          </>
                        ) : (
                          "مرحله بعدی"
                        )}
                      </Button>

                      <Button
                        disableElevation
                        onClick={() => {
                          setShowForm(false);
                          setErrors({}); // Clear errors when canceling form
                          setFormData({
                            // Reset form data
                            name: "",
                            nationalCode: "",
                            field: "",
                            hometownCity: "",
                            hometownProvince: "",
                            examId: "",
                          });
                        }}
                        variant="contained"
                        sx={{
                          px: 5,
                          py: 1,
                          borderRadius: 2,
                          backgroundColor: "#7F8C8D", // Gray for cancel
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        صرف نظر از افزودن
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Collapse>
            )}
          </Box>
        )}
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
}
