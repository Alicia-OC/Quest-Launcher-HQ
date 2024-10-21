import React, { useState } from "react";
import { Box, Divider, Typography, List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogOut from "../features/auth/LogOut";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DraftsIcon from "@mui/icons-material/Drafts";

function UserSideMenu() {
  const user = useSelector((state) => state.user); //
  const favTemplates = useSelector((state) => state.user.favTemplates);
  let map;

  if (favTemplates) {
    map = favTemplates.map((item) => {
      return (
        <ListItemButton
          sx={{
            paddingLeft: 4,
            paddingRight: 1,
            paddingTop: 0.5,
            paddingBottom: 1,
          }}
        >
          <a href={"/Template/" + item._id}>{item.title.slice(0, 20)}...</a>
        </ListItemButton>
      );
    });
  }
  return (
    <Box
      className="sideContainer"
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <List component="nav">
        <ListItemButton sx={{ paddingLeft: 3 }}>
          <DraftsIcon className="drafts-icon" />
          <ListItemText primary={<Link to="/NewRequest">New Request</Link>} />
        </ListItemButton>

        <ListItemButton sx={{ paddingLeft: 3 }}>
          <DraftsIcon className="drafts-icon" />
          <ListItemText primary={<Link to="/NewTemplate">New Template</Link>} />
        </ListItemButton>
      </List>

      <Divider />
      <div>
        <ListItem>
          <ListItemText
            primary={
              <Typography fontWeight="bold">Favorite templates:</Typography>
            }
          />
        </ListItem>
        <div className="fav-templates-side-menu">{map}</div>
        <Box className="logout-box">
          <LogOut />
        </Box>
      </div>
    </Box>
  );
}

export default UserSideMenu;
