import React, { useEffect, useState } from "react";
("./dashbord/Users");
import loadingAnimate from "../../public/loading.svg";
import { Box } from "@mui/material";

function Loading() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        minHeight: "auto",
        backgroundColor: "rgb(228, 224, 225,0.4)",
        zIndex: 9999,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={loadingAnimate} alt="" />
    </Box>
  );
}

export default Loading;
