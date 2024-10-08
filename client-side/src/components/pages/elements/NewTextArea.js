import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

function NewTextArea(props) {
  const defaultValue = props.defaultValue;
  console.log(defaultValue);
  const [text, setText] = useState();
  const [isNotEditable, setIsNotEditable] = useState(true);
  const [buttonIcon, setButtonIcon] = useState(true);
  const [showButtonIcon, setShowButtonIcon] = useState(faEdit);
  const [defGreet, setDefGreet] = useState(faEdit);


  function handleChange(e) {
    const { value } = e.target;
    setText(value);
    props.getText(value);
  }

  useEffect(() => {
    setDefGreet(defaultValue)
  }, [defaultValue]);

  function editInstructions(e) {
    e.preventDefault();
    setIsNotEditable(!isNotEditable);
    setButtonIcon(!buttonIcon);
    if (!buttonIcon) {
      setShowButtonIcon(faEdit);
    } else {
      setShowButtonIcon(faCheck);
    }
  }

  return (
    <>
      {" "}
      <textarea
        disabled={isNotEditable}
        name="textarea"
        rows="3"
        cols="90"
        defaultValue={defGreet}
        onChange={handleChange}
      ></textarea>
      <button onClick={(e) => editInstructions(e)}>
        <FontAwesomeIcon icon={showButtonIcon} />{" "}
      </button>
    </>
  );
}

export default NewTextArea;
