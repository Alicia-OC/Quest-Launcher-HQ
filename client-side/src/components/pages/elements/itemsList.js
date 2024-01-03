import React, { useState } from "react";

function CreateItems(props) {
  const [item, setItems] = useState([]);

  function handleChange(e) {
    const { value } = e.target;
    setItems((prevReq) => {
      return {
        ...prevReq,
        value,
      };
    });
  }

  function submitReq(e) {
    e.preventDefault();

    props.onAdd(item);
  }

  return (
    <>
      <input onChange={handleChange} placeholder="Write something here" />
      <button onClick={submitReq}>Add</button>
    </>
  );
}

export default CreateItems;
