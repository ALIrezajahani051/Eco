import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";
import { Box, Button } from "@mui/material";
import logo from "../../../public/logo.png";
import SupportDialog from "./SupportDialog";
import "./Drawer.css";
import {
  IconlyArrowLeft2,
  IconlyBook2,
  IconlySupport,
  IconlyBook2Bold,
} from "../../../public/Icons";

const customTheme = createTheme({
  direction: "rtl",
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

export default function MajorDrawer({ active, setActive, open, setOpen }) {
  // const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const [openSupport, setOpenSupport] = useState(false);

  return (
    <ThemeProvider theme={customTheme}>
      <SupportDialog
        open={openSupport}
        onClose={() => {
          setOpenSupport(false);
        }}
      />
      <Drawer
        anchor="right"
        variant="permanent"
        sx={{
          width: open ? 200 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 200 : 60,
            boxSizing: "border-box",
            transition: customTheme.transitions.create("width", {
              easing: customTheme.transitions.easing.sharp,
              duration: open
                ? customTheme.transitions.duration.enteringScreen
                : customTheme.transitions.duration.leavingScreen,
            }),
            overflow: "visible",
            position: "relative",
            paddingBottom: "50px",
            border: "none",
            boxShadow: "none",
            height: "100%",
          },
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "#ffffff",
            position: "absolute",
            top: "15px",
            left: "-28px",
            zIndex: 1,
            WebkitBorderTopLeftRadius: "8px",
            WebkitBorderBottomLeftRadius: "8px",
            WebkitBorderTopRightRadius: "0px",
            WebkitBorderBottomRightRadius: "0px",
          }}
          onClick={handleDrawerToggle}
        >
          {open ? (
            <LoginIcon sx={{ fontSize: "15px", color: "black" }} />
          ) : (
            <LoginIcon
              sx={{
                fontSize: "15px",
                color: "black",
                transform: "rotate(180deg)",
              }}
            />
          )}
        </IconButton>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: open ? "10px" : "10px 0",
            transition: "padding 0.3s ease",
          }}
        >
          <img
            src={logo}
            style={{
              width: open ? "35px" : "35px",
              height: "auto",
              transition: "width 0.3s ease",
            }}
          />
        </Box>

        <Divider />

        <List>
          {[
            {
              label: "انتخاب رشته",
              icon: <IconlyBook2 />,
              iconbold: <IconlyBook2Bold />,
            },
          ].map((item, index) => (
            <ListItem
              button
              onClick={(e) => {
                setActive(index);
              }}
              key={item.label}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                textAlign: "right",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  outline: "2px solid #f0f0f0",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "50%",
                  minWidth: "30px",
                  height: "30px",
                }}
              >
                {active == index ? item.iconbold : item.icon}
              </Box>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  style: {
                    fontFamily: index == active ? "BoldIran" : "IranSans",
                  },
                }}
                sx={{
                  alignSelf: "center",
                  whiteSpace: "nowrap",
                  opacity: open ? 1 : 0,
                  transition: customTheme.transitions.create("opacity", {
                    easing: customTheme.transitions.easing.sharp,
                    duration: open
                      ? customTheme.transitions.duration.enteringScreen
                      : customTheme.transitions.duration.leavingScreen,
                  }),
                }}
              />

              {index != active && open && <IconlyArrowLeft2 size={15} />}
            </ListItem>
          ))}
        </List>
        <Button
          onClick={() => {
            setOpenSupport(true);
          }}
          className="BtnM"
          sx={{
            marginTop: "50px",
            minWidth: open ? "75%" : "15px",
            padding: open ? "8px" : "6px 8px",
            whiteSpace: "nowrap",
            alignSelf: "center",
            backgroundColor: "#34495E",
            "&:hover": {
              backgroundColor: "#34495E",
            },
          }}
          variant="contained"
        >
          {open ? (
            <>
              <IconlySupport /> پشتیبانی
            </>
          ) : (
            <IconlySupport />
          )}
        </Button>
      </Drawer>
    </ThemeProvider>
  );
}
