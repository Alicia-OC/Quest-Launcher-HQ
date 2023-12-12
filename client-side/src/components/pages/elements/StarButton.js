import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

function StarButton(props) {
  const isStarred = props.isStarred;
  const [starred, setStarred] = useState(isStarred);

  function handleChange(e) {
    e.preventDefault();
    setStarred(!starred);
  }
  props.getStar(starred);

  return (
    <button onClick={(e) => handleChange(e)}>
      <FontAwesomeIcon icon={starred ? faStarSolid : faStarRegular} />
    </button>
  );
}

export default StarButton;
