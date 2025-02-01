import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";
import { Group, Visibility } from "@mui/icons-material";
import { CRating } from "@coreui/react-pro";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const SlideProduct = () => {
  const products = Array.from({ length: 15 }, (_, index) => ({
    image: `https://via.placeholder.com/300x400/${Math.floor(
      Math.random() * 16777215
    ).toString(16)}/fff?text=Product+${index + 1}`,
    title: `کتاب روانشناسی برای تحصیل ${index + 1}`,
    description:
      "در این کتاب با چیز های خوبی آشنا خواهید شد شما را به خواندن این کتاب دعوت میکنم",
    views: Math.floor(Math.random() * 1000) + 500,
    target: "مخصوص دانش‌آموزان",
    rating: Math.floor(Math.random() * 5) / 2 + 1,
  }));

  return (
    <div
      style={{
        padding: "50px",
        paddingTop: "0px",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
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
              borderRadius: "10%",
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
              فروشگاه
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#888",
                margin: "0",
                marginTop: "4px",
              }}
            >
              محصولات وب‌سایت
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
          مشاهده تمام محصولات
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
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 }, 
          1024: { slidesPerView: 4 },    
        }}
      >
        {products.map((product, index) => (
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
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  margin: "0",
                  padding: "0",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              />
              <h3
                style={{
                  padding: "16px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  color: "#222",
                  textAlign: "right",
                }}
              >
                {product.title}
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
                {product.description}
              </p>

              <div
                style={{
                  padding: "16px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginTop: "10px",
                  fontSize: "14px",
                }}
              >
                <CRating
                  readOnly
                  value={product.rating}
                  max={5}
                  style={{
                    fontSize: "18px",
                  }}
                />
                <div
                  style={{
                    backgroundColor: "#407eed",
                    color: "#fff",
                    width: "24px",
                    height: "18px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "5px",
                    borderRadius: "20%",
                    fontSize: "12px",
                  }}
                >
                  {product.rating.toPrecision(2)}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "12px",
                  color: "#888",
                  borderTop: "1px solid #eee",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Visibility
                    style={{
                      fontSize: "16px",
                      marginRight: "5px",
                    }}
                  />
                  <span style={{ color: "#555" }}>{product.views} نفر</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Group
                    style={{
                      fontSize: "16px",
                      marginRight: "5px",
                      marginLeft: "5px",
                    }}
                  />
                  <span style={{ color: "#000", fontWeight: "bold" }}>
                    {product.target}
                  </span>
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
