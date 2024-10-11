import React, { useState } from "react";

function CreateAttachment(props) {

    const oldAttachments = props.itemsFromTemplate

  const [attachment, setAttachment] = useState({
    value: oldAttachments,
  });

  function handleChange(e) {
    const { value } = e.target;
    setAttachment((prevAttachment) => {
      return {
        ...prevAttachment,
        value,
      };
    });
  }

  function submitAttachment(e) {
    e.preventDefault();
    props.onAdd(attachment);
    setAttachment({ value: "" });
  }

  return (
    <div>
        <input
        className="attReqListInputs"
          value={attachment.value}
          onChange={handleChange}
          placeholder="Write something here"
        />
        <button onClick={submitAttachment}>Add</button>

    </div>
  );
}

export default CreateAttachment;
