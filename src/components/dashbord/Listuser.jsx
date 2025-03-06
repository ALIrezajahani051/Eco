import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  IconlyPlus,
  IconlyFilter,
  IconlyActivity,
  IconlyDelete,
  IconlySquare,
  IconlySearch,
  IconlyMoreSquare,
} from "../../../public/Icons";
import AddUser from "./AddUser";

const toPersianNumber = (number) => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number.toString().replace(/\d/g, (x) => persianNumbers[x]);
};

export default function Listuser() {
  const [item, setItem] = useState(null);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        position: "relative",
        justifyContent: "center",
      }}
    >
      {item == 0 && <AddUser setItem={setItem} />}
      {item == null && (
        <>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              variant="contained"
              onClick={() => setItem(0)}
              sx={buttonStyle}
            >
              <IconlyPlus color="white" size={20} />{" "}
              <Typography>افزودن</Typography>
            </Button>
            <Button
              variant="contained"
              onClick={() => setItem(1)}
              sx={buttonStyle}
            >
              <IconlyFilter color="white" size={20} />{" "}
              <Typography>ویرایش جمعی</Typography>
            </Button>
            <Button
              variant="contained"
              onClick={() => setItem(2)}
              sx={buttonStyle}
            >
              <IconlyActivity color="white" size={20} />{" "}
              <Typography>آمار</Typography>
            </Button>
            <Button
              variant="contained"
              onClick={() => setItem(3)}
              sx={excelButtonStyle}
            >
              <img src="/excel.png" width={25} alt="Excel" />
              <Typography>خروجی اکسل</Typography>
            </Button>
            <Button
              variant="contained"
              onClick={() => setItem(4)}
              sx={deleteButtonStyle}
            >
              <IconlyDelete color="white" size={20} />{" "}
              <Typography>حذف</Typography>
            </Button>

            <Box
              sx={{
                position: "absolute",
                left: 0,
                backgroundColor: "#F5F4FC",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <IconlySearch />
            </Box>
          </Box>
          <TableContainer
            sx={{
              paddingRight: "15px",
              direction: "ltr",
              height: "380px",
              overflowY: "auto",
              boxShadow: "none",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#003089",
                borderRadius: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
                borderRadius: "10px",
              },
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={headerStyle}>
                    <IconlySquare size={24} />
                  </TableCell>
                  <TableCell sx={headerStyle}>تصویر</TableCell>
                  <TableCell sx={headerStyle}>کدملی</TableCell>
                  <TableCell sx={headerStyle}>سمت</TableCell>
                  <TableCell sx={headerStyle}>نام</TableCell>
                  <TableCell sx={headerStyle}>نام خانوادگی</TableCell>
                  <TableCell sx={headerStyle}>موبایل</TableCell>
                  <TableCell sx={headerStyle}>نام کلاس</TableCell>
                  <TableCell sx={headerStyle}>آخرین فعالیت</TableCell>
                  <TableCell sx={headerStyle}></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "& td, & th": {
                        borderBottom: "2px dashed #c0c8d0",
                      },
                    }}
                  >
                    <TableCell>
                      <IconlySquare size={24} />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <img
                          src="/man.png"
                          width={50}
                          height={50}
                          style={{ marginRight: "0px" }}
                          alt="User"
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={rowStyle}>{toPersianNumber("12345677789")}</TableCell>
                    <TableCell sx={rowStyle}>مدیر</TableCell>
                    <TableCell sx={rowStyle}>علی</TableCell>
                    <TableCell sx={rowStyle}>رضایی</TableCell>
                    <TableCell sx={rowStyle}>{toPersianNumber("09121234567")}</TableCell>
                    <TableCell sx={rowStyle}>کلاس A</TableCell>
                    <TableCell sx={rowStyle}>{toPersianNumber("1400/02/01")}</TableCell>
                    <TableCell>
                      <IconlyMoreSquare size={20} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
}

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent:"center",
  gap: "8px",
  backgroundColor: "#003089",
  borderRadius: "10px",
  boxShadow: "none",
  padding: "8px 20px",
  fontSize: "16px",
  "&:hover": { boxShadow: "none" },
};

const excelButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#115C34",
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#C20000",
};

const headerStyle = {
  fontSize: "0.95rem",
  fontFamily: "BoldIran",
  textAlign: "center",
  fontWeight: "bold",
};

const rowStyle = {
  fontSize: "0.95rem",
  textAlign: "center",
};