import React, { useEffect } from "react";
import GetTemplate from "../features/templates/GetTemplate";
import { Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { setFavTemplates } from "../state";
import { mongoDB_Template } from "../apis";

function UserSideMenu() {
  const templates = GetTemplate();

  const dispatch = useDispatch();

  let starredTemplates = [];

  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);
  const favTemplates = user.favTemplates;

  const getFavTemplates = async () => {
    Axios.get(mongoDB_Template + `/${user._id}/favTemplates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const data = res.data;
        dispatch(setFavTemplates({ favTemplates: data }));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getFavTemplates();
  }, []);

  if (favTemplates !== null) {
    for (let i = 0; i < favTemplates.length; i++) {
      starredTemplates.push(favTemplates[i]);
    }
  } else {
  }

  return (
    <Box>
      {" "}
      <p>Favorite templates</p>{" "}
      <ul>
        {favTemplates.map((element) => (
          <li key={element._id} id={element._id}>
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

export default UserSideMenu;
