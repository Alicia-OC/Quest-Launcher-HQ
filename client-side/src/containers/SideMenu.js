import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state";
import { setFavTemplates } from "../state";
import { mongoDB_Template } from "../apis";

function UserSideMenu() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);
  let favTemplates;
  const [hasError, setHasError] = useState(false);

  if (user !== null){
    favTemplates = user.favTemplates;
  }

  let favTemplatesArr = [];

  const getFavTemplates = async () => {
    Axios.get(mongoDB_Template + `/${user._id}/favTemplates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(setFavTemplates({ favTemplates: res.data }));
      })
      .catch((err) => {
        const error = err.response.data.message;
        if (error === "jwt expired") {
          console.log(error);
          setHasError(true);
          // dispatch(setLogout())
        }
      });
  };

  useEffect(() => {
    getFavTemplates();
  }, []);

  if (hasError) {
    dispatch(setLogout());
  }

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
