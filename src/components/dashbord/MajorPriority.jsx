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
import Majordetail from "./Majordetail";
import Majortitle from "./Majortitle";
import {
  IconlyDrag,
  IconlyPrinter,
  IconlyFilter2,
} from "../../../public/Icons";
import { closestCenter, closestCorners, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
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

  const title = [
    {
      uni_name: "دانشگاه",
      major: "رشته",
      sex: 1,
      code: "50005",
      dorm: "وضعیت خوابگاه",
      university_type: "public",
      capacity: 50,
      major_type: "",
      description: "توضیحات",
    },
  ];

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
      <Box sx={{ width: "100%", position: "relative" }}>
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
          <Typography>
            - همچنین میتوانید به وسیله کد رشته ، رشته مد نظر خود را که در ترتیب
            اولیه اولویت ها وجود ندارد اضافه کنید ، این موارد به اول اضافه
            خواهند شد.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            m: "10px",
            gap: "10px",
          }}
        >
          <Button
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
                <Majordetail
                  key={index}
                  index={index + 1}
                  major={major}
                  id={major.code}
                />
              ))}
            </SortableContext>
          </DndContext>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
