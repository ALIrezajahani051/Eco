import React, { useEffect, useState } from "react";
import logo from "../../../public/logo.svg";

const toPersianNumber = (input) =>
  String(input).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const getAdmissionType = (type) => {
  if (type === "daytime") return "روزانه";
  if (type === "evening") return "نوبت دوم";
};

const getCurrentDateInPersian = () => {
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
  const now = new Date();
  const year = now.getFullYear() - 621;
  const month = months[now.getMonth()];
  const day = now.getDate();

  return `${toPersianNumber(day)} ${toPersianNumber(month)} ${toPersianNumber(
    year
  )}`;
};

const PrintMajors = () => {
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    const majorsData = sessionStorage.getItem("majorsData");
    if (majorsData) {
      setMajors(JSON.parse(majorsData));
    }

    document.title = "نتایج";
  }, []);

  if (!majors.length) {
    return <div>در حال بارگذاری داده‌ها...</div>;
  }

  const containerStyle = {
    fontFamily: "IranSans, sans-serif",
    fontSize: "11px",
    lineHeight: 1.6,
    width: "210mm", // عرض A4
    height: "297mm", // ارتفاع A4
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    direction: "rtl",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row-reverse",
    borderBottom: "1px solid black",
    paddingBottom: "6px",
    marginBottom: "10px",
  };

  const logoStyle = {
    width: "45px",
    height: "45px",
  };

  const userInfoStyle = {
    textAlign: "right",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  };

  const infoHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    fontSize: "10px",
    marginTop: "10px",
    marginBottom: "15px",
  };

  const tableStyle = {
    marginTop: "50px",
    width: "100%",
    borderCollapse: "collapse",
  };

  const thtdStyle = {
    border: "1px solid #333",
    padding: "4px 6px",
    textAlign: "center",
  };

  const thStyle = {
    ...thtdStyle,
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  };

  const footerStyle = {
    width: "100%",
    textAlign: "center",
    marginTop: "auto",
    fontSize: "9px",
    borderTop: " 1px solid ",
    paddingTop: " 5px",
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @page {
            size: A4;
            margin: 0mm;
          }

          body {
            margin: 0;
            padding: 0px;
            overflow: hidden;
          }
        `}
      </style>

      {/* Header */}
      <div style={headerStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="لوگو" style={logoStyle} />
          <div
            style={{ fontSize: "1rem", fontWeight: "bold", marginTop: "5px" }}
          >
            اکو
          </div>
        </div>
        <div style={userInfoStyle}>
          <div>نام مشاور: محمود دولتی</div>
          <div>تاریخ: {getCurrentDateInPersian()}</div> {/* تاریخ داینامیک */}
        </div>
      </div>

      {/* Info Header */}
      <div style={infoHeaderStyle}>
        <p>نام دانش‌آموز: محمد میرابی</p>
        <p>گروه: نظری - انسانی</p>
        <p>تعداد اولویت‌ها: {toPersianNumber(majors.length)}</p>
      </div>

      {/* Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ردیف</th>
            <th style={thStyle}>دانشگاه</th>
            <th style={thStyle}>استان</th>
            <th style={thStyle}>شهر</th>
            <th style={thStyle}>رشته</th>
            <th style={thStyle}>کد رشته</th>
            <th style={thStyle}>نوع پذیرش</th>
            <th style={thStyle}>توضیحات</th>
          </tr>
        </thead>
        <tbody>
          {majors.map((item, idx) => (
            <tr key={idx}>
              <td style={thtdStyle}>{toPersianNumber(idx + 1)}</td>
              <td style={thtdStyle}>{item.uni_name}</td>
              <td style={thtdStyle}>{item.province || "—"}</td>
              <td style={thtdStyle}>{item.city || "—"}</td>
              <td style={thtdStyle}>{item.major}</td>
              <td style={thtdStyle}>{toPersianNumber(item.code)}</td>
              <td style={thtdStyle}>{getAdmissionType(item.major_type)}</td>
              <td style={thtdStyle}>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div style={footerStyle}>تمامی حقوق محفوظ است &copy; ۱۴۰۴-۲۰۲۵</div>
    </div>
  );
};

export default PrintMajors;
