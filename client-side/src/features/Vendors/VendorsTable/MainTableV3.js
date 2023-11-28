import { useState } from "react";
import { GetProofreaders, GetTranslators } from "../_GetVendorsData";
import { GetLanguages } from "../../languagesList/fetchLanguages";
import { baseLanguages2 } from "../../../apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import SelectLanguage from "../../../components/pages/elements/SelectLanguage";
import { SelectTeam } from "../../../components/pages/elements/SelectTeam";

let this_handoff_added_langs = baseLanguages2;

const MainTable3 = (props) => {
  let requestService = props.service;

  const this_handoff_added_langs2 = () => {
    let langs = GetLanguages();
    let array = [];
    if (langs) {
      for (let i = 0; i < 4; i++) {
        array.push(langs[i].language);
      }
    }
    console.log(array);
    return array;
  };

  const translators = GetTranslators();
  const proofreaders = GetProofreaders();
  const [fullTable, setFullTable] = useState();

  /** 1. Establishes the service for this table
   * 2. calls the setFullTable to render and update the table if the service has changed
   * or if a new language has been added
   */

  /** 1. Stores in a const the language that triggered the delete function
   * 2. loops through the language array, looks for the object whose language is the same as the trigger
   *    and gives the var language the value of said object
   * 3. Looks for the index in this_handoff_added_langs for our new language variable
   * 4. deletes the object in this_handoff_added_langs
   * 5. calls the table to be rendered again so it refreshes as soon as the language has been deleted
   *
   */
  let HandleDelete = (e) => {
    e.preventDefault();
    const myValue = e.currentTarget.value;
    let language;
    for (let i = 0; i < this_handoff_added_langs.length; i++) {
      if (this_handoff_added_langs[i] === myValue) {
        language = this_handoff_added_langs[i];
      }
    }
    const index = this_handoff_added_langs.indexOf(language);
    if (window.confirm("Confirm")) {
      this_handoff_added_langs.splice(index, 1);
      setFullTable(RowContent(requestService));
    }
  };

  /** 1. Code for the dropdown of languages that can be added
   * 2. loops through all the languages stored in the database
   */

  const [additionalLanguage, setAdditionalLanguage] = useState();

  const handleChange = (e) => {
    setAdditionalLanguage(e.target.value);
  };

  const NewLanguagesButtonClicked = (e) => {
    e.preventDefault();
    if (!this_handoff_added_langs.includes(additionalLanguage)) {
      this_handoff_added_langs.push(additionalLanguage);
      setFullTable(RowContent(requestService));
    } else {
      console.log("fail");
    }
  };

  /** 1. This function needs the service as parameter to work properly
   * 2. Depending on the service, it will render 1 of 3 const
   * 3. Each const focuses on one type of service and calls a function that will loop
   *    through the vendors stored in the database whose service is equal to the service in scope
   */

  let RowContent = (requestService) => {
    const TEP_Loop = this_handoff_added_langs.map((langMapped) => (
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
          -
        </button>
      </tr>
    ));

    const TRA_Loop = this_handoff_added_langs.map((langMapped) => (
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
          -
        </button>
      </tr>
    ));

    const PROOF_Loop = this_handoff_added_langs.map((langMapped) => (
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
          -
        </button>
      </tr>
    ));

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

  if (!requestService) {
    <div className="MainTable">
      <table>{RowContent(requestService)}</table>
    </div>;
  } else {
    return RowContent(requestService);
  }
};

export default MainTable3;
