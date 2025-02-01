import React, { useState } from "react";
import {
  AppBar,
  Box,
  Typography,
  InputBase,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
  Person as PersonIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  direction: "ltr",
  typography: {
    fontFamily: "IranSans, Arial, sans-serif",
    fontSize: 12,
    h6: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "0.85rem",
    },
  },
});

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:768px)");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigate = useNavigate();
  function goHome() {
    return navigate("/login");
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#417fee",
          padding: "8px 16px",
          height: isMobile ? "auto" : "80px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "right",
              marginRight: isMobile ? "50px" : "10px",
              flexShrink: 0,
            }}
          >
            <a href="/" style={{ textDecoration: "none", color: "white" }}>
              لوگو
            </a>
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1500,
              }}
            >
              {drawerOpen ? (
                <CloseIcon sx={{ color: "#1976d2", fontSize: "28px" }} />
              ) : (
                <MenuIcon sx={{ color: "white", fontSize: "28px" }} />
              )}
            </IconButton>
          ) : (
            <Box
              sx={{
                display: "flex",
                gap: 5,
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <Typography variant="body1" sx={{ color: "white" }}>
                <a href="/" style={{ textDecoration: "none", color: "white" }}>
                  صفحه اصلی
                </a>
              </Typography>

              <Box sx={{ position: "relative", marginRight: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ color: "white", cursor: "pointer" }}
                  onClick={handleMenuClick}
                >
                  محصولات
                  <KeyboardArrowDownIcon
                    sx={{
                      marginLeft: "8px",
                      transition: "transform 0.3s",
                    }}
                  />
                </Typography>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "#1976d2",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <MenuItem onClick={handleCloseMenu} sx={{ color: "white" }}>
                    محصولات دسته اول
                  </MenuItem>
                  <MenuItem onClick={handleCloseMenu} sx={{ color: "white" }}>
                    محصولات دسته دوم
                  </MenuItem>
                  <MenuItem onClick={handleCloseMenu} sx={{ color: "white" }}>
                    محصولات دسته سوم
                  </MenuItem>
                </Menu>
              </Box>

              <Typography variant="body1" sx={{ color: "white" }}>
                <a href="/" style={{ textDecoration: "none", color: "white" }}>
                  خدمات ما
                </a>
              </Typography>

              <Typography variant="body1" sx={{ color: "white" }}>
                <a href="/" style={{ textDecoration: "none", color: "white" }}>
                  ارتباط با ما
                </a>
              </Typography>
            </Box>
          )}

          {/* جستجو و ورود */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 0.5 : 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: alpha("#34a8eb", 0.15),
                borderRadius: "4px",
                width: isMobile ? 150 : 200,
                height: isMobile ? 30 : 40,
                paddingLeft: 1,
                paddingRight: 1,
                "&:hover": {
                  backgroundColor: alpha("#34a8eb", 0.25),
                },
              }}
            >
              <InputBase
                placeholder="جستجو..."
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  color: "white",
                  fontSize: isMobile ? "0.75rem" : "1rem",
                  width: "100%",
                }}
              />
              <SearchIcon
                sx={{ color: "white", fontSize: isMobile ? "18px" : "24px" }}
              />
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "#1976d2",
                fontSize: isMobile ? "0.7rem" : "0.85rem",
                padding: isMobile ? "4px 8px" : "8px 16px",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
              onClick={goHome}
            >
              <PersonIcon
                sx={{ fontSize: isMobile ? "18px" : "24px", marginRight: 1 }}
              />
              <Typography variant="body1" sx={{ fontSize: "inherit" }}>
                ورود | ثبت‌نام
              </Typography>
            </Button>
          </Box>
        </Box>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }}>
          <List sx={{ marginTop: "50px", padding: "0 16px" }}>
            <ListItem>
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontSize: "1rem",
                }}
              >
                صفحه اصلی
              </a>
            </ListItem>
            <Divider />
            <ListItem>
              <a
                href="/products"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontSize: "1rem",
                }}
              >
                محصولات
              </a>
            </ListItem>
            <Divider />
            <ListItem>
              <a
                href="/services"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontSize: "1rem",
                }}
              >
                خدمات ما
              </a>
            </ListItem>
            <Divider />
            <ListItem>
              <a
                href="/contact"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontSize: "1rem",
                }}
              >
                ارتباط با ما
              </a>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
};

export default Navbar;
