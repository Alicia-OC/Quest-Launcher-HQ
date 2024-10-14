import React, { useState, useRef, useEffect } from "react";

function CreateRequirements(props) {
  const [requirements, setRequirements] = useState({
    value: "",
  });

  const inputRef = useRef(null);
  const spanRef = useRef(null);

  function handleChange(e) {
    const { value } = e.target;
    setRequirements((prevReq) => {
      return {
        ...prevReq,
        value,
      };
    });
  }

  function submitReq(e) {
    e.preventDefault();
    props.onAddReq(requirements);
    setRequirements({ value: "" });
  }

  useEffect(() => {
    if (inputRef.current && spanRef.current) {
      spanRef.current.textContent = requirements.value || " ";
      inputRef.current.style.width = `${spanRef.current.offsetWidth - 100}px`;
    }
  }, [requirements.value]);

  return (
    <div>
      <input
        className="attReqListInputs"
        ref={inputRef}
        type="text"
        value={requirements.value}
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
      <button className="generalButton" onClick={submitReq}>Add</button>
    </div>
  );
}

export default CreateRequirements;
