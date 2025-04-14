import React, { useEffect, useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";

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
  Collapse,
} from "@mui/material";
import ReactDOMServer from "react-dom/server";
import Majordetail from "./Majordetail";
import Majortitle from "./Majortitle";
import AddtoMajorList from "./AddtoMajorList";
import {
  IconlyDrag,
  IconlyPrinter,
  IconlyFilter2,
  IconlyDelete,
  IconlyAdduser,
  IconlyPlus,
  IconlyRightClick,
  IconlyUpload,
} from "../../../public/Icons";
import { closestCenter, closestCorners, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import PrintMajors from "./PrintMajors";
// import logo from "../../../public/logo.svg";
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

const majorsOptions = [
  {
    uni_name: "دانشگاه تهران",
    major: "مهندسی کامپیوتر",
    sex: 0,
    code: "60001",
    dorm: true,
    university_type: "public",
    capacity: 100,
    major_type: "daytime",
    description: "برنامه درسی به‌روز با اساتید برجسته",
    city: "تهران",
    province: "تهران",
  },
  {
    uni_name: "دانشگاه صنعتی شریف",
    major: "مهندسی برق",
    sex: 1,
    code: "60002",
    dorm: true,
    university_type: "public",
    capacity: 80,
    major_type: "daytime",
    description: "اساتید مجرب و آزمایشگاه‌های پیشرفته",
    city: "تهران",
    province: "تهران",
  },
  {
    uni_name: "دانشگاه امیرکبیر",
    major: "مهندسی مکانیک",
    sex: 0,
    code: "60003",
    dorm: false,
    university_type: "public",
    capacity: 70,
    major_type: "nighttime",
    description: null,
    city: "تهران",
    province: "تهران",
  },
  {
    uni_name: "دانشگاه علم و صنعت",
    major: "مهندسی صنایع",
    sex: 1,
    code: "60004",
    dorm: true,
    university_type: "public",
    capacity: 60,
    major_type: "daytime",
    description: "محیط آموزشی مناسب برای یادگیری مدیریت صنعتی",
    city: "تهران",
    province: "تهران",
  },
  {
    uni_name: "دانشگاه شهید بهشتی",
    major: "حقوق",
    sex: 0,
    code: "60005",
    dorm: true,
    university_type: "public",
    capacity: 90,
    major_type: "daytime",
    description: "یکی از برترین دانشکده‌های حقوق کشور",
    city: "تهران",
    province: "تهران",
  },
  {
    uni_name: "دانشگاه فردوسی مشهد",
    major: "علوم کامپیوتر",
    sex: 1,
    code: "60006",
    dorm: true,
    university_type: "public",
    capacity: 50,
    major_type: "daytime",
    description: "محیط دانشگاهی پویا با امکانات آموزشی عالی",
    city: "مشهد",
    province: "خراسان رضوی",
  },
  {
    uni_name: "دانشگاه تبریز",
    major: "مهندسی عمران",
    sex: 0,
    code: "60007",
    dorm: true,
    university_type: "public",
    capacity: 85,
    major_type: "daytime",
    description: null,
    city: "تبریز",
    province: "آذربایجان شرقی",
  },
  {
    uni_name: "دانشگاه اصفهان",
    major: "ریاضیات کاربردی",
    sex: 1,
    code: "60008",
    dorm: true,
    university_type: "public",
    capacity: 40,
    major_type: "daytime",
    description: "تمرکز بر کاربردهای ریاضیات در مهندسی و علوم",
    city: "اصفهان",
    province: "اصفهان",
  },
  {
    uni_name: "دانشگاه شیراز",
    major: "مهندسی شیمی",
    sex: 0,
    code: "60009",
    dorm: false,
    university_type: "public",
    capacity: 75,
    major_type: "daytime",
    description: "دروس تخصصی همراه با کارهای آزمایشگاهی قوی",
    city: "شیراز",
    province: "فارس",
  },
  {
    uni_name: "دانشگاه زنجان",
    major: "کشاورزی",
    sex: 1,
    code: "60010",
    dorm: true,
    university_type: "public",
    capacity: 60,
    major_type: "daytime",
    description: "آموزش‌های کاربردی در زمینه کشاورزی و محیط‌زیست",
    city: "زنجان",
    province: "زنجان",
  },
  {
    uni_name: "دانشگاه مازندران",
    major: "مدیریت بازرگانی",
    sex: 0,
    code: "60011",
    dorm: false,
    university_type: "public",
    capacity: 55,
    major_type: "nighttime",
    description: "تمرکز بر مهارت‌های کسب‌وکار و تجارت",
    city: "بابلسر",
    province: "مازندران",
  },
  {
    uni_name: "دانشگاه گیلان",
    major: "زیست‌شناسی",
    sex: 1,
    code: "60012",
    dorm: true,
    university_type: "public",
    capacity: 45,
    major_type: "daytime",
    description: "تحقیقات پیشرفته در علوم زیستی",
    city: "رشت",
    province: "گیلان",
  },
  {
    uni_name: "دانشگاه ارومیه",
    major: "دامپزشکی",
    sex: 0,
    code: "60013",
    dorm: true,
    university_type: "public",
    capacity: 65,
    major_type: "daytime",
    description: "دوره‌های تخصصی در زمینه درمان حیوانات",
    city: "ارومیه",
    province: "آذربایجان غربی",
  },
  {
    uni_name: "دانشگاه یزد",
    major: "فیزیک",
    sex: 1,
    code: "60014",
    dorm: false,
    university_type: "public",
    capacity: 30,
    major_type: "daytime",
    description: "آموزش عمیق در نظریه‌های فیزیک مدرن",
    city: "یزد",
    province: "یزد",
  },
  {
    uni_name: "دانشگاه کردستان",
    major: "زبان و ادبیات فارسی",
    sex: 0,
    code: "60015",
    dorm: true,
    university_type: "public",
    capacity: 50,
    major_type: "daytime",
    description: "مطالعه و تحلیل آثار برجسته ادبیات فارسی",
    city: "سنندج",
    province: "کردستان",
  },
];

export default function MajorPriority({ type }) {
  const [majors, setMajores] = useState(majorsOptions);
  const [addIndex, setAddIndex] = useState(null);
  const [file, setFile] = useState(null);
  const [addmajor, setAddmajor] = useState(null);
  const handleLogoClick = () => {
    inputRef.current?.click();
  };
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFile(previewURL);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });
  const inputRef = useRef();
  const [contextposition, setContextPosition] = useState({
    x: 0,
    y: 0,
    id: 0,
    show: false,
  });
  useEffect(() => {
    if (
      addmajor != null &&
      !majors.some((major) => major.code == addmajor.code)
    ) {
      const updatedItems = [...majors];
      updatedItems.splice(addIndex + 1, 0, addmajor);
      setMajores(updatedItems);

      setAddmajor(null);
      setAddIndex(null);
    }
    return;
  }, [addmajor]);

  useEffect(() => {
    const handleClick = () => {
      setContextPosition({
        x: 0,
        y: 0,
        id: 0,
        show: false,
      });
    };

    if (contextposition.show) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [contextposition.show]);

  const onDragEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    setMajores((prevMajores) => {
      const oldIndex = prevMajores.findIndex((item) => item.code === active.id);
      const newIndex = prevMajores.findIndex((item) => item.code === over.id);

      return arrayMove(prevMajores, oldIndex, newIndex);
    });
  };

  const openNewWindow = () => {
    const newWindow = window.open("", "filter", "width=1000,height=600");
    newWindow.document.location = `${window.location.origin}/filtering`;
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ width: "100%", paddingBottom: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            marginBottom: "6%",
          }}
        >
          <Typography variant="h6">راهنمای استفاده:</Typography>
          <Typography sx={{ display: "flex", gap: 0.5 }}>
            - با انتخاب
            <IconlyDrag />و جابجا کردن آن به مکان مورد نظر ، میتوانید ترتیب
            اولیه را مطابق نظر خود تغییر دهید.
          </Typography>
          <Typography sx={{ display: "flex", justifyContents: "center" }}>
            - با <IconlyRightClick size={22} /> راست کلیک بر روی هر یک از موارد
            میتوانید به عملیات هایی نظیر حذف ، اضافه کد رشته جدید به بعد و ...
            دست پیدا کنید.{" "}
          </Typography>

          <Typography
            mb={10}
            sx={{ display: "flex", justifyContents: "center" }}
          >
            - به وسیله " یافتن در دفترچه " میتوانید با استفاده از موتور های
            جستجو به راحتی به کد رشته مدنظر خود جهت افزودن دست پیدا کنید.
          </Typography>
        </Box>

        {/* <Typography sx={{ display: "flex", justifyContents: "center" }}>
          نام دانش‌آموز : محمد میرابی
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            // justifyContent: "center",
            alignItems: "center",
            // minHeight: "250px",
            padding: "0.1rem",
            // maxWidth:"150px"
          }}
        >
          {1 == 2 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
              onClick={handleLogoClick}
            >
              <img src={file} width={100} height={100} alt="لوگو" />
              <Typography>لوگوی مجموعه</Typography>
              <input
                type="file"
                // ref={inputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onDrop([file]);
                  }
                }}
                accept="image/*"
                style={{ display: "none" }}
              />
            </Box>
          ) : (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #ccc",
                borderRadius: "15px",
                padding: 1,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <Typography>فایل را رها کنید...</Typography>
              ) : (
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.8rem",
                  }}
                >
                  <IconlyUpload />
                  لوگو مجموعه را اینجا بکشید یا آپلود کنید.
                </Typography>
              )}
            </Box>
          )} */}
        {/* </div> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            m: "10px",
            gap: "10px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: contextposition.x,
              top: contextposition.y,
              display: contextposition.show ? "flex" : "none",
              width: "150px",
              flexDirection: "column",
              height: "auto",
              borderRadius: "10px",
              backgroundColor: "rgb(18, 52, 88,0.98)",
              padding: "10px",
              gap: 0.5,
              color: "white",
              zIndex: 10,
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
            />{" "}
            <Box
              onClick={() => {
                const code = contextposition.id;

                const findex = majors.findIndex((major) => major.code === code);
                setAddIndex(findex);
              }}
              sx={{ cursor: "pointer" }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
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
                width: "90%",
              }}
            />
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => {
                const code = contextposition.id;

                const itemToDelete = majors.find(
                  (major) => major.code === code
                );

                if (itemToDelete) {
                  const updatedItems = majors.filter(
                    (major) => major.code !== code
                  );
                  setMajores(updatedItems);
                }
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "0.75rem",
                }}
              >
                <IconlyDelete size={16} color="white" />
                حذف
              </Typography>
            </Box>{" "}
          </Box>
          <Button
            onClick={() => {
              sessionStorage.setItem("majorsData", JSON.stringify(majors));
              window.open(`${window.location.origin}/print`, "_blank");
            }}
            sx={{
              padding: "4px 12px",
              backgroundColor: "#115c33",
              color: "white",
              borderRadius: "10px",
            }}
          >
            <IconlyPrinter size={16} color="white" />

            <Typography sx={{ m: "5px", fontSize: "0.8rem" }}>پرینت</Typography>
          </Button>
          <Button
            onClick={openNewWindow}
            sx={{
              padding: "4px 12px",
              backgroundColor: "#A5158C",
              color: "white",
              borderRadius: "10px",
            }}
          >
            <IconlyFilter2 size={18} color="white" />

            <Typography sx={{ m: "5px", fontSize: "0.8rem" }}>
              یافتن از دفترچه
            </Typography>
          </Button>
        </Box>
        <Majortitle />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.4,
          }}
        >
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            sensors={addIndex != null ? [] : undefined}
          >
            <SortableContext
              items={majors.map((major) => major.code)}
              strategy={verticalListSortingStrategy}
            >
              {majors.map((major, index) => (
                <>
                  <Majordetail
                    onClickAction={() => {
                      console.log(major.code);
                      setContextPosition({
                        x: 0,
                        y: 0,
                        show: false,
                        id: 0,
                      });
                    }}
                    key={index}
                    index={index + 1}
                    major={major}
                    id={major.code}
                    contextAction={(e) => {
                      console.log(major.code);
                      e.preventDefault();
                      setContextPosition({
                        x: e.pageX - 90,
                        y: e.pageY - 470,
                        show: true,
                        id: major.code,
                      });
                    }}
                  />

                  <Collapse in={index == addIndex}>
                    <AddtoMajorList
                      setAddmajor={setAddmajor}
                      options={majorsOptions}
                      closeAdd={() => {
                        setAddIndex(null);
                      }}
                    />
                  </Collapse>
                </>
              ))}
            </SortableContext>
          </DndContext>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
