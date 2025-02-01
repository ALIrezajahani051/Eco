import React from "react";
import { Box, Card, Typography, Grid } from "@mui/material";
import {
  PersonOutline,
  ReportGmailerrorred,
  EventAvailable,
  Edit,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"IranSans", Arial, sans-serif',
  },
});

const FeatureBox = ({
  IconComponent,
  title,
  description,
  iconBgColor,
  iconColor,
}) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 3,
      textAlign: "center",
      backgroundColor: "#fafafa",
      borderRadius: "16px",
      height: "100%", 
      transition: "box-shadow 0.3s ease",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      },
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50px",
        height: "50px",
        borderRadius: "12px",
        backgroundColor: iconBgColor,
        marginBottom: 2,
      }}
    >
      {React.cloneElement(IconComponent, {
        sx: { fontSize: 32, color: iconColor },
      })}
    </Box>
    <Typography
      variant="h6"
      sx={{ color: "#333", fontWeight: "bold", marginBottom: 1 }}
    >
      {title}
    </Typography>
    <Typography variant="body2" sx={{ color: "#666" }}>
      {description}
    </Typography>
  </Card>
);

const Intro = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: { xs: 3, md: 6 }, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            fontSize: { xs: "24px", md: "32px" },
          }}
        >
          آشنایی با ما
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#777",
            marginBottom: 4,
            maxWidth: "600px",
            marginX: "auto",
            fontSize: { xs: "14px", md: "16px" },
          }}
        >
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است.
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <FeatureBox
              IconComponent={<PersonOutline />}
              title="پنل کاربری مدیر و معلم"
              description="لورم ایپسوم متن ساختگی است با تولید سادگی."
              iconBgColor="#f8f1e1"
              iconColor="#eaba54"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureBox
              IconComponent={<ReportGmailerrorred />}
              title="ثبت موارد انضباطی"
              description="لورم ایپسوم متن ساختگی است با تولید سادگی."
              iconBgColor="#f4e5e8"
              iconColor="#cc576a"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureBox
              IconComponent={<EventAvailable />}
              title="سامانه حضور و غیاب"
              description="لورم ایپسوم متن ساختگی است با تولید سادگی."
              iconBgColor="#e1eae5"
              iconColor="#5f9072"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureBox
              IconComponent={<Edit />}
              title="انتخاب رشته دانش آموزان"
              description="لورم ایپسوم متن ساختگی است با تولید سادگی."
              iconBgColor="#e8f3f9"
              iconColor="#1c6cb6"
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Intro;
