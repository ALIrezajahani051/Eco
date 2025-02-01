import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const ContactSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      sx={{
        position: "relative",
        padding: { xs: "50px 20px", md: "100px" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
        fontFamily: "IranSans, Arial, sans-serif",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: isMobile ? "20%" : isTablet ? "15%" : "10%",
          left: isMobile ? "35%" : isTablet ? "40%" : "45%",
          width: isMobile ? "120px" : isTablet ? "160px" : "200px",
          height: isMobile ? "120px" : isTablet ? "160px" : "200px",
          backgroundColor: "rgba(0, 112, 243, 0.1)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      ></Box>

      <Box
        sx={{
          position: "absolute",
          bottom: isMobile ? "10%" : "5%",
          right: isMobile ? "10%" : "0%",
          zIndex: 0,
        }}
      >
        <svg
          width={isMobile ? "120" : isTablet ? "160" : "200"}
          height={isMobile ? "90" : isTablet ? "120" : "150"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="circlePattern"
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="6" cy="6" r="3.5" fill="rgba(0, 112, 243, 0.1)" />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width={isMobile ? "120" : isTablet ? "160" : "200"}
            height={isMobile ? "90" : isTablet ? "120" : "150"}
            fill="url(#circlePattern)"
          />
        </svg>
      </Box>

      <Grid container spacing={5} alignItems="center" sx={{ zIndex: 1 }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="/Contact/office.jpg"
            alt="دفتر مشاوره"
            sx={{
              width: "100%",
              maxWidth: "700px",
              height: "auto",
              borderRadius: "20% 0 20% 0",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: 0, md: "40px" } }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "right",
              fontFamily: "IranSans",
            }}
          >
            تماس و ارتباط با مشاورین ما
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "right",
              lineHeight: 1.8,
              marginBottom: "20px",
              fontFamily: "IranSans",
              color: "#555",
            }}
          >
            در صورتی که نیاز به کسب اطلاعات بیشتری دارید از قسمت درخواست
            پشتیبانی می‌توانید سوالات خود را مطرح نمایید و یا با شماره‌های
            پشتیبانی تماس بگیرید. برای اطلاعات تماس بیشتر از طریق دکمه زیر اقدام
            نمایید.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgba(33,192,90,255)",
              fontWeight: "bold",
              fontSize: "16px",
              fontFamily: "IranSans",
              "&:hover": {
                backgroundColor: "rgba(33,192,90,0.8)",
              },
            }}
            size="large"
          >
            09136687365
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactSection;
