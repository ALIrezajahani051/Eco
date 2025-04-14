import React, { useState } from "react";
import MajorDrawer from "./dashbord/MajorDrawer";
import Topbar from "./dashbord/Topbar";

import { Box } from "@mui/material";
import ChooseMajor from "./dashbord/ChooseMajor";

function PanelMajor() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        height: "auto",
        backgroundColor: "#F5F4FC",
      }}
    >
      <MajorDrawer
        open={open}
        setOpen={setOpen}
        active={active}
        setActive={setActive}
      />

      <Box
        sx={{
          zIndex: 1,
          flexGrow: 1,
          // marginRight: "10px",
          marginBottom: "50px",
          paddingTop: "30px",
          display: "flex",
          px:"5px",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Topbar open={open} />

        {active == 0 && <ChooseMajor open={open} />}
      </Box>
    </Box>
  );
}

export default PanelMajor;
