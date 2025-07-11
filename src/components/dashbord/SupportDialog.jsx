import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { IconlyCall, IconlyTelegram } from "../../../public/Icons";

export default function SupportDialog({ open, onClose }) {
  const handleTelegramClick = () => {
    window.open("https://t.me/YourTelegramLink", "_blank");
  };

  const handlePhoneClick = () => {
    window.open("tel:+1234567890");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: "#18202a" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <SupportAgentIcon sx={{ color: "white" }} />
          <Typography variant="h6" fontWeight="bold" color="white">
            پشتیبانی{" "}
          </Typography>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Box textAlign="center" mb={3.5} mt={3}>
          <Avatar
            alt="Support"
            src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
            sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
          />
          <Typography variant="body1" mb={1}>
            برای دریافت پاسخ سریع، با تیم پشتیبانی ما تماس بگیرید.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ما در تلگرام، تلفن و ایمیل پاسخگوی شما هستیم.
          </Typography>
        </Box>

        <Box
          mt={2}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handleTelegramClick}
            sx={{
              p: "0px",
              backgroundColor: "transparent",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#34495E",
                p: "10px",
                borderRadius: "10px",
                ":hover": {
                  backgroundColor: "#18202a",
                },
              }}
            >
              <IconlyTelegram size={25} color="white" />
            </Box>
          </Button>

          <Button
            onClick={handlePhoneClick}
            sx={{
              backgroundColor: "transparent",
              p: "0px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#34495E",
                p: "10px",
                transition: "all 0.25s ease-in",
                borderRadius: "10px",

                ":hover": {
                  backgroundColor: "#18202a",
                },
              }}
            >
              <IconlyCall size={22} color="white" />
            </Box>
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
