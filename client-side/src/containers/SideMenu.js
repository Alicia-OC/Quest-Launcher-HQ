import React, { useState } from "react";
import { Box, Divider } from "@mui/material";
import { useSelector } from "react-redux";

function UserSideMenu() {
  const user = useSelector((state) => state.user); //
  const favTemplates = useSelector((state) => state.user.favTemplates);
  let map;

  if (favTemplates) {
    map = favTemplates.map((item) => {
      return (
        <li key={item._id} id={item._id}>
          <a className="SideMenuLinks" href={"/Template/" + item._id}>
            {item.templateTitle.slice(0, 20)}...
          </a>
          <Divider />
        </li>
      );
    });
  }

  return (
    <Box>
      {" "}
      <p>Favorite templates:</p> <ul>{map}</ul>
    </Box>
  );
}

export default UserSideMenu;
