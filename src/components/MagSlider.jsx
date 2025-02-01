import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";
import { Person, ForumOutlined } from "@mui/icons-material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const SlideProduct = () => {
  const getPersianDate = (day, month, year) => {
    const months = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
    return `${day} ${months[month - 1]} ${year}`;
  };

  const magazines = Array.from({ length: 15 }, (_, index) => {
    const randomDay = Math.ceil(Math.random() * 30);
    const randomMonth = Math.ceil(Math.random() * 12);
    const randomYear = 1402 + Math.floor(Math.random() * 2);
    return {
      image: `https://via.placeholder.com/300x400/${Math.floor(
        Math.random() * 16777215
      ).toString(16)}/fff?text=Product+${index + 1}`,
      title: `مقاله شماره ${index + 1}`,
      description:
        "در این کتاب با چیز های خوبی آشنا خواهید شد شما را به خواندن این کتاب دعوت میکنم",
      comments: Math.floor(Math.random() * 1000),
      author: "EcoKonkour",
      date: getPersianDate(randomDay, randomMonth, randomYear),
    };
  });

  return (
    <div style={{ padding: "50px", paddingTop: "0px", marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              width: "4px",
              background: "#007bff",
              borderRadius: "15%",
              height: "50px",
              marginLeft: "8px",
            }}
          ></span>
          <div style={{ textAlign: "right" }}>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#333",
                margin: "0",
              }}
            >
              مقالات{" "}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#888",
                margin: "0",
                marginTop: "4px",
              }}
            >
              اخبار اطلاع رسانی سایت{" "}
            </p>
          </div>
        </div>
        <a
          href="#"
          style={{
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          مشاهده تمام مقالات
          <span
            style={{
              marginRight: "8px",
              display: "inline-block",
            }}
          >
            <KeyboardBackspaceIcon />
          </span>
        </a>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1 }, // موبایل
          640: { slidesPerView: 2 }, // تبلت
          1024: { slidesPerView: 4 }, // دسکتاپ
        }}
      >
        {magazines.map((magazine, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                textAlign: "right",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                direction: "rtl",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <img
                src={magazine.image}
                alt={magazine.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  margin: "0",
                  padding: "0",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              <div
                style={{
                  backgroundColor: "#407eed",
                  color: "#fff",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  display: "inline-flex",
                  alignItems: "center",
                  margin: "16px 16px 8px auto",
                  fontSize: "12px",
                  fontWeight: "bold",
                  alignSelf: "flex-end",
                }}
              >
                <CalendarMonthIcon
                  style={{ fontSize: "16px", marginLeft: "5px" }}
                />
                {magazine.date}
              </div>
              <h3
                style={{
                  padding: "0 16px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#222",
                  textAlign: "right",
                }}
              >
                {magazine.title}
              </h3>
              <p
                style={{
                  padding: "16px",
                  fontSize: "14px",
                  color: "#666",
                  marginBottom: "10px",
                  textAlign: "right",
                }}
              >
                {magazine.description}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "12px",
                  color: "#888",
                  padding: "16px",
                  borderTop: "1px solid #eee",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Person
                    style={{
                      fontSize: "16px",
                      marginRight: "5px",
                    }}
                  />
                  <span style={{ color: "#555" }}>{magazine.author}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ForumOutlined
                    style={{
                      fontSize: "16px",
                      marginRight: "5px",
                      marginLeft: "5px",
                    }}
                  />
                  <span style={{ color: "#000" }}>{magazine.comments}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideProduct;
