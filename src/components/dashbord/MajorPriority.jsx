import React, { useEffect, useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import { useAuth } from "../../AuthProvider";
import {
  Box,
  Button,
  Typography,
  Tooltip,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Checkbox,
  Dialog,
  DialogTitle,
  styled,
  DialogContent,
  TextField,
  FormControlLabel,
  DialogActions,
  Accordion,
  Grid,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Collapse,
  CircularProgress,
} from "@mui/material";
// import Textarea from "@mui/joy/Textarea";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import Majordetail from "./Majordetail";
import Majortitle from "./Majortitle";
import AddtoMajorList from "./AddtoMajorList";
import EditNamePlan from "./EditNamePlan";
import FillPriority from "./FillPriority";

import {
  IconlyDrag,
  IconlyPrinter,
  IconlyFilter2,
  IconlyDelete,
  IconlyPlus,
  IconlyRightClick,
  IconlyArrowDown2,
  IconlyShow,
  IconlyCopy,
  IconlyEdit,
  IconlyBookmark,
  IconlyUpload,
} from "../../../public/Icons";

const convertToPersianNumbers = (num) => {
  if (num === undefined || num === null) return "";
  return num.toString().replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};

const customTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IranSans, Arial, sans-serif",
    h6: { fontSize: "1rem" },
    body1: { fontSize: "0.85rem" },
  },
});

const styles = {
  actionButton: {
    padding: "4px 12px",
    color: "white",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",

    "&:hover": {
      backgroundColor: "#34495E",
    },
  },
  contextMenu: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "180px",
    flexDirection: "column",
    borderRadius: "10px",
    backgroundColor: "rgb(18, 52, 88,0.98)",
    padding: "10px",
    gap: 0.5,
    color: "white",
    zIndex: 10,
  },
  programTab: {
    fontSize: "0.85rem",
    backgroundColor: "#309898",
    borderRadius: "8px",
    height: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    cursor: "pointer",
  },
};

export default function MajorPriority({ student_id }) {
  const inputRef = useRef();
  const containerRef = useRef(null);

  const [addIndex, setAddIndex] = useState(null);
  const [file, setFile] = useState(null);
  const [addMajor, setAddMajor] = useState(null);
  const [contextPosition, setContextPosition] = useState({
    x: 0,
    y: 0,
    id: 0,
    show: false,
  });
  const [openEditNameBool, setOpenEditNameBool] = useState(false);
  const [priorityService, setPriorityService] = useState(false);
  const [withColor, setWithColor] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [programCurr, setProgramCurr] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) setFile(URL.createObjectURL(file));
  }, []);
  const [isSave, setIsSave] = useState(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleAddProgram = async () => {
    if (programs.length < 5) {
      setIsSaving(true);

      try {
        const res = await fetch(
          `https://emeettest.pythonanywhere.com/create/program/${student_id}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        const newProgramId = data.id;
        setPrograms((prevPrograms) => {
          const newProgramsList = [
            ...prevPrograms,
            { id: newProgramId, name: data.name, data: [] },
          ];
          setProgramCurr(newProgramsList[newProgramsList.length - 1]);
          return newProgramsList;
        });
        toast.success("برنامه جدید اضافه شد!", {
          position: "top-right",
          autoClose: 2500,
          theme: "light",
          transition: Bounce,
        });
      } catch (error) {
      } finally {
        setIsSaving(false);
      }
    } else {
      toast.error("محدودیت حداکثر 5 برنامه!", {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const cloneProgram = async () => {
    if (programs.length < 5) {
      const res = await fetch(
        `https://emeettest.pythonanywhere.com/create/program/${student_id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            plan_name: programCurr.name + " کپی شده",
          }),
        }
      );
      const data = await res.json();

      setPrograms((prevPrograms) => {
        const clonedProgram = {
          ...programCurr,
          id: data.id,
          name: data.name,
        };
        const newProgramsList = [...prevPrograms, clonedProgram];
        setProgramCurr(clonedProgram);
        return newProgramsList;
      });
      toast.success("برنامه کلون شد!", {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error("محدودیت حداکثر 5 برنامه!", {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const openEditName = () => setOpenEditNameBool((prev) => !prev);

  const openNewWindow = () =>
    window.open(
      `${window.location.origin}/filtering`,
      "_blank",
      "width=1000,height=600"
    );

  const deleteProgramCurr = async () => {
    if (programs.length === 1) {
      toast.error("نمی‌توانید آخرین برنامه را حذف کنید!", {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const res = await fetch(
      `https://emeettest.pythonanywhere.com/delete/program/${programCurr.id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      setPrograms((prevPrograms) => {
        const updatedPrograms = prevPrograms.filter(
          (program) => program.id !== programCurr.id
        );
        setProgramCurr(updatedPrograms[0] || { id: null, name: "", data: [] });
        return updatedPrograms;
      });

      toast.success("برنامه حذف شد!", {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleRemoveMajor = (majorCodeToRemove) => {
    setPrograms((prevPrograms) => {
      const updatedPrograms = prevPrograms.map((program) => {
        if (program.id === programCurr.id) {
          const newData = program.data.filter(
            (major) => major.code !== majorCodeToRemove
          );
          return { ...program, data: newData };
        }
        return program;
      });

      // Update programCurr to reflect the change immediately
      const newProgramCurr = updatedPrograms.find(
        (p) => p.id === programCurr.id
      );
      if (newProgramCurr) {
        setProgramCurr(newProgramCurr);
      }

      return updatedPrograms;
    });

    toast.success("رشته با موفقیت حذف شد!", {
      position: "top-right",
      autoClose: 2500,
      theme: "light",
      transition: Bounce,
    });
    setIsSave(true);
    setContextPosition({ ...contextPosition, show: false });
  };

  const handleAddMajorAfter = (targetMajorCode) => {
    const findex = programCurr.data.findIndex(
      (major) => major.code === targetMajorCode
    );
    setAddIndex(findex);
    setContextPosition({ ...contextPosition, show: false });
  };

  const onDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setPrograms((prevPrograms) => {
      const updatedPrograms = prevPrograms.map((program) => {
        if (program.id === programCurr.id) {
          const oldIndex = program.data.findIndex(
            (item) => item.code === active.id
          );
          const newIndex = program.data.findIndex(
            (item) => item.code === over.id
          );
          const newData = arrayMove(program.data, oldIndex, newIndex);
          return { ...program, data: newData };
        }
        return program;
      });

      // Update programCurr to reflect the reordered list immediately
      const newProgramCurr = updatedPrograms.find(
        (p) => p.id === programCurr.id
      );
      if (newProgramCurr) {
        setProgramCurr(newProgramCurr);
      }
      setIsSave(true);
      return updatedPrograms;
    });
  };

  useEffect(() => {
    if (addMajor) {
      setPrograms((prevPrograms) => {
        const safePrograms = prevPrograms || [];

        const updatedPrograms = safePrograms.map((program) => {
          const safeData = program?.data || [];

          if (program.id === programCurr.id) {
            if (!safeData.some((m) => m.code === addMajor.code)) {
              const newData = [...safeData];
              const insertIndex =
                addIndex !== null ? addIndex + 1 : newData.length;
              newData.splice(insertIndex, 0, addMajor);
              return { ...program, data: newData };
            }
          }

          return program;
        });

        const newProgramCurr = updatedPrograms.find(
          (p) => p.id === programCurr.id
        );
        if (newProgramCurr) {
          setProgramCurr(newProgramCurr);
        }

        return updatedPrograms;
      });

      setAddMajor(null);
      setAddIndex(null);
      setIsSave(true);
    }
  }, [addMajor, addIndex]);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const Auth = useAuth();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        Auth.setLoading(true);
        const response = await fetch(
          `https://emeettest.pythonanywhere.com/programs/${student_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const fetchedPrograms = await response.json();
          if (fetchedPrograms.length > 0) {
            const dfetchedPrograms = fetchedPrograms.map((program) => ({
              id: program.id,
              name: program.plan_name,
              data: program.plans,
            }));
            setPrograms(dfetchedPrograms);
            setProgramCurr(dfetchedPrograms[0]);
          } else {
            setPrograms([{ id: 1, name: "", data: [] }]);
            setProgramCurr({ id: 1, name: "", data: [] });
          }
        } else {
          console.error("Failed to fetch programs:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        Auth.setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const [isSaving, setIsSaving] = useState(false);
  const savePrograms = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://emeettest.pythonanywhere.com/update/program/${programCurr.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plans: programCurr.data.map((major) => major.id),
          }),
        }
      );

      if (response.ok) {
        const a = await response.json();
        toast.success("برنامه‌ با موفقیت ذخیره شدند!", {
          position: "top-right",
          autoClose: 2500,
          theme: "light",
          transition: Bounce,
        });

        setIsSave(false);
      } else {
        toast.error("خطا در ذخیره‌سازی برنامه‌!", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error(error.message || "خطا در ذخیره‌سازی برنامه‌!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextPosition.show &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setContextPosition({ x: 0, y: 0, id: 0, show: false });
      }
    };

    if (contextPosition.show) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [contextPosition.show, contextPosition]);

  const [OpenPrintDialog, setOpenPrintDialog] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoData, setLogoData] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
      setLogoData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const [note, setNote] = useState(null);

  const handlePrint = () => {
    sessionStorage.setItem("majorsData", JSON.stringify(programCurr.data));
    sessionStorage.setItem("note", note);

    if (logoData) {
      sessionStorage.setItem("printLogo", logoData);
    }
    window.open(`${window.location.origin}/print`, "_blank");
  };
  return (
    <ThemeProvider theme={customTheme}>
      <Dialog
        open={OpenPrintDialog}
        onClose={() => setOpenPrintDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "10px",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#34495E",
            color: "white",
            fontWeight: 600,
            padding: "16px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          تنظیمات پرینت
        </DialogTitle>

        <DialogContent sx={{ width: "600px", padding: "24px", mt: "30px" }}>
          <Typography
            variant="body1"
            component="div"
            sx={{ mb: 2, fontWeight: 500, color: "#333" }}
          ></Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, color: "#555" }}>
              لوگو : (برای نمایش در بالای صفحه پرینت)
            </Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<IconlyUpload size={22} color="white" />}
              sx={{
                backgroundColor: "#5D6D7E",
                "&:hover": {
                  backgroundColor: "#7F8C8D",
                },
                color: "white",
                borderRadius: "8px",
                padding: "8px 20px",
                fontWeight: 500,
                boxShadow: "none",
                textTransform: "none",
              }}
            >
              <Typography mr="10px"> انتخاب فایل</Typography>
              <VisuallyHiddenInput
                type="file"
                onChange={handleLogoChange}
                accept="image/*"
              />
            </Button>
            {logoPreview && (
              <Box
                sx={{
                  mt: 1,
                  width: "200px",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={logoPreview}
                  alt="لوگو"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </Box>
            )}{" "}
            <Box sx={{ mt: "15px" }}>
              <Typography mr="10px" mb="10px">
                افزودن یادداشت:
              </Typography>
              <TextareaAutosize
                // aria-label="minimum height"
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                minRows={4}
                placeholder="یادداشتی بنویسید."
                style={{
                  width: 400,
                  backgroundColor: "#F8F8F8",
                  fontSize: "0.8rem",
                  padding: 10,
                }}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            padding: "16px 24px",
            borderTop: "1px solid #E0E0E0",
            justifyContent: "space-evenly",
            display: "flex",
          }}
        >
          <Button
            onClick={() => setOpenPrintDialog(false)}
            sx={{
              color: "#7F8C8D",
              "&:hover": {
                backgroundColor: "rgba(127,140,141,0.1)",
              },
              borderRadius: "8px",
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            بستن
          </Button>
          <Button
            onClick={handlePrint}
            variant="contained"
            sx={{
              boxShadow: "none",
              backgroundColor: "#28B463",
              "&:hover": {
                backgroundColor: "#239B56",
                boxShadow: "none",
              },
              color: "white",
              borderRadius: "8px",
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            تایید و پرینت
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ p: 1.5, backgroundColor: "white", borderRadius: 2, pb: 10 }}>
        <Box
          ref={containerRef}
          sx={{ width: "100%", paddingBottom: "10px", position: "relative" }}
        >
          {contextPosition.show && (
            <Box
              sx={{
                ...styles.contextMenu,
                left: contextPosition.x,
                top: contextPosition.y,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "rgb(18, 52, 88,0.98)",
                  top: "3.5px",
                  borderRadius: "2px",
                  transform: "translate(-25%,-50%) rotate(45deg)",
                  left: "5%",
                }}
              />

              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => handleAddMajorAfter(contextPosition.id)}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    p: 0.5,
                    fontSize: "0.75rem",
                  }}
                >
                  <IconlyPlus size={18} color="white" />
                  اضافه به بعد
                </Typography>
              </Box>

              <Divider
                sx={{
                  opacity: 0.6,
                  borderBottom: "1px solid white",
                  width: "100%",
                  mb: "5px",
                }}
              />

              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => handleRemoveMajor(contextPosition.id)}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    p: 0.5,
                    fontSize: "0.75rem",
                  }}
                >
                  <IconlyDelete size={16} color="white" />
                  حذف
                </Typography>
              </Box>

              <Divider
                sx={{
                  opacity: 0.6,
                  borderBottom: "1px solid white",
                  width: "100%",
                  mb: "5px",
                }}
              />

              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => setWithColor(!withColor)}
              >
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    p: 0.5,
                    fontSize: "0.7rem",
                  }}
                >
                  <IconlyShow size={16} color="white" />
                  {withColor
                    ? "بدون در نظر گرفتن رنگ ها"
                    : "با در نظر گرفتن رنگ ها"}
                </Typography>
              </Box>
            </Box>
          )}
          <Card sx={{ width: "100%", border: "none", boxShadow: "none" }}>
            <CardHeader
              sx={{ p: 0 }}
              // action={
              //   <Tooltip title="افزودن برنامه جدید">
              //     <IconButton onClick={handleAddProgram}>
              //       <IconlyPlus size={35} color="#34495E" fill="#34495E" />
              //     </IconButton>
              //   </Tooltip>
              // }
            />
            <CardContent sx={{ p: 0 }}>
              <Grid
                container
                gap={1}
                p={0}
                sx={{ display: "flex", alignItems: "center" }}
              >
                {programs.map((program) => (
                  <Grid item sm={1.4} key={program.id}>
                    <Box
                      onClick={() => {
                        setProgramCurr(program);
                        setOpenEditNameBool(false);
                      }}
                      sx={{
                        ...styles.programTab,
                        fontSize:
                          program.name.length > 20 ? "0.7rem" : "0.84rem",
                        backgroundColor:
                          program.id === programCurr.id ? "#34495E" : "#5D6D7E",
                      }}
                    >
                      {convertToPersianNumbers(program.name)}
                    </Box>
                  </Grid>
                ))}
                <Tooltip title="افزودن برنامه جدید">
                  <IconButton onClick={handleAddProgram} sx={{ mr: "-12px" }}>
                    <IconlyPlus size={30} color="#34495E" fill="#34495E" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </CardContent>
          </Card>
          <Box mt="0px" mb="50px">
            <Accordion
              sx={{
                backgroundColor: "#F8F8F8",
                border: "none",
                boxShadow: "none",
              }}
            >
              <AccordionSummary expandIcon={<IconlyArrowDown2 />}>
                <Typography variant="h6" sx={{ fontSize: "0.9rem" }}>
                  راهنمای استفاده
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column" gap={0.5}>
                  <Typography sx={{ display: "flex", gap: 0.5 }}>
                    - با <IconlyDrag /> و جابجا کردن آن به مکان مورد نظر،
                    می‌توانید ترتیب اولیه را مطابق نظر خود تغییر دهید.
                  </Typography>
                  <Typography sx={{ display: "flex", gap: 0.5 }}>
                    - با <IconlyRightClick size={22} /> راست‌کلیک بر روی هر یک
                    از موارد، می‌توانید به عملیات‌هایی نظیر حذف، اضافه کد رشته
                    جدید به بعد و ... دست پیدا کنید.
                  </Typography>
                  <Typography sx={{ display: "flex", gap: 0.5 }}>
                    - به وسیله "یافتن در دفترچه" می‌توانید با استفاده از
                    موتورهای جستجو، به راحتی به کد رشته مدنظر خود جهت افزودن دست
                    پیدا کنید.
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box>
            <Typography
              sx={{
                display: "flex",
                gap: 0.5,
                mb: "100px",
                fontSize: "1.5rem",
              }}
            >
              {programCurr && convertToPersianNumbers(programCurr.name)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              m: "10px",
              justifyContent: "space-between",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              <Button
                disabled={!isSave}
                onClick={savePrograms}
                sx={{
                  ...styles.actionButton,
                  backgroundColor: isSave ? "green" : "#5d6d7e",
                }}
              >
                <IconlyBookmark size={18} color="white" />
                <Typography
                  sx={{
                    m: "5px",
                    fontSize: "0.8rem",
                    display: "flex",
                    gap: "5px",
                    justifyContent: "center",
                  }}
                >
                  ذخیره{" "}
                  {isSaving && <CircularProgress color="white" size={20} />}
                </Typography>
              </Button>
              <Button
                onClick={() => {
                  if (!priorityService) {
                    Swal.fire({
                      title: "اولویت بندی",
                      text: `در صورت استفاده از اولویت بندی ، برنامه کنونی شما از بین میرود با این حال از انجام این کار مطمئن هستید؟`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#5D6D7E", // Adjusted color
                      confirmButtonText: "بله!",
                      cancelButtonText: "لغو",
                    }).then((result) => {
                      if (result.isConfirmed)
                        setPriorityService(!priorityService);
                    });
                  } else {
                    setPriorityService(!priorityService);
                  }
                }}
                sx={{ ...styles.actionButton, backgroundColor: "#5d6d7e" }}
              >
                <IconlyEdit size={18} color="white" />
                <Typography sx={{ m: "5px", fontSize: "0.8rem" }}>
                  اولویت بندی
                </Typography>
              </Button>
              <Button
                onClick={openEditName}
                sx={{ ...styles.actionButton, backgroundColor: "#5d6d7e" }}
              >
                <IconlyEdit size={18} color="white" />
                <Typography sx={{ m: "5px", fontSize: "0.8rem" }}>
                  ویرایش نام برنامه
                </Typography>
              </Button>
              <Button
                onClick={deleteProgramCurr}
                sx={{ ...styles.actionButton, backgroundColor: "#5d6d7e" }}
              >
                <IconlyDelete size={18} color="white" />
                <Typography sx={{ m: "5px", fontSize: "0.8rem" }}>
                  حذف برنامه
                </Typography>
              </Button>
              <Button
                onClick={cloneProgram}
                sx={{ ...styles.actionButton, backgroundColor: "#5d6d7e" }}
              >
                <IconlyCopy size={20} color="white" />
                <Typography sx={{ m: "5px", fontSize: "0.8rem" }}>
                  کلون کردن برنامه
                </Typography>
              </Button>
              <Button
                onClick={openNewWindow}
                sx={{ ...styles.actionButton, backgroundColor: "#5d6d7e" }}
              >
                <IconlyFilter2 size={18} color="white" />
                <Typography sx={{ m: "5px", fontSize: "0.8rem" }}>
                  یافتن از دفترچه
                </Typography>
              </Button>
              <Button
                onClick={() => {
                  // sessionStorage.setItem(
                  //   "majorsData",
                  //   JSON.stringify(programCurr.data)
                  // );
                  // window.open(`${window.location.origin}/print`, "_blank");

                  setOpenPrintDialog(true);
                }}
                sx={{ ...styles.actionButton, backgroundColor: "#5d6d7e" }}
              >
                <IconlyPrinter size={16} color="white" />
                <Typography sx={{ m: "5px", fontSize: "0.8rem" }}>
                  پرینت
                </Typography>
              </Button>
            </Box>
          </Box>
          <Collapse in={openEditNameBool}>
            {openEditNameBool && (
              <EditNamePlan
                closeable={false}
                programCurr={programCurr}
                setPrograms={setPrograms}
                setProgramCurr={setProgramCurr}
                names={programs.map((p) => p.name)}
                closeAdd={() => setOpenEditNameBool(false)}
              />
            )}
          </Collapse>
          {priorityService ? (
            <FillPriority
              programCurr={programCurr}
              setPrograms={setPrograms}
              setProgramCurr={setProgramCurr}
              setPriorityService={setPriorityService}
              setIsSave={setIsSave}
            />
          ) : (
            <>
              <Majortitle />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={onDragEnd}
                  sensors={addIndex !== null ? [] : undefined}
                >
                  <SortableContext
                    items={programCurr?.data?.map((major) => major.code) || []}
                    strategy={verticalListSortingStrategy}
                  >
                    {programCurr?.data?.length > 0 ? (
                      programCurr?.data?.map((major, index) => (
                        <React.Fragment key={major.code}>
                          <Majordetail
                            onClickAction={() =>
                              setContextPosition({
                                x: 0,
                                y: 0,
                                show: false,
                                id: 0,
                              })
                            }
                            index={index + 1}
                            major={major}
                            id={major.code}
                            contextAction={(e) => {
                              e.preventDefault();
                              const containerRect =
                                containerRef.current.getBoundingClientRect();
                              setContextPosition({
                                x: e.clientX - containerRect.left - 10,
                                y: e.clientY - containerRect.top,
                                show: true,
                                id: major.code,
                              });
                            }}
                          />
                          <Collapse in={index === addIndex}>
                            <AddtoMajorList
                              setAddMajor={setAddMajor}
                              currentProgramData={programCurr.data}
                              closeable={true}
                              closeAdd={() => setAddIndex(null)}
                            />
                          </Collapse>
                        </React.Fragment>
                      ))
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "30vh",
                          px: "15px",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="body1" color="text.secondary">
                          چیزی اینجا نیست! برای شروع یک کدرشته وارد کنید یا از
                          اولویت بندی را انتخاب کنید.
                        </Typography>
                        <Box sx={{ width: "100%", mt: "15px", p: "10px" }}>
                          <AddtoMajorList
                            setAddMajor={setAddMajor}
                            currentProgramData={programCurr.data}
                            closeable={false}
                            closeAdd={() => setAddIndex(null)}
                          />
                        </Box>
                      </Box>
                    )}
                  </SortableContext>
                </DndContext>
              </Box>
            </>
          )}
        </Box>
        <ToastContainer />
      </Box>
    </ThemeProvider>
  );
}
