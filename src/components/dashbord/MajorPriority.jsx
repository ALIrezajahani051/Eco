import React, { useEffect, useState } from "react";
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
} from "../../../public/Icons";
import { closestCenter, closestCorners, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import PrintMajors from "./PrintMajors";
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
  },
];

export default function MajorPriority({ type }) {
  const [majors, setMajores] = useState(majorsOptions);
  const [addIndex, setAddIndex] = useState(null);
  const [addmajor, setAddmajor] = useState(null);

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
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            marginBottom: "10%",
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

          <Typography sx={{ display: "flex", justifyContents: "center" }}>
            - به وسیله " یافتن در دفترچه " میتوانید با استفاده از موتور های
            جستجو به راحتی به کد رشته مدنظر خود جهت افزودن دست پیدا کنید.
          </Typography>
        </Box>
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
            sessionStorage.setItem('majorsData', JSON.stringify(majors));
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
            gap: 1,
          }}
        >
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
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
                        x: e.pageX - 80,
                        y: e.pageY - 410,
                        show: true,
                        id: major.code,
                      });
                    }}
                  />
                  {index == addIndex && (
                    <AddtoMajorList
                      setAddmajor={setAddmajor}
                      options={majorsOptions}
                      closeAdd={() => {
                        setAddIndex(null);
                      }}
                    />
                  )}
                </>
              ))}
            </SortableContext>
          </DndContext>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
