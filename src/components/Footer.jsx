import React from "react";
import "./Footer.css";
import { Fab } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function Footer() {
  // تابع برای اسکرول به بالا
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="py-8 px-4 text-gray-800 relative"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      {/* دکمه اسکرول به بالا */}
      <Fab
        onClick={scrollToTop}
        color="primary"
        aria-label="scroll to top"
        style={{
          top: "-20px", // فاصله از بالای فوتر
          right: "20px", // فاصله از راست فوتر
          zIndex: 1000,
        }}
      >
        <ArrowUpwardIcon />
      </Fab>

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Footer/wave.svg')" }}
      >
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {/* توضیحات */}
          <div className="relative mb-8 text-right">
            <h1 className="mb-4" style={{ fontWeight: "bold" }}>
              Logo
            </h1>
            <div className="absolute -left-4 top-0 w-3 h-3 bg-blue-500 rounded-full"></div>
            <p className="text-sm mb-4">
              لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ و با استفاده از
              طراحان گرافیک است.
            </p>
            <div className="flex justify-start gap-4 mt-8">
              <div className="social-icons">
                <a href="#whatsapp" className="social-icon whatsapp-icon">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="#facebook" className="social-icon facebook-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#instagram" className="social-icon instagram-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#twitter" className="social-icon twitter-icon">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>

          {/* دسترسی سریع */}
          <div className="relative mb-8 text-right">
            <h4 className="text-lg font-bold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm mb-6 m-2 ">
              {" "}
              {/* اضافه کردن فاصله بیشتر */}
              <li>
                <a href="#home" className="hover:text-blue-600 ">
                  صفحه اصلی
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-blue-600">
                  فروشگاه
                </a>
              </li>
              <li>
                <a href="#select-major" className="hover:text-blue-600">
                  انتخاب رشته
                </a>
              </li>
              <li>
                <a href="#user-panel" className="hover:text-blue-600">
                  پنل کاربری
                </a>
              </li>
            </ul>
          </div>

          {/* لینک‌های مهم */}
          <div className="relative mb-8 text-right">
            <h4 className="text-lg font-bold mb-4">لینک‌های مهم</h4>
            <ul className="space-y-2 text-sm mb-6  m-2">
              {" "}
              {/* اضافه کردن فاصله بیشتر */}
              <li>
                <a href="#consulting" className="hover:text-blue-600">
                  مشاوره
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-600">
                  خدمات ما
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-600">
                  تماس با ما
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-600">
                  درباره ما
                </a>
              </li>
            </ul>
          </div>

          {/* نماد اعتماد */}
          <div className="flex flex-col relative mb-8">
            <h4 className="text-lg font-bold mb-4">نماد اعتماد</h4>
            <div className="flex gap-4">
              <img
                src="../public/Footer/kasbokar.webp"
                alt="Samandehi"
                className="icon-size"
              />
              <img
                src="../public/Footer/logo.png"
                alt="Payment Logo"
                className="icon-size"
              />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm text-gray-400">
          کلیه حقوق محصولات و محتوای سایت متعلق به{" "}
          <span className="font-bold">EcoKonkour</span> می‌باشد و هر گونه کپی
          برداری پیگرد قانونی دارد.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
