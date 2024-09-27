import React, { useState } from "react";

function CreateAttachment(props) {
  const [attachment, setAttachment] = useState({
    value: "",
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
      <form className="create-attachment">
        <input
          value={attachment.value}
          onChange={handleChange}
          placeholder="Write something here"
        />
        <button onClick={submitAttachment}>Add</button>
      </form>
    </div>
  );
}

export default CreateAttachment;
