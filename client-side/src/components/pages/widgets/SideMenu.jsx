import React, { useState } from "react";
import GetTemplate from "../../../features/templates/GetTemplate";
import { Box, Typography, Divider } from "@mui/material";

function userSideMenu({userId}) {
  const templates = GetTemplate();
  let starredTemplates = [];
  if (templates) {
    for (let i = 0; i < templates.length; i++) {
      if (templates[i].favorite) {
        starredTemplates.push(templates[i]);
      }
    }
  }

  return (
 
      <Box>
        {" "}
        <p>Favorite templates</p>{" "}
        <ul>
          {starredTemplates.map((element) => (
            <li id={element._id}>
              <a className="" href={"/Template/" + element._id}>
                {element.templateTitle.slice(0, 20)}...
              </a>
              <Divider />
            </li>
          ))}
        </ul>
      </Box>
 
  );
}

export default userSideMenu;
