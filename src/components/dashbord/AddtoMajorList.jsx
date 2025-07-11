import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { IconlyCloseSquare, IconlyPlus } from "../../../public/Icons";
import { toast, Bounce } from "react-toastify";

const convertToPersianNumbers = (num) => {
  if (num != null)
    return num.toString().replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  return "";
};

export default function AddtoMajorList({
  setAddMajor,
  closeable = true,
  currentProgramData = [],
  backgroundColor = "white",
  closeAdd,
}) {
  const [code, setCode] = useState("");
  const [fetchedMajor, setFetchedMajor] = useState(null);
  const [disableAddButton, setDisableAddButton] = useState(true);
  const [isMajorAlreadyAdded, setIsMajorAlreadyAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchByCode = async () => {
      const trimmedCode = code.trim();

      if (!trimmedCode || trimmedCode.length != 5) {
        setDisableAddButton(true);
        setFetchedMajor(null);
        setIsMajorAlreadyAdded(false);
        return;
      }

      const existsInCurrentProgram = currentProgramData?.some(
        (m) => String(m.code) === trimmedCode
      );

      if (existsInCurrentProgram) {
        setDisableAddButton(true);
        setFetchedMajor(null);
        setIsMajorAlreadyAdded(true);
        toast.info("این رشته قبلاً به برنامه اضافه شده است!", {
          position: "top-right",
          autoClose: 2500,
          theme: "light",
          transition: Bounce,
        });
        return;
      } else {
        setIsMajorAlreadyAdded(false);
      }

      try {
        setLoading(true);
        const res = await fetch(
          `https://emeettest.pythonanywhere.com/findbycode/${encodeURIComponent(
            trimmedCode
          )}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          setDisableAddButton(true);
          setFetchedMajor(null);
          if (!existsInCurrentProgram) {
            toast.error("کد رشته یافت نشد یا مشکلی پیش آمد!", {
              position: "top-right",
              autoClose: 2500,
              theme: "light",
              transition: Bounce,
            });
          }
          return;
        }

        const data = await res.json();
        setFetchedMajor(data);
        setDisableAddButton(false);
      } catch (err) {
        console.error("❌ خطای fetch:", err.message || err);
        setDisableAddButton(true);
        setFetchedMajor(null);
        toast.error("خطا در ارتباط با سرور!", {
          position: "top-right",
          autoClose: 2500,
          theme: "light",
          transition: Bounce,
        });
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchByCode();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [code, currentProgramData]);

  const handleAddMajorClick = () => {
    if (fetchedMajor) {
      setAddMajor(fetchedMajor);
      setCode("");
      setFetchedMajor(null);
      setDisableAddButton(true);

      toast.success("رشته با موفقیت اضافه شد!", {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
        transition: Bounce,
      });
    }
  };

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
      {closeable && (
        <Tooltip title="بستن">
          <Typography
            onClick={closeAdd}
            sx={{
              display: "inline-flex",
              width: "fit-content",
              alignSelf: "flex-end",
              alignItems: "center",
              gap: "3px",
              cursor: "pointer",
              padding: "5px",
            }}
          >
            <IconlyCloseSquare color="red" />
          </Typography>
        </Tooltip>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 3 }}>
        <Typography sx={{ flexShrink: 0 }}>کد رشته :</Typography>
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
              direction: "ltr",
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
          onClick={handleAddMajorClick}
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
            padding: "8px 15px",
            fontSize: "0.85rem",
          }}
        >
          <IconlyPlus
            color={disableAddButton ? "#5f5f5f" : "white"}
            size={20}
          />
          افزودن{" "}
        </Button>
      </Box>

      {isMajorAlreadyAdded && (
        <Typography color="error" sx={{ mr: 3, mt: 1 }}>
          این رشته قبلاً اضافه شده است!
        </Typography>
      )}

      {loading && <>در حال جستجو...</>}
      {fetchedMajor && !isMajorAlreadyAdded && (
        <Box
          mt={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
            opacity: 0.9,
            p: "0px -1px",
          }}
        >
          <Typography sx={{ width: "2%", textAlign: "center" }}></Typography>
          <Typography sx={{ width: "4%", textAlign: "center" }}></Typography>
          <Typography sx={{ width: "20%", textAlign: "center" }}>
            {fetchedMajor.uni_name}
          </Typography>
          <Typography sx={{ width: "20%", textAlign: "center" }}>
            {fetchedMajor.major}
          </Typography>
          <Typography sx={{ width: "10%", textAlign: "center" }}>
            {fetchedMajor.city?.name || "-"}
          </Typography>
          <Typography sx={{ width: "10%", textAlign: "center" }}>
            {fetchedMajor.city?.state?.name || "-"}
          </Typography>
          <Typography
            sx={{ width: "15%", fontSize: "0.8rem", textAlign: "center" }}
          >
            {fetchedMajor.major_type === "daytime" ? "روزانه" : "نیمسال‌دوم"}
          </Typography>
          <Typography sx={{ width: "5%", textAlign: "center" }}>
            {convertToPersianNumbers(fetchedMajor.code)}
          </Typography>
          <Typography sx={{ width: "10%", textAlign: "center" }}>
            {fetchedMajor.dorm ? "دارد" : "ندارد"}
          </Typography>
          <Typography
            sx={{
              overflow: "auto",
              width: "20%",
              fontSize: "0.75rem",
              textAlign: "center",
            }}
          >
            {fetchedMajor.description !== "nan" &&
            fetchedMajor.description !== null
              ? fetchedMajor.description
              : "-"}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
