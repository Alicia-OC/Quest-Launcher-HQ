import {GetLanguages} from "./fetchLanguages";

const LanguagesDropDown = () => {
  let DB_languages = GetLanguages();
  let languagesMapped;
  let result;
  const newLanguagesButtonClicked = (e) => {
    e.preventDefault();
    let selectElement = document.querySelector("#languagesDropdown");
    let languageValue =
      selectElement.options[selectElement.selectedIndex].value;
    console.log(languageValue);
    
  };

  if (DB_languages) {
    result = DB_languages.map((lang) => (
      <option id={lang._id} value={lang.language}>
        {lang.language}
      </option>
    ));
  }
  let content = (
    <div className="AddLanguageButton">
      <select id="languagesDropdown">{result}</select>
      <button onClick={(e) => newLanguagesButtonClicked(e)}>Add</button>
    </div>
  );

  return content;
};
export default LanguagesDropDown;
