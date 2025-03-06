import React, { useEffect, useState } from "react";
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
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  IconlyPlus,
  IconlyDelete,
  IconlySquare,
  IconlySearch,
  IconlyMoreSquare,
} from "../../../public/Icons"; // فرض بر این است که آیکون‌ها از این مسیر import می‌شوند
import AddClassificationteacher from "./AddClassificationteacher";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme({
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

const teachers = [
  {
    firstName: "علیرضا",
    lastName: "کریمی",
    className: "۷/۲",
    subject: "ریاضی",
  },
  {
    firstName: "سعید",
    lastName: "احمدی",
    className: "۸/۱",
    subject: "فیزیک",
  },
  ,
  {
    firstName: "سعید",
    lastName: "احمدی",
    className: "۸/۱",
    subject: "فیزیک",
  },
  ,
  {
    firstName: "سعید",
    lastName: "احمدی",
    className: "۸/۱",
    subject: "فیزیک",
  },
  {
    firstName: "مریم",
    lastName: "جعفری",
    className: "۹/۳",
    subject: "زبان انگلیسی",
  },
  {
    firstName: "زهرا",
    lastName: "حسینی",
    className: "۱۰/۱",
    subject: "شیمی",
  },
  {
    firstName: "حسن",
    lastName: "محمدی",
    className: "۱۱/۲",
    subject: "تاریخ",
  },
];

const Classificationteacher = () => {
  const [item, setItem] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          position: "relative",
          justifyContent: "center",
        }}
      >
        {item == 0 && <AddClassificationteacher setItem={setItem} />}
        {item == null && (
          <>
            <Box>
              <Box sx={{ display: "flex", gap: 3 }}>
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
                  sx={deleteButtonStyle}
                >
                  <IconlyDelete color="white" size={20} />{" "}
                  <Typography>حذف</Typography>
                </Button>
              </Box>
            </Box>

            <TableContainer
              component={Paper}
              sx={{
                paddingRight: "20px",
                direction: "ltr",
                height: "380px",
                overflowY: "scroll",
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
                    <TableCell sx={{ ...headerStyle }}>
                      <IconlySquare size={24} />
                    </TableCell>
                    <TableCell sx={{ ...headerStyle }}>نام</TableCell>
                    <TableCell sx={{ ...headerStyle }}>نام خانوادگی</TableCell>
                    <TableCell sx={{ ...headerStyle }}>نام کلاس</TableCell>
                    <TableCell sx={{ ...headerStyle }}>نام درس</TableCell>
                    <TableCell sx={{ ...headerStyle }}></TableCell>
                    <TableCell sx={{ ...headerStyle }}></TableCell>

                    <TableCell sx={{ ...headerStyle }}></TableCell>
                    <TableCell sx={{ ...headerStyle }}></TableCell>
                    <TableCell sx={{ ...headerStyle }}></TableCell>
                    <TableCell sx={{ ...headerStyle }}></TableCell>
                    <TableCell sx={{ ...headerStyle }}></TableCell>
                  </TableRow>
                </TableHead>
                {loading && (
                  <>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "16px",
                        gap: 1,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      در حال بارگذاری <CircularProgress size={28} />
                    </Typography>
                  </>
                )}
                {!loading && (
                  <>
                    <TableBody>
                      {teachers.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "& td": {
                              borderBottom: "2px dashed #c0c8d0",
                            },
                          }}
                        >
                          <TableCell sx={{ ...bodyStyle }}>
                            <IconlySquare size={24} />
                          </TableCell>
                          <TableCell sx={{ ...bodyStyle }}>
                            {row.firstName}
                          </TableCell>
                          <TableCell sx={{ ...bodyStyle }}>
                            {row.lastName}
                          </TableCell>
                          <TableCell sx={{ ...bodyStyle }}>
                            {row.className}
                          </TableCell>
                          <TableCell sx={{ ...bodyStyle }}>
                            {row.subject}
                          </TableCell>
                          <TableCell sx={{ ...headerStyle }}></TableCell>
                          <TableCell sx={{ ...headerStyle }}></TableCell>
                          <TableCell sx={{ ...headerStyle }}></TableCell>
                          <TableCell sx={{ ...headerStyle }}></TableCell>
                          <TableCell sx={{ ...headerStyle }}></TableCell>
                          <TableCell sx={{ ...headerStyle }}></TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row-reverse",
                              }}
                            >
                              {" "}
                              <IconlyMoreSquare size={20} />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </>
                )}
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Classificationteacher;

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  backgroundColor: "#003089",
  borderRadius: "10px",
  boxShadow: "none",
  padding: "10.5px 20px",
  fontSize: "16px",
  "&:hover": { boxShadow: "none" },
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#C20000",
};

const headerStyle = {
  fontFamily: "BoldIran",
  textAlign: "center",
  fontWeight: "bold",
};

const bodyStyle = {
  textAlign: "center",
  fontFamily: "IranSans",
};
