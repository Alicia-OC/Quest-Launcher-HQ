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
      <input className="Input_50" onChange={handleChange} placeholder="Add as many as you want!" />
      <button onClick={submitReq}>Add</button>
    </>
  );
}

export default CreateItems;
