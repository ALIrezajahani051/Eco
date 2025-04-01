import React from "react";
import { Box, Typography } from "@mui/material";
import { IconlyDrag } from "../../../public/Icons";
const convertToPersianNumbers = (num) => {
  return num.toString().replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};
export default function Majortitle() {
  return (
    <Box
      sx={{
        position: "sticky",
        top: "2px",
        p: "20px 15px",
        mb: "10px",
        background:
          "linear-gradient(150deg, rgba(89,165,167,0.15) 10%, rgba(0,129,255,0.15) 73%)",

        backdropFilter: "blur(5px)",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      <Typography sx={{ width: "2%", textAlign: "center" }}>
      </Typography>
      <Typography sx={{ width: "4%", cursor: "grab", textAlign: "center" }}>
        {/* <IconlyDrag size={20} /> */}
      </Typography>
      <Typography sx={{ width: "20%", textAlign: "center" }}>
        دانشگاه
      </Typography>
      <Typography sx={{ width: "20%", textAlign: "center" }}>رشته</Typography>
      <Typography sx={{ width: "15%", textAlign: "center" }}>نوع</Typography>

      <Typography sx={{ width: "10%", textAlign: "center" }}>
        کد رشته{" "}
      </Typography>
      <Typography sx={{ width: "10%", textAlign: "center" }}>
        وضعیت خوابگاه
      </Typography>
      <Typography sx={{ width: "20%", textAlign: "center" }}>
        توضیحات
      </Typography>
    </Box>
  );
}
