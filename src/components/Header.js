import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GppGoodIcon from "@mui/icons-material/GppGood";

import "./header.css";

const Header = ({ onMenuClick }) => {
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.fname || "Зочин";

  // Generate initials from name
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <AppBar
      position="static"
      elevation={0}
      className="header-appbar"
    >
      <Toolbar className="header-toolbar">
        {/* Hamburger Menu Icon */}
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>

        <Box className="header-right">
          <Box className="user-info">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Box className="user-status-badge">
                  <GppGoodIcon style={{ fontSize: 12 }} />
                </Box>
              }
            >
              <Avatar className="user-avatar">{initials}</Avatar>
            </Badge>
            <Typography variant="subtitle1" fontWeight="bold">
              {userName}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
