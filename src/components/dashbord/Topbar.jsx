import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Badge,
  IconButton,
} from "@mui/material";
import {
  IconlyArrowDown2,
  IconlyNotification,
  IconlySearch,
  IconlyCloseSquare,
} from "../../../public/Icons";
import FileUploader from "./FileUploader";
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

const Topbar = ({ open, user, resetNote }) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openNoti, setOpenNoti] = useState(false);
  const [openLevel, setOpenLevel] = useState(false);

  const readNotifications = async () => {
    const res = await fetch(
      "https://emeettest.pythonanywhere.com/read_notif/",
      {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "json/text",
        },
      }
    );

    if (res.ok) {
      console.log("OK read Notification");
      console.log(res);
      resetNote();
    }
  };

  useEffect(() => {
    if (openNoti == true) {
      readNotifications();
    }
  }, [openNoti]);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "white",
          width: "95%",
          height: isSmallScreen ? "auto" : "80px",
          borderRadius: "10px",
          display: "flex",
          padding: isSmallScreen ? "10px" : "20px",
          alignItems: "center",
          flexDirection: isSmallScreen ? "column" : "row",
          // gap: isSmallScreen ? "10px" : "30px",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={12} sm={3} md={2}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: isSmallScreen ? "center" : "flex-start",
            }}
          >
            <img
              src="/man.png"
              alt="User"
              style={{
                borderRadius: "10px",
                width: isSmallScreen ? "30px" : "50px",
                height: isSmallScreen ? "30px" : "50px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 0.8,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.4,
                  zIndex: 5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: isSmallScreen ? "0.8rem" : "0.98rem",
                    backgroundColor: "white",
                  }}
                >
                  {user.name}
                </Typography>
                <IconButton onClick={() => setOpenLevel((prev) => !prev)}>
                  <Box
                    sx={{
                      transform: openLevel ? "rotate(0deg)" : "rotate(90deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <IconlyArrowDown2 size={16} />
                  </Box>
                </IconButton>
              </Box>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  backgroundColor: "#5D6D7E",
                  color: "white",
                  width: "85px",
                  minHeight: "20px",
                  borderRadius: "5px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 4,
                  transform: !openLevel ? "translateY(0)" : "translateY(-30px)",
                  transition: "transform 0.3s ease",
                }}
              >
                {user.level}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />

        <Grid item xs={12} sm={4} md={8}>
          <Box
            sx={{
              width: open ? "550px" : "650px",
              height: "48px",
              backgroundColor: "#F8F8F8",
              borderRadius: "10px",
              display: "flex",
              padding: "12px",
              alignItems: "center",
              gap: "10px",
              margin: isSmallScreen ? "10px 0" : "0",
            }}
          >
            <IconlySearch color="gray" size={21} />
            <input
              type="text"
              placeholder="جستجو کنید"
              style={{
                fontFamily: "Regular",
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: isSmallScreen ? "0.8rem" : "15px",
                width: "100%",
              }}
            />
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid
          item
          xs={12}
          sm={3}
          md={2}
          sx={{
            display: "flex",
            justifyContent: isSmallScreen ? "center" : "flex-end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "48px",
              height: "48px",
              backgroundColor: "#F8F8F8",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpenNoti((p) => !p);
            }}
          >
            <Badge
              // badgeContent={user.notifications || 0}
              badgeContent={user.num_not}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.6rem",
                  minWidth: "16px",
                  height: "16px",
                  transform: "translate(25%, -25%)",
                },
              }}
            >
              <IconlyNotification size={25} />
            </Badge>

            {openNoti && (
              <Box
                sx={{
                  position: "absolute",
                  right: isSmallScreen ? "-50px" : "-250px",
                  top: "57px",
                  width: "300px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  px: 1,
                  py: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  zIndex: 90,
                  backdropFilter: "blur(8px)",
                  boxShadow: "0px 5px 15px rgba(0,0,0,0.15)",

                  "&::-webkit-scrollbar": {
                    display: "none",
                  },

                  "&:before": {
                    content: "''",
                    width: "15px",
                    height: "15px",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    position: "absolute",
                    top: "-7px",
                    borderRadius: "2px",
                    transform: " rotate(45deg)",
                    right: isSmallScreen
                      ? "calc(50% + 35px)"
                      : "calc(50% + 100px)",
                    zIndex: "-1",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    px: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "0.9rem", fontWeight: "bold" }}
                  >
                    اعلان ها
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{ p: 0.5 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenNoti(false);
                    }}
                  >
                    <IconlyCloseSquare size={20} />
                  </IconButton>
                </Box>
                <Divider sx={{ mb: 1 }} />
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  {user.notifications.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        backgroundColor:
                          index % 2 === 0
                            ? "rgba(52, 73, 94, 0.1)"
                            : "rgba(52, 73, 94, 0.05)",
                        width: "100%",
                        borderRadius: "5px",
                        minHeight: "50px",
                        p: 1.5,
                        display: "flex",
                        alignItems: "center",
                        "&:hover": {
                          backgroundColor: "rgba(52, 73, 94, 0.2)",
                        },
                      }}
                    >
                      <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                        {item.text}
                      </Typography>
                    </Box>
                  ))}
                  {(user.notifications === undefined ||
                    user.notifications === 0) && (
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        py: 2,
                      }}
                    >
                      No new notifications.
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Topbar;
