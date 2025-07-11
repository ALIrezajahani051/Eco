// EditNamePlan.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Tooltip } from "@mui/material";
import { IconlyCloseSquare, IconlyEdit } from "../../../public/Icons";
import { toast, Bounce } from "react-toastify";

const convertToPersianNumbers = (num) => {
  if (num != null) {
    return num.toString().replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  }
  return "";
};

export default function EditNamePlan({
  closeable = true,
  names = [],
  programCurr,
  setPrograms,
  setProgramCurr,
  backgroundColor = "white",
  closeAdd,
}) {
  const [name, setName] = useState(programCurr.name);
  const [disableEditButton, setDisableEditButton] = useState(true);

  useEffect(() => {
    setName(programCurr.name);
  }, [programCurr.name]);

  useEffect(() => {
    const trimmedName = name.trim();
    const otherProgramNames = names
      .filter((n) => n.trim() !== programCurr.name.trim()) // Filter out the current program's original name
      .map((n) => n.trim());

    const isDuplicate = otherProgramNames.includes(trimmedName);
    const isEmpty = trimmedName === "";

    setDisableEditButton(isDuplicate || isEmpty);
  }, [name, names, programCurr.name]);

  const handleEditName = async () => {
    const trimmedName = name.trim();

    if (disableEditButton || trimmedName.length > 20) {
      toast.error("نام برنامه نمیتواند خالی ، تکراری یا بیش از 20 حرف باشد!", {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    // fetch
    const res = await fetch(
      `https://emeettest.pythonanywhere.com/update/program/${programCurr.id}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_name: name,
        }),
      }
    );

    if (res.ok) {
      setPrograms((prevPrograms) => {
        const updatedPrograms = prevPrograms.map((program) => {
          if (program.id === programCurr.id) {
            return { ...program, name: trimmedName };
          }
          return program;
        });
        return updatedPrograms;
      });

      setProgramCurr((prevProgramCurr) => {
        if (prevProgramCurr.id === programCurr.id) {
          return { ...prevProgramCurr, name: trimmedName };
        }
        return prevProgramCurr;
      });

      toast.success("نام برنامه با موفقیت ویرایش شد!", {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
        transition: Bounce,
      });
    } 

    if (closeable && closeAdd) {
      closeAdd();
    }
  };

  return (
    <Box
      sx={{
        py: "20px",
        px: "15px",
        backgroundColor,
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
        touchAction: "none",
      }}
    >
      {closeable && (
        <Tooltip title="بستن">
          <Typography
            onClick={closeAdd}
            sx={{
              display: "inline-flex",
              width: "2%",
              alignSelf: "flex-end",
              alignItems: "center",
              gap: "3px",
              cursor: "pointer",
            }}
          >
            <IconlyCloseSquare color="red" />
          </Typography>
        </Tooltip>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography sx={{ flexShrink: 0 }}>نام جدید :</Typography>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            flexGrow: 1,
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
          placeholder="e.g : 60008"
        />
        <Button
          onClick={handleEditName}
          disabled={disableEditButton}
          sx={{
            display: "inline-flex",
            backgroundColor: disableEditButton ? "gray" : "#143D60",
            color: "white",
            gap: "5px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            padding: "8px 15px",
            fontSize: "0.85rem",
            minWidth: "unset",
          }}
        >
          <IconlyEdit
            color={disableEditButton ? "#5f5f5f" : "white"}
            size={20}
          />
          ویرایش
        </Button>
      </Box>
    </Box>
  );
}
