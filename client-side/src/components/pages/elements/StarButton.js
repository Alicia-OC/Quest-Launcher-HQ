import { React, useState, useEffect } from "react";
import Axios from "axios";
import { mongoDB_Template } from "../../../apis";

import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

function StarButton(props) {
  const isStarred = props.isStarred;
  const id = props.getId;
  const isToUpdateBackend = props.isToUpdateBackend;
  const [starred, setStarred] = useState(isStarred);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    updateDB();
  }, [starred]);

  const updateDB = async () => {
    if (isUpdated && isToUpdateBackend) {
      console.log(id);
      Axios.patch(mongoDB_Template + `/${id}`, { id: id, favorite: starred })
        .then((response) => console.log(response.data))
        .catch((error) => console.error(error));
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setStarred(!starred);
    setIsUpdated(true);
  };

  return (
    <button onClick={(e) => handleChange(e)}>
      {starred ? <StarIcon /> : <StarBorderOutlinedIcon />}
    </button>
  );
}

export default StarButton;
