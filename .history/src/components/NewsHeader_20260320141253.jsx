import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
const NewsHeader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>NewsFeed App</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NewsHeader;
