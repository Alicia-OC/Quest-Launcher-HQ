import { React, useState, useEffect } from "react";
import Axios from "axios";
import { mongoDB_Template } from "../../../apis";
import GetFavTemplates2 from "../../../features/templates/GetFavTemplates";
import { setFavTemplates } from "../../../state";
import { useDispatch, useSelector } from "react-redux";

import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

function StarButton(props) {
  const isStarred = props.isStarred;
  const id = props.getId;
  const isToUpdateBackend = props.isToUpdateBackend;
  const [starred, setStarred] = useState(isStarred);
  const [isUpdated, setIsUpdated] = useState(false);

  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);


  useEffect(() => {
    if (isUpdated && isToUpdateBackend) {
      updateDB();
      UpdateFavs();
      setIsUpdated(false); 
    }
  }, [starred, isUpdated, isToUpdateBackend]);

  const UpdateFavs = async () => {

    console.log(user.favTemplates);

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
          // dispatch(setLogout())
        }
      });
  };

  const updateDB = async () => {
    console.log({ id: id, favorite: starred });

    if (isToUpdateBackend) {
      Axios.patch(
        mongoDB_Template + `/${id}`,
        { id: id, favorite: starred },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => console.log(response.data))
        .catch((error) => console.error(error));
      return true;
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setStarred(!starred);
    setIsUpdated(true);
  };

  return (
    <button onClick={(e) => handleChange(e)} className="btnStarTemplateList">
      {starred ? (
        <StarIcon style={{ fontSize: "1rem" }} />
      ) : (
        <StarBorderOutlinedIcon style={{ fontSize: "1rem" }} />
      )}
    </button>
  );
}

export default StarButton;
