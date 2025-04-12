import React from "react";
import { Box, Typography } from "@mui/material";
import { IconlyDrag } from "../../../public/Icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const convertToPersianNumbers = (num) => {
  return num.toString().replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};

export default function Majordetail({
  onClickAction,
  contextAction,
  index,
  major,
  id,
  backgroundColor = "#FBFBFB",
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: transform ? CSS.Transform.toString(transform) : undefined,
  };

  return (
    <Box
      onMouseDown={onClickAction}
      onContextMenu={contextAction}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        ...style,
        p: "10px 25px",
        backgroundColor: backgroundColor,
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        height: "45px",
        touchAction: "none",
      }}
    >
      <Typography sx={{ width: "2%" }}>
        {convertToPersianNumbers(index)}
      </Typography>
      <Typography
        sx={{
          width: "4%",
          cursor: "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
        {major.major_type === "daytime" ? "روزانه" : "نیمسال‌دوم"}
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
          fontSize: "0.7rem",
          textAlign: "center",
          wordWrap: "break-word",
        }}
      >
        {major.description ? major.description : "-"}
      </Typography>
    </Box>
  );
}
