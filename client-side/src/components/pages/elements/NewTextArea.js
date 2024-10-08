import React, { useState, useEffect } from "react";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 

function NewTextArea(props) {
  const defaultValue = props.defaultValue || ""; 
  const [text, setText] = useState(defaultValue);


  const handleChange = (value) => {
    setText(value); 
    props.getText(value); 
  };

  useEffect(() => {
    setText(defaultValue); 
  }, [defaultValue]);

  return (
    <>
      <ReactQuill
        value={text} 
        onChange={handleChange} 
        theme="snow" // Set theme
      />
      
    </>
  );
}

export default NewTextArea;
