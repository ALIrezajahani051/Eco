import React, { useState } from "react";
import Dashboard from "./dashbord/Dashboard";
import Drawer from "./dashbord/Drawer";
import Topbar from "./dashbord/Topbar";
import Users from "./dashbord/Users";

import { Box } from "@mui/material";

function Panel() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "auto", backgroundColor: "#F5F4FC" }}>
      <Drawer
        open={open}
        setOpen={setOpen}
        active={active}
        setActive={setActive}
      />

      <Box
        sx={{
          flexGrow: 1,
          marginRight: "10px",
          marginBottom: "20px",
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
      </Box>
    </Box>
  );
}

export default Panel;
