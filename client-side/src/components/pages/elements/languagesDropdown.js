import { React, useState } from "react";
import SelectLanguage from "./SelectLanguage";

const LanguageDropDown = (props) => {
  const [language, setLanguage] = useState();
  
  const handleChange = (event) => {
    console.log(event.target.value);
    setLanguage(event.target.value);
    props.getlanguage(event.target.value)
  };

  return (
    <div>
      <SelectLanguage
        label="Target language "
        value={language}
        onChange={handleChange}
      />
    </div>
  );
};

export default LanguageDropDown;
