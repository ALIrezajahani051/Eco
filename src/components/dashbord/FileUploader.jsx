import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Typography, Paper } from "@mui/material";

import { IconlyUpload, IconlyShow } from "../../../public/Icons";
const FileUploader = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept:
      "text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    maxSize: 5120000,
  });

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: "50px 10px",
          textAlign: "center",
          border: "2px dashed gray",
          borderRadius: "10px",
          backgroundColor: "#FFF",
          cursor: "pointer",
          transition: "0.4s ease-out",
          boxShadow: "none",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          "&:hover": { borderColor: "#42a5f5", backgroundColor: "#e3f2fd" },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <IconlyUpload size={50} />
        <Typography variant="h6" sx={{ mt: 1, fontFamily: "IranSans" }}>
          فایل خود را انتخاب کنید و یا اینجا رها کنید
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: "12px", fontFamily: "Regular" }}
        >
          *حداکثر حجم فایل 5 مگابایت
        </Typography>

        {files.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle1">فایل‌های انتخاب شده:</Typography>
            {files.map((file) => (
              <Typography key={file.path} variant="body2">
                {file.name} - {Math.round(file.size / 1024)} KB
              </Typography>
            ))}
          </Box>
        )}
      </Paper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontFamily: "Bold", fontSize: "15px" }}>
          نکات مهم برای بارگذاری فایل اکسل:
        </Typography>

        <Typography
          sx={{
            fontSize: "13px",
            color: "#417fee",
            display: "flex",
            alignItems: "center",
            gap: "3px",
          }}
        >
          <IconlyShow color="#417fee" size={20} />
          <a
            href="/sample.xlsx"
            download=""
            style={{ textDecoration: "none", color: "inherit" }}
          >
            نمونه فایل اکسل
          </a>
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "13px" }}>
        - کدملی و شماره همراه باید به صورت لاتین وارده شده باشد .{" "}
      </Typography>

      <Typography sx={{ fontSize: "13px" }}>
        - رمز عبور به صورت فارسی نباشد .{" "}
      </Typography>

      <Typography sx={{ fontSize: "13px" }}>
        - رمز عبور به صورت فارسی نباشد و حداقل ۶ کارکتر باشد .{" "}
      </Typography>

      <Button
        sx={{
          width: "100%",
          backgroundColor: "#417fee",
          color: "white",
          borderRadius: "10px",
          padding: "12px 20px",
        }}
      >
        بارگذاری و تایید
      </Button>
    </>
  );
};

export default FileUploader;
