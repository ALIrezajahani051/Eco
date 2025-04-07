import React, { useState } from "react";
import Dashboard from "./dashbord/Dashboard";
import Drawer from "./dashbord/Drawer";
import Topbar from "./dashbord/Topbar";
import Users from "./dashbord/Users";

import { Box } from "@mui/material";
import Checkabs from "./dashbord/Checkabs";
import Disciplinary from "./dashbord/Disciplinary";
import QuestionBank from "./dashbord/QuestionBank";
import ChooseMajor from "./dashbord/ChooseMajor";

function Panel() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{position:"relative", display: "flex", height: "auto", backgroundColor: "#F5F4FC" }}>
      <Drawer
        open={open}
        setOpen={setOpen}
        active={active}
        setActive={setActive}
      />

      <Box
        sx={{
          zIndex:1,
          flexGrow: 1,
          marginRight: "10px",
          marginBottom: "50px",
          paddingTop: "30px",
          display: "flex",
          paddingRight: "15px",
          paddingLeft: "15px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Topbar open={open} />
        {active == 0 && <Dashboard />}
        {active == 1 && <Users open={open} />}
        {active == 3 && <Checkabs open={open} />}
        {active == 2 && <Disciplinary open={open} />}
        {active == 10 && <QuestionBank open={open} />}
        {active == 12 && <ChooseMajor open={open} />}
      </Box>
    </Box>
  );
}

export default Panel;
