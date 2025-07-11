import React, { useEffect, useState } from "react";
import MajorDrawer from "./dashbord/MajorDrawer";
import Topbar from "./dashbord/Topbar";

import { Box } from "@mui/material";
import ChooseMajor from "./dashbord/ChooseMajor";
import { useAuth } from "../AuthProvider";

function PanelMajor() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    name: null,
    level: null,
    num_not: null,
    notifications: null,
  });
  const Auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        Auth.setLoading(true);
        const res = await fetch(
          "https://emeettest.pythonanywhere.com/get_user_data/",
          {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          sessionStorage.setItem("manager", data.name);
          setUser({
            name: data.name,
            level: data.level,
            num_not: data.num_notification,
            notifications: data.notification.reverse(),
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        Auth.setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        height: "auto",
        backgroundColor: "#F8F8F8",
        zIndex: 1,
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
          // zIndex: 9990,
          flexGrow: 1,
          marginBottom: "50px",
          paddingTop: "30px",
          display: "flex",
          px: "5px",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Topbar
          open={open}
          user={user}
          resetNote={() => setUser((p) => ({ ...p, num_not: 0 }))}
        />

        {active == 0 && <ChooseMajor open={open} />}
      </Box>
    </Box>
  );
}

export default PanelMajor;
