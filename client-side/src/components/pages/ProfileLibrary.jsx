import React, { useState } from "react";
import { Link } from "react-router-dom";

/* DATABASE */
import { GetLanguages } from "../../features/languagesList/fetchLanguages";

/* FONTAWESOME */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";



const showVendorsLibrary = () => {
  const content = (
    <>
      <li>
        <FontAwesomeIcon icon={faPlus} />
        <Link to="/Vendors"> French</Link>
      </li>
      <li>
        <FontAwesomeIcon icon={faPlus} />
        <Link to="/Vendors"> Italian</Link>
      </li>
    </>
  );
  return content;
};
const showGamesLibrary = () => {
  const content = (
    <div>
      <ul>
        <li>
          <FontAwesomeIcon icon={faPlus} />
          game 1
        </li>
        <li>
          <FontAwesomeIcon icon={faPlus} />
          game 2
        </li>
      </ul>
    </div>
  );
  return content;
};
const showDevsLibrary = () => {
  const content = (
    <div>
      <ul>
        <li>
          <FontAwesomeIcon icon={faPlus} />
          dev 1
        </li>
        <li>
          <FontAwesomeIcon icon={faPlus} />
          dev 2
        </li>
      </ul>
    </div>
  );
  return content;
};
const showTemplatesLibrary = () => {
  return <p1>Template 1</p1>;
};

const Library = ({}) => {
  const [dropdownVendors, setDropdownVendors] = useState(null);
  const [dropDownGames, setDropDownGames] = useState(null);
  const [dropDownDevs, setDropDownDevs] = useState(null);
  const [dropDownTemplates, setDropDownTemplates] = useState(null);
  const languages = GetLanguages();

  const handlePlusButton = (e) => {
    let selectedListValue = e.currentTarget.value;
    console.log(selectedListValue);

    if (selectedListValue == "vendorsPlusButton-library") {
      setDropdownVendors(languagesLooped());
    } else if (selectedListValue == "gamesPlusButton-library") {
      setDropDownGames(showGamesLibrary);
    } else if (selectedListValue == "developersPlusButton-library") {
      setDropDownDevs(showDevsLibrary);
    } else if (selectedListValue == "templatesPlusButton-library") {
      setDropDownTemplates(showTemplatesLibrary);
    }
  };

  const languagesLooped = () => {
    let result = [];
    if (languages) {
      languages.map((language) => {
        result.push(
          <li>
            <Link to={`/${language.language}Vendors`}>{language.language}</Link>
          </li>
        );
      });
    } else {
      result = "Loading...";
    }
    return result;
  };
  return (
    <>
      <div className="libraryDiv" id="libraryDiv">
        <div>
          <button
            value="vendorsPlusButton-library"
            id="vendorsPlusButton-library"
            onClick={(e) => handlePlusButton(e)}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
          </button>{" "}
          <Link to="/Vendors">Vendors</Link>
          <div>
            <ul>{dropdownVendors}</ul>
          </div>
        </div>
        <div>
          <button
            value="gamesPlusButton-library"
            onClick={(e) => handlePlusButton(e)}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
          </button>{" "}
          <Link to="/Games">Games</Link>
          <div>{dropDownGames}</div>
        </div>
        <div>
          <button
            value="developersPlusButton-library"
            onClick={(e) => handlePlusButton(e)}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
          </button>{" "}
          <Link to="/Developers">Developers</Link>
          <div>{dropDownDevs}</div>
        </div>
        <div>
          <button
            value="templatesPlusButton-library"
            onClick={(e) => handlePlusButton(e)}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
          </button>{" "}
          <Link to="/TemplateList">Templates</Link>
          <div>{dropDownTemplates}</div>
        </div>
        <div>
          <button
            value="templatesPlusButton-library"
            onClick={(e) => handlePlusButton(e)}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
          </button>{" "}
          <Link to="/RequestList">Requests created</Link>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Library;
