import React, { useState, useRef, useEffect } from "react";

function CreateAttachment(props) {
  const oldAttachments = props.itemsFromTemplate;

  const [attachments, setAttachments] = useState({
    value: "",
  });

  const inputRef = useRef(null);
  const spanRef = useRef(null);

  function handleChange(e) {
    const { value } = e.target;
    setAttachments((prevAttachment) => {
      return {
        ...prevAttachment,
        value,
      };
    });
  }

  function submitAttachment(e) {
    e.preventDefault();
    props.onAddAtt(attachments);
    setAttachments({ value: "" });
  }

  useEffect(() => {
    if (inputRef.current && spanRef.current) {
      spanRef.current.textContent = attachments.value || " ";
      inputRef.current.style.width = `${spanRef.current.offsetWidth - 100}px`;
    }
  }, [attachments.value]);

  return (
    <div>
      <input
        className="attReqListInputs"
        ref={inputRef}
        type="text"
        value={attachments.value}
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
      <button className="generalButton" onClick={submitAttachment}>
        Add
      </button>
    </div>
  );
}

export default CreateAttachment;
