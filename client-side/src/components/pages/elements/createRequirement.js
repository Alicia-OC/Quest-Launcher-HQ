import React, { useState } from "react";

function CreateRequirements(props) {
  const [requirement, setRequirements] = useState({
    content: "",
  });

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
    props.onAddReq(requirement);
    e.preventDefault();
  }

  return (
    <div>
      <form className="create-requirement">
        <input onChange={handleChange} placeholder="Write something here" />
        <button onClick={submitReq}>Add</button>
      </form>
    </div>
  );
}


export default CreateRequirements
