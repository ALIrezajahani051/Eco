import React, { useEffect, useState } from "react";
// import logo from "../../../public/logo.svg";

const toPersianNumber = (input) =>
  String(input).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const getAdmissionType = (type) => {
  if (type === "daytime") return "روزانه";
  if (type === "evening") return "نوبت دوم";
  if (type === "nighttime") return "نوبت دوم";
};

const PrintMajors = () => {
  const [majors, setMajors] = useState([]);
  const [student, setStudent] = useState(null);
  const [persianDate, setPersianDate] = useState("");
  const [logo, setLogo] = useState(null);
  useEffect(() => {
    setLogo(sessionStorage.getItem("printLogo"));
    const majorsData = sessionStorage.getItem("majorsData");
    setStudent(JSON.parse(sessionStorage.getItem("student")));
    if (majorsData) {
      setMajors(JSON.parse(majorsData));
    }

    document.title = "نتایج";

    fetch("https://api.keybit.ir/time/")
      .then((res) => res.json())
      .then((data) => {
        if (data?.date?.full) {
          setPersianDate(
            data.date.full.official.usual.fa + "  " + data.time12.full.short.fa
          );
        }
      })
      .catch((err) => {
        console.error("خطا در دریافت تاریخ:", err);
      });
  }, []);

  if (!majors.length) {
    return <div>در حال بارگذاری داده‌ها...</div>;
  }

  const containerStyle = {
    fontFamily: "IranSans, sans-serif",
    fontSize: "11px",
    lineHeight: 1.6,
    width: "210mm",
    height: "297mm",
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
    marginTop: "25px",
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
    backgroundColor: "#F5F5F5",
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
          <div>نام مشاور: {sessionStorage.getItem("manager")}</div>
          <div>تاریخ: {persianDate || "در حال دریافت تاریخ..."}</div>
        </div>
      </div>

      <div style={infoHeaderStyle}>
        <p>نام دانش‌آموز: {student.name}</p>
        <p>
          گروه: {["نظری-ریاضی", "نظری-تجربی", "نظری-انسانی"][student.field]}
        </p>
        <p>تعداد اولویت‌ها: {toPersianNumber(majors.length)}</p>
      </div>

      <div>
        <p>یادداشت:</p>
        <p>{sessionStorage.getItem("note") !="null" ? sessionStorage.getItem("note") : ""}</p>
      </div>

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
              <td style={thtdStyle}>{item.city.state.name || "-"}</td>
              <td style={thtdStyle}>{item.city.name || "-"}</td>
              <td style={thtdStyle}>{item.major}</td>
              <td style={thtdStyle}>{toPersianNumber(item.code)}</td>
              <td style={thtdStyle}>{getAdmissionType(item.major_type)}</td>
              <td style={thtdStyle}>
                {item.description !== "nan" ? item.description : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={footerStyle}>تمامی حقوق محفوظ است &copy; ۱۴۰۴-۲۰۲۵</div>
    </div>
  );
};

export default PrintMajors;
