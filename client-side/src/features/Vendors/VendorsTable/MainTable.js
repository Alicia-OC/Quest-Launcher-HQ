import { useState, useEffect } from "react";
import { GetProofreaders, GetTranslators } from "../_GetVendorsData";
import { baseLanguages2, baseLanguages } from "../../../apis";
import RemoveIcon from "@mui/icons-material/Remove";
import SelectLanguage from "../../../components/pages/elements/SelectLanguage";
import { GetFIGS, GetFIGSOBJ } from "../../languagesList/fetchLanguages";

const MainTable = (props) => {
  let requestService = props.service;
  let languagesFromTemplate = props.languages;

  const [additionalLanguage, setAdditionalLanguage] = useState();
  const [updateTable, setUpdateTable] = useState();
  const [additionalObjLanguage, setAdditionalObjLanguage] = useState();

  /**backend data */
  const translators = GetTranslators();
  const proofreaders = GetProofreaders();
  const figs = GetFIGS();

  const figsArr =
    Array.from(
      figs
    ); /**no idea why this isnt working, the .push in NewLanguagesButtonClicked
  doesn't push any item to this array */

  let this_handoff_added_lang = baseLanguages2;
  let this_handoff_added_lang_obj = baseLanguages

  let objectLangsAdded = []
  if (languagesFromTemplate) {
    this_handoff_added_lang = languagesFromTemplate;
  }

  /** 1. Stores in a const the language that triggered the delete function
   * 2. loops through the language array, looks for the object whose language is the same as the trigger
   *    and gives the var language the value of said object
   * 3. Looks for the index in this_handoff_added_lang for our new language variable
   * 4. deletes the object in this_handoff_added_langs
    5. calls the table to be rendered again so it refreshes as soon as the language has been deleted
   *
   */
  let HandleDelete = (e) => {
    e.preventDefault();
    const myValue = e.currentTarget.value;
    let language;
    for (let i = 0; i < this_handoff_added_lang.length; i++) {
      if (this_handoff_added_lang[i] === myValue) {
        language = this_handoff_added_lang[i];
      }
    }
    const index = this_handoff_added_lang.indexOf(language);
    if (window.confirm("Confirm")) {
      this_handoff_added_lang.splice(index, 1);
      setUpdateTable(RowContent(requestService));
    }
  };

  /** 1. Code for the dropdown of languages that can be added
   * 2. loops through all the languages stored in the database
   */

  const handleChange = (e) => {
    setAdditionalLanguage(e.target.value);

    const selectedOption = e.target.selectedOptions[0];
    const langCode = selectedOption.getAttribute("data-langcode");

    setAdditionalObjLanguage({ language: e.target.value, languageCode: langCode });
    //console.log(additionalObjLanguage);
    //console.log("Selected Language Code:", langCode);
  };

  const NewLanguagesButtonClicked = (e) => {
    e.preventDefault();

    if (!this_handoff_added_lang.includes(additionalLanguage)) {
      this_handoff_added_lang.push(additionalLanguage);
      objectLangsAdded.push(additionalObjLanguage)
      console.log(objectLangsAdded);

      setUpdateTable(RowContent(requestService));

      props.getLanguages(this_handoff_added_lang);
      console.log(this_handoff_added_lang); 
      //send language list to main component NewTemplate.jsx
    }
  };

  /**1. Function takes a language in scope as parameter, loops through the translators const,
   *    checks the vendors whose language is the same as the language parameter
   * 2. if there are finds, returns one HTML <option> per vendor found
   * 3. if there aren't, returns one HTML <option> with '??'
   */
  let translatorLoop = (language) => {
    let result;
    const vendorMapped = translators.filter(
      (vendor) => vendor.language === language
    );
    if (vendorMapped.length !== 0) {
      result = vendorMapped.map((vendor) => (
        <option value={vendor.nickname} id={vendor._id}>
          {vendor.nickname}
        </option>
      ));
    } else {
      result = <option>??</option>;
    }
    return result;
  };
  /**1. Function takes a language in scope as parameter, loops through the proofreader const,
   *    checks the vendors whose language is the same as the language parameter
   * 2. if there are finds, returns one HTML <option> per vendor found
   * 3. if there aren't, returns one HTML <option> with '??'
   */

  const proofreaderLoop = (language) => {
    let result;
    const vendorMapped = proofreaders.filter(
      (vendor) => vendor.language === language
    );
    if (vendorMapped.length !== 0) {
      result = vendorMapped.map((vendor) => (
        <option value={vendor.nickname} id={vendor._id}>
          {vendor.nickname}
        </option>
      ));
    } else {
      result = <option>??</option>;
    }
    return result;
  };
  /** 1. This function needs the service as parameter to work properly
   * 2. Depending on the service, it will render 1 of 3 const
   * 3. Each const focuses on one type of service and calls a function that will loop
   *    through the vendors stored in the database whose service is equal to the service in scope
   */
  const TEP_Loop = this_handoff_added_lang.map((langMapped) => (
    <tr className="fullLanguageRow" id={langMapped} key={langMapped}>
      <th>{langMapped}</th>
      <th key={langMapped + "-Translator"} id={langMapped + "-Translator"}>
        <select onChange={props.onChange} className="selectTrans">
          {translatorLoop(langMapped)}
        </select>
      </th>

      <th key={langMapped + "-Proofreader"} id={langMapped + "-Proofreader"}>
        <select onChange={props.onChange} className="selectproof">
          {proofreaderLoop(langMapped)}{" "}
        </select>
      </th>
      <button
        value={langMapped}
        id={langMapped}
        onClick={(e) => {
          HandleDelete(e);
        }}
      >
        <RemoveIcon />
      </button>
    </tr>
  ));

  const TRA_Loop = this_handoff_added_lang.map((langMapped) => (
    <tr className="fullLanguageRow" id={langMapped} key={langMapped}>
      <th>{langMapped}</th>
      <th key={langMapped + "-Translator"} id={langMapped + "-Translator"}>
        <select onChange={props.onChange} className="selectTrans">
          {translatorLoop(langMapped)}
        </select>
      </th>
      <button
        value={langMapped}
        id={langMapped}
        onClick={(e) => {
          HandleDelete(e);
        }}
      >
        <RemoveIcon />
      </button>
    </tr>
  ));

  const PROOF_Loop = this_handoff_added_lang.map((langMapped) => (
    <tr id={langMapped}>
      {" "}
      <th>{langMapped}</th>
      <th key={langMapped + "-Proofreader"} id={langMapped + "-Proofreader"}>
        <select
          onChange={props.onChange}
          id="selectproof"
          className="selectproof"
        >
          {proofreaderLoop(langMapped)}{" "}
        </select>
      </th>
      <button
        value={langMapped}
        id={langMapped}
        onClick={(e) => {
          HandleDelete(e);
        }}
      >
        <RemoveIcon />
      </button>
    </tr>
  ));

  let RowContent = (requestService) => {
    switch (requestService) {
      case "TRA":
        return (
          <>
            <thead>
              <tr className="TableHeads">
                <th></th>
                <th>Translation</th>
              </tr>
            </thead>
            <tbody id="tableBody">{TRA_Loop}</tbody>
          </>
        );
      case "TEP":
        return (
          <>
            <thead>
              <tr className="TableHeads">
                <th></th>
                <th>Translation</th>
                <th>Proofreading</th>
              </tr>
            </thead>
            <tbody id="tableBody">{TEP_Loop}</tbody>
          </>
        );
      case "PRF":
        return (
          <>
            <thead>
              <tr className="TableHeads">
                <th></th>
                <th>Proofreading</th>
              </tr>
            </thead>
            <tbody id="tableBody">{PROOF_Loop}</tbody>
          </>
        );
      default:
        return (
          <>
            <thead>
              <tr className="TableHeads">
                <th></th>
                <th>Translation</th>
                <th>Proofreading</th>
              </tr>
            </thead>
            <tbody id="tableBody">{TEP_Loop}</tbody>
          </>
        );
    }
  };

  if (!requestService) {
    return (
      <div className="MainTable">
        <table>{RowContent("TEP")}</table>
        <div className="AddLanguageButton">
          <SelectLanguage value={additionalLanguage} onChange={handleChange} />
          <button
            className="generalButton"
            onClick={(e) => NewLanguagesButtonClicked(e)}
          >
            Add
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="MainTable">
        <table>{RowContent(requestService)}</table>
        <div className="AddLanguageButton">
          <SelectLanguage value={additionalLanguage} onChange={handleChange} />
          <button
            className="generalButton"
            onClick={(e) => NewLanguagesButtonClicked(e)}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
};

export default MainTable;
