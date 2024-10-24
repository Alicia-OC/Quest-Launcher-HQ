import { useState, useEffect } from "react";
import { GetProofreaders, GetTranslators } from "../_GetVendorsData";
import { baseLanguages2, baseLanguages } from "../../../apis";
import RemoveIcon from "@mui/icons-material/Remove";
import SelectLanguage from "../../../components/pages/elements/SelectLanguage";
import { GetFIGS } from "../../languagesList/fetchLanguages";

const MainTableRemanu = (props) => {
  let requestService = props.service;
  let languagesFromTemplate = props.languages;

  const [additionalLanguage, setAdditionalLanguage] = useState();
  const [additionalLanguage2, setAdditionalLanguage2] = useState();

  const [updateTable, setUpdateTable] = useState();
  const [updateTable2, setUpdateTable2] = useState();

  const [addedLanguages, setAddedLanguages] = useState(
    languagesFromTemplate || baseLanguages2
  );
  const [addedLanguagesObj, setAddedLanguagesObj] = useState(baseLanguages);

  /** backend data */
  const translators = GetTranslators();
  const proofreaders = GetProofreaders();
  const figs = GetFIGS();

  /** Handle Delete Language */
  const handleDelete = (e) => {
    e.preventDefault();
    const languageToDelete = e.currentTarget.value;

    if (window.confirm("Confirm")) {
      const updatedLanguages = addedLanguages.filter(
        (lang) => lang !== languageToDelete
      );
      const updatedLanguagesObj = addedLanguagesObj.filter(
        (langObj) => langObj.language !== languageToDelete
      );

      setAddedLanguages(updatedLanguages);
      setAddedLanguagesObj(updatedLanguagesObj);

      setUpdateTable(RowContent(requestService));
      setUpdateTable2(RowContent(requestService));
      console.log(updatedLanguages, updatedLanguagesObj);
    }
  };

  /** Handle Add New Language */
  const handleChange = (e) => {
    setAdditionalLanguage(e.target.value);

    const selectedOption = e.target.selectedOptions[0];
    const langCode = selectedOption.getAttribute("data-langcode");

    setAdditionalLanguage2({
      language: e.target.value,
      languageCode: langCode,
    });
  };

  const NewLanguagesButtonClicked = (e) => {
    e.preventDefault();

    if (
      !addedLanguages.includes(additionalLanguage) &&
      !addedLanguagesObj.some((langObj) => langObj.language === additionalLanguage2.language)
    ) {
      setAddedLanguages([...addedLanguages, additionalLanguage]);
      setAddedLanguagesObj([...addedLanguagesObj, additionalLanguage2]);

      setUpdateTable(RowContent(requestService));
      props.getLanguages([...addedLanguages, additionalLanguage]);
    }
  };

  /** Loop through vendors for Translator */
  const translatorLoop = (language) => {
    const vendorMapped = translators.filter(
      (vendor) => vendor.language === language
    );
    return vendorMapped.length !== 0 ? (
      vendorMapped.map((vendor) => (
        <option value={vendor.nickname} id={vendor._id} key={vendor._id}>
          {vendor.nickname}
        </option>
      ))
    ) : (
      <option key="none">??</option>
    );
  };

  /** Loop through vendors for Proofreader */
  const proofreaderLoop = (language) => {
    const vendorMapped = proofreaders.filter(
      (vendor) => vendor.language === language
    );
    return vendorMapped.length !== 0 ? (
      vendorMapped.map((vendor) => (
        <option value={vendor.nickname} id={vendor._id} key={vendor._id}>
          {vendor.nickname}
        </option>
      ))
    ) : (
      <option key="none">??</option>
    );
  };

  /** Render rows based on service */
  const renderRows = (service) => {
    return addedLanguagesObj.map((langMapped) => (
      <tr
        className="fullLanguageRow"
        id={langMapped.languageCode}
        key={langMapped.language}
      >
        <th>{langMapped.languageCode}</th>
        {service !== "PRF" && (
          <th id={`${langMapped.languageCode}-Translator`}>
            <select onChange={props.onChange}>
              {translatorLoop(langMapped.language)}
            </select>
          </th>
        )}
        {service !== "TRA" && (
          <th id={`${langMapped.languageCode}-Proofreader`}>
            <select onChange={props.onChange}>
              {proofreaderLoop(langMapped.language)}
            </select>
          </th>
        )}
        <button value={langMapped.language} onClick={handleDelete}>
          <RemoveIcon />
        </button>
      </tr>
    ));
  };

  /** Row content based on service */
  let RowContent = (requestService) => {
    const serviceHeaders = {
      TEP: ["Translation", "Proofreading"],
      TRA: ["Translation"],
      PRF: ["Proofreading"],
    };

    return (
      <>
        <thead>
          <tr className="TableHeads">
            <th></th>
            {serviceHeaders[requestService].map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody id="tableBody">{renderRows(requestService)}</tbody>
      </>
    );
  };

  return (
    <div className="MainTable">
      <table>{RowContent(requestService || "TEP")}</table>
      <div className="AddLanguageButton">
        <SelectLanguage onChange={handleChange} />
        <button className="generalButton" onClick={NewLanguagesButtonClicked}>
          Add
        </button>
      </div>
    </div>
  );
};

export default MainTableRemanu;
