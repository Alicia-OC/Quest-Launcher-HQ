import React, { useState } from "react";

function NewInput(props) {
  const placeholder = props.placeholder;
  const [input, setInput] = useState();

  function handleChange(e) {
    const { value } = e.target;
    setInput(value);
    props.getInput(value);
  }

  return <input placeholder={placeholder} onChange={handleChange} type="text"></input>;
}

export default NewInput;
