import React, { useState, useRef, useEffect } from "react";

function NewInput(props) {
  const placeholder = props.placeholder;
  const [input, setInput] = useState(props.parentData);
  const inputRef = useRef(null);
  const spanRef = useRef(null);

  function handleChange(e) {
    const { value } = e.target;
    setInput(value);
    props.getInput(value);
  }

  useEffect(() => {
    if (inputRef.current && spanRef.current) {
      spanRef.current.textContent = input || " ";
      inputRef.current.style.width = `${spanRef.current.offsetWidth - 100}px`;
    }
  }, [input]);

  return (
    <>
      <input
        className="expandableGeneralInput"
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <span
        className="expandableGeneralInputSpan"
        ref={spanRef}
        style={{
          visibility: "hidden",
          whiteSpace: "pre",
          position: "absolute",
        }}
      ></span>
    </>
  );
}

export default NewInput;
