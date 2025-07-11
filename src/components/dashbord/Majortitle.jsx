import React from "react";
import { Box, Typography } from "@mui/material";

export default function Majortitle() {
  return (
    <Box
      sx={{
        position: "sticky",
        top: "2px",
        zIndex: 1,
        p: "15px 25px",
        mb: "10px",
        color: "white",
        backgroundColor: "#34495E",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      <Typography sx={{ width: "2%", textAlign: "center" }}></Typography>
      <Typography sx={{ width: "4%", textAlign: "center" }}></Typography>
      <Typography sx={{ width: "20%", textAlign: "center" }}>
        دانشگاه
      </Typography>
      <Typography sx={{ width: "20%", textAlign: "center" }}>رشته</Typography>
      <Typography sx={{ width: "10%", textAlign: "center" }}>شهر</Typography>
      <Typography sx={{ width: "10%", textAlign: "center" }}>استان</Typography>
      <Typography sx={{ width: "15%", textAlign: "center" }}>نوع</Typography>
      <Typography sx={{ width: "5%", textAlign: "center" }}>کد</Typography>
      <Typography sx={{ width: "10%", textAlign: "center" }}>
        خوابگاه
      </Typography>
      <Typography sx={{ width: "20%", textAlign: "center" }}>
        توضیحات
      </Typography>
    </Box>
  );
}
