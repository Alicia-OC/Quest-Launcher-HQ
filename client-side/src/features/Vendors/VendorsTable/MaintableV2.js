import { useState } from "react";
import { GetProofreaders, GetTranslators } from "../_GetVendorsData";
import { GetLanguages } from "../../languagesList/fetchLanguages";
import { baseLanguages2 } from "../../../apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import SelectLanguage from "../../../components/pages/elements/SelectLanguage";
import { SelectTeam } from "../../../components/pages/elements/SelectTeam";
import PickServiceButtons from "../../../components/pages/elements/PickServiceButtons";

let this_handoff_added_langs = baseLanguages2;

const MainTable = (props) => {
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
  const [serviceClicked, setServiceClicked] = useState();
  const [serviceHeads, setServiceHeads] = useState();

  /** 1. Establishes the service for this table
   * 2. calls the setFullTable to render and update the table if the service has changed
   * or if a new language has been added
   */

  const ServiceButtonClicked = (e) => {
    let valueClicked = e.target.value;
    setServiceClicked(valueClicked);
    setFullTable(RowContent(e.target.value));
    props.getService(e.target.value);

    if (e.target.value === "TEP") {
      setServiceHeads(
        <>
          <th>Translation</th>
          <th>Proofreading</th>
        </>
      );
    } else if (e.target.value === "TRA") {
      setServiceHeads(
        <>
          <th>Translation</th>
        </>
      );
    } else if (e.target.value === "PRF") {
      setServiceHeads(
        <>
          <th>Proofreading</th>
        </>
      );
    }
  };
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
      setFullTable(RowContent(serviceClicked));
    }
  };

  /** 1. Code for the dropdown of languages that can be added
   * 2. loops through all the languages stored in the database
   */

  const [additionalLanguage, setAdditionalLanguage] = useState();

  const handleChange = (e) => {
    console.log('das');
    setAdditionalLanguage(e.target.value);
  };

  const NewLanguagesButtonClicked = (e) => {
    e.preventDefault();
    if (!this_handoff_added_langs.includes(additionalLanguage)) {
      this_handoff_added_langs.push(additionalLanguage);
      setFullTable(RowContent(serviceClicked));
    } else {
      console.log("fail");
    }
  };

  /**1. The service buttons, calls a funcntion when they're click (ServiceButtonClicked).
   */
  let buttonsContent = //updates serviceHeads & serviceClicked
    (
      <div className="buttonsToPickService">
        <button
          value="TEP"
          type="button"
          onClick={(e) => {
            ServiceButtonClicked(e);
          }}
        >
          Translation+Proofreading
        </button>
        <button
          value="TRA"
          type="button"
          onClick={(e) => {
            ServiceButtonClicked(e);
          }}
        >
          Translation
        </button>
        <button
          value="PRF"
          type="button"
          onClick={(e) => {
            ServiceButtonClicked(e);
          }}
        >
          Proofreading
        </button>
      </div>
    );
  /** 1. This function needs the service as parameter to work properly
   * 2. Depending on the service, it will render 1 of 3 const
   * 3. Each const focuses on one type of service and calls a function that will loop
   *    through the vendors stored in the database whose service is equal to the service in scope
   */

  let RowContent = (serviceClicked) => {
    const TEP_Loop = this_handoff_added_langs.map((langMapped) => (
      <tr className="fullLanguageRow" id={langMapped} key={langMapped}>
        <th>{langMapped}</th>
        <th key={langMapped + "-Translator"} id={langMapped + "-Translator"}>
          <select className="selectTrans">{translatorLoop(langMapped)}</select>
        </th>

        <th key={langMapped + "-Proofreader"} id={langMapped + "-Proofreader"}>
          <select className="selectproof">
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
          <select className="selectTrans">{translatorLoop(langMapped)}</select>
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
          <select id="selectproof" className="selectproof">
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

    switch (serviceClicked) {
      case "TRA":
        return TRA_Loop;
      case "TEP":
        return TEP_Loop;
      case "PRF":
        return PROOF_Loop;
      default:
        return TEP_Loop;
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

  const childToParent = (e) => {
    e.preventDefault();
    let table = document.getElementsByTagName("table")[0];
    let rows = table.rows;
    let tableToObjectArr = [];

    for (let index = 0; index < rows.length; index++) {
      let language = rows[index].id;
      let selectTRoptions;
      let selectPRFoptions;
      let result;
      if (language) {
        if (serviceClicked === "TEP") {
          selectTRoptions = document.querySelector(
            `#${language}-Translator > select`
          ).value;

          selectPRFoptions = document.querySelector(
            `#${language}-Proofreader > select`
          ).value;

          result = {
            language: language,
            translator: selectTRoptions,
            proofreader: selectPRFoptions,
          };
        } else if (serviceClicked === "TRA") {
          selectTRoptions = document.querySelector(
            `#${language}-Translator > select`
          ).value;
          result = {
            language: language,
            translator: selectTRoptions,
          };
        } else if (serviceClicked === "PRF") {
          selectPRFoptions = document.querySelector(
            `#${language}-Proofreader > select`
          ).value;
          result = {
            language: language,
            proofreader: selectPRFoptions,
          };
        }
      }
      tableToObjectArr.push(result);
    }
    props.getTeamTable(tableToObjectArr);
    console.log(tableToObjectArr);
  };
  const [servicetest, setservicetest] = useState();
  return (
    <div className="MainTable">
      {buttonsContent}
     
      <table>
        <thead>
          <tr className="TableHeads">
            <th></th>
            {serviceHeads}
          </tr>
        </thead>
        <tbody id="tableBody">{fullTable}</tbody>
      </table>{" "}
      <div className="temporalButtonChildToParent">
        <button onClick={(e) => childToParent(e)}>
          <FontAwesomeIcon icon={faCheck} />{" "}
        </button>
        <p1>
          <em> Please click to save the list</em>
        </p1>
      </div>
      <div className="AddLanguageButton">
        <SelectLanguage value={additionalLanguage} onChange={handleChange} />
        <button onClick={(e) => NewLanguagesButtonClicked(e)}>Add</button>
      </div>
      ;
    </div>
  );
};

export default MainTable;
