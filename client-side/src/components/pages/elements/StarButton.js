import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import Axios from "axios";
import { mongoDB_Template } from "../../../apis";
import { useEffect } from "react";

function StarButton(props) {
  const isStarred = props.isStarred;
  const id = props.getId;
  const [starred, setStarred] = useState(isStarred);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (isUpdated) {
      Axios.patch(mongoDB_Template + `/${id}`, { id: id, favorite: starred })
        .then((response) => console.log(response.data))
        .catch((error) => console.error(error));
    }
  }, [starred]);

  const handleChange = (e) => {
    e.preventDefault();
    setStarred(!starred);
    setIsUpdated(true);
  };

  return (
    <button onClick={(e) => handleChange(e)}>
      <FontAwesomeIcon icon={starred ? faStarSolid : faStarRegular} />
    </button>
  );
}

export default StarButton;
