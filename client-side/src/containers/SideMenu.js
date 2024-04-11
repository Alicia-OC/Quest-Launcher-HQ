import React, { useState } from "react";
import { Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { jwtDecode } from "jwt-decode";

function UserSideMenu() {
  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);
  const tokenExpiresAt = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);

  let favTemplates;
  const [hasError, setHasError] = useState(false);

  if (user !== null) {
    favTemplates = user.favTemplates;
  }

  let favTemplatesArr = [];

  const loop = () => {
    if (favTemplates) {
      for (let i = 0; i < favTemplates.length; i++) {
        favTemplatesArr.push(
          <li key={favTemplates[i]._id} id={favTemplates[i]._id}>
            <a className="" href={"/Template/" + favTemplates[i]._id}>
              {favTemplates[i].templateTitle.slice(0, 20)}...
            </a>
            <Divider />
          </li>
        );
      }
    }

    return favTemplatesArr;
  };

  return (
    <Box>
      {" "}
      <p>Favorite templates:</p> <ul>{loop()}</ul>
    </Box>
  );
}

export default UserSideMenu;
