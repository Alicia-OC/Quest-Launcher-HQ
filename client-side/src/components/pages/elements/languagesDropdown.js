import { React, useState } from "react";
import { GetLanguages } from "../../../features/languagesList/fetchLanguages";

const LanguageDropDown = () => {
  const DB_languages = GetLanguages();
  let options2 = [];
  if (DB_languages) {
    DB_languages.map((lang) =>
      options2.push({
        id: lang._id,
        value: lang.language,
        codeLanguage: lang.languageCode,
      })
    );
  }

  const [language, setLanguage] = useState();
  const handleChange = (event) => {
    setLanguage(event.target.value);
  };
  return (
    <div>
      <Select
        label="Target language "
        options={options2}
        value={language}
        onChange={handleChange}
      />
    </div>
  );
};

const Select = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option
            value={option.value}
            langCode={option.codeLanguage}
            id={option.id}
          >
            {option.value}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageDropDown;
