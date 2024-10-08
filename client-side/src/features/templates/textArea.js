import React, { useState } from "react";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 

const TextAreaComponent = (props) => {
  const [instructionsVisible, setInstructionsVisible] = useState(false);
  const [instructionsValue, setInstructionsValue] = useState("");

  function toggleInstructions() {
    setInstructionsVisible((prev) => !prev);
    // Clear instructions if hiding the editor
    if (instructionsVisible) {
      setInstructionsValue(""); 
      props.changeInstructions(""); 
    } else {
      props.changeInstructions(instructionsValue); 
    }
  }

  function handleChange(value) {
    setInstructionsValue(value); 
    props.changeInstructions(value); // Notify parent of the change
    console.log(value);
  }

  return (
    <div>
      <div className="instructionsSection">
        <button onClick={toggleInstructions} type="button">
          {instructionsVisible ? "Remove instructions" : "Add instructions"}
        </button>
        {instructionsVisible && (
          <ReactQuill
            value={instructionsValue}
            onChange={handleChange} 
            placeholder="Type your instructions here..."
          />
        )}
      </div>
    </div>
  );
};

export default TextAreaComponent;
