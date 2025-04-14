import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Tooltip } from "@mui/material";
import { IconlyCloseSquare, IconlyPlus } from "../../../public/Icons";

const convertToPersianNumbers = (num) => {
  if (num != null)
    return num.toString().replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  return;
};

export default function AddtoMajorList({
  setAddmajor,
  options,
  backgroundColor = "white",
  closeAdd,
}) {
  const [code, setCode] = useState(null);
  const [major, setMajor] = useState(null);
  const [disableAddButton, setDisableAddButton] = useState(true);
  useEffect(() => {
    const index = options.findIndex((item) => item.code === code);
    setMajor(options[index]);
    if (index != -1) setDisableAddButton(false);
    else setDisableAddButton(true);
  }, [code]);

  return (
    <Box
      sx={{
        paddingBottom: "5px",
        backgroundColor: backgroundColor,
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
        touchAction: "none",
      }}
    >
      <Tooltip title="بستن">
        <Typography
          onClick={closeAdd}
          sx={{
            display: "inline-flex",
            width: "2%",
            alignItems: "center",
            gap: "3px",
            cursor: "pointer",
          }}
        >
          <IconlyCloseSquare color="red" />
        </Typography>
      </Tooltip>

      <Box mr={3}>
        <Typography>کد رشته :</Typography>
        <TextField
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          sx={{
            width: "20%",
            backgroundColor: "#f0f0f0",
            borderRadius: "10px",
            "& .MuiInputBase-root input": {
              padding: "10px",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
          placeholder="مثال: 60008"
        />
        <Button
          onClick={() => {
            setAddmajor(major);
          }}
          disabled={disableAddButton}
          sx={{
            display: "inline-flex",
            backgroundColor: disableAddButton ? "gray" : "#143D60",
            color: "white",
            gap: "5px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            marginRight: "10px",
            padding: "8px",
            fontSize: "0.75rem",
          }}
        >
          <IconlyPlus
            color={disableAddButton ? "#5f5f5f" : "white"}
            size={20}
          />
          افزودن{" "}
        </Button>
      </Box>

      {major != null && (
        <Box
          mt={1}
          
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
            opacity: 0.4,
            p: "2px 25px",
          }}
        >
          <Typography sx={{ width: "2%", textAlign: "center" }}></Typography>
          <Typography sx={{ width: "4%", textAlign: "center" }}></Typography>
          <Typography sx={{ width: "20%", textAlign: "center" }}>
            {major.uni_name}
          </Typography>
          <Typography sx={{ width: "20%", textAlign: "center" }}>
            {major.major}
          </Typography>
          <Typography sx={{ width: "10%", textAlign: "center" }}>
            {major.city}
          </Typography>
          <Typography sx={{ width: "10%", textAlign: "center" }}>
            {major.province}
          </Typography>
          <Typography
            sx={{ width: "15%", fontSize: "0.8rem", textAlign: "center" }}
          >
            {major.major_type === "daytime" ? "روزانه" : "نیمسال‌دوم"}
          </Typography>
          <Typography sx={{ width: "5%", textAlign: "center" }}>
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
            {major.description ? major.description : "-"}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
