import React, { useState, useRef, useEffect } from "react";

function ExpandableInput(props) {
  const [content, setValue] = useState({
    value: "",
  });

  const inputRef = useRef(null);
  const spanRef = useRef(null);

  function handleChange(e) {
    const { value } = e.target;
    setValue(value);
  }

  useEffect(() => {
    if (inputRef.current && spanRef.current) {
      spanRef.current.textContent = content.value || " ";
      inputRef.current.style.width = `${spanRef.current.offsetWidth - 100}px`;
    }
  }, [content.value]);

  return (
    <>
      <input
        className="attReqListInputs"
        ref={inputRef}
        type="text"
        value={content.value}
        onChange={handleChange}
        placeholder="Write something here"
      />
      <span
        className="attReqListInputsSpan"
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

export default ExpandableInput;
