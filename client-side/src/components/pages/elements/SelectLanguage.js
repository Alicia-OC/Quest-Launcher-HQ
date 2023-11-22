import { React, useState } from "react";
import { GetLanguages } from "../../../features/languagesList/fetchLanguages";

const SelectLanguage = ({ label, value, onChange }) => {
  const DB_languages = GetLanguages();

  if (DB_languages) {
    return (
      <>
        {label}
        <select value={value} onChange={onChange}>
          {DB_languages.map((language) => (
            <option
              value={language.language}
              langCode={language.languageCode}
              id={language._id}
            >
              {language.language}
            </option>
          ))}
        </select>
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default SelectLanguage;
