import { useState } from "react";

const TextAreaComponent = (props) => {
  const [instrucctionsButton, setInstrucctionsButton] = useState(false);
  const [instructionsArea, setInstructionsArea] = useState(false);

  function instructionsForm(e) {
    setInstrucctionsButton(!instrucctionsButton);
    setInstructionsArea(!instructionsArea);
    /**clears the text area when you click the remove button */
    if (instrucctionsButton) {
      document.getElementById("textArea").value = "";
      childToParent(e);
    }
    e.preventDefault();
  }

  function childToParent(e) {
    e.preventDefault();
    const value = document.getElementById("textArea").value;
    props.changeInstructions(value);
  }

  return (
    <div>
      {" "}
      <div className="instructionsSection">
        <button onClick={(e) => instructionsForm(e)} type="text">
          {instrucctionsButton ? "Remove instructions" : "Add instructions"}
        </button>
        <div>
          <textarea
            id="textArea"
            rows="4"
            cols="100"
            type="text"
            style={{
              display: instructionsArea ? "block" : "none",
            }}
            onKeyUp={(e) => {
              childToParent(e);
            }}
          ></textarea>
        </div>
      </div>{" "}
    </div>
  );
};

export default TextAreaComponent;
