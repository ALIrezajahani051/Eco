import React from "react";
import { Box, Typography } from "@mui/material";
import { IconlyDrag } from "../../../public/Icons";
const convertToPersianNumbers = (num) => {
  return num.toString().replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};
export default function Majordetail({ major, backgroundColor = "#FBFBFB" }) {
  return (
    <Box
      sx={{
        p: "25px 15px",
        backgroundColor: backgroundColor,
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      <Typography sx={{ width: "4%", cursor: "grab", textAlign: "center" }}>
        <IconlyDrag size={20} />
      </Typography>
      <Typography sx={{ width: "20%", textAlign: "center" }}>
        {major.uni_name}
      </Typography>
      <Typography sx={{ width: "20%", textAlign: "center" }}>
        {major.major}
      </Typography>
      <Typography
        sx={{ width: "15%", fontSize: "0.8rem", textAlign: "center" }}
      >
        {major.major_type == "daytime" ? "روزانه" : "نیمسال‌دوم"}
      </Typography>

      <Typography sx={{ width: "10%", textAlign: "center" }}>
        {convertToPersianNumbers(major.code)}
      </Typography>
      <Typography sx={{ width: "10%", textAlign: "center" }}>
        {major.dorm ? "دارد" : "ندارد"}
      </Typography>
      <Typography
        sx={{
          overflow: "auto",
          width: "20%",
          fontSize: "0.75rem",
          textAlign: "center",
        }}
      >
        {major.description != null ? major.description : "-"}
      </Typography>
    </Box>
  );
}
