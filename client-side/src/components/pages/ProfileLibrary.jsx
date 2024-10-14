import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

/* DATABASE */
import { GetLanguages } from "../../features/languagesList/fetchLanguages";
import { GetGames } from "../../features/Games/fetchGames";
import { GetDevelopers } from "../../features/developersList/fetchDevelopers";

/* FONTAWESOME */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Library = ({}) => {
  const [dropdownVendors, setDropdownVendors] = useState(null);
  const [dropDownGames, setDropDownGames] = useState(null);
  const [dropDownDevs, setDropDownDevs] = useState(null);
  const [dropDownTemplates, setDropDownTemplates] = useState(null);
  const [dropDownRequests, setDropDownRequests] = useState(null);

  const [dropdownVendorsShow, setDropdownVendorsShow] = useState(false);
  const [dropDownGamesShow, setDropDownGamesShow] = useState(false);
  const [dropDownDevsShow, setDropDownDevsShow] = useState(false);
  const [dropDownTemplatesShow, setDropDownTemplatesShow] = useState(false);
  const [dropDownRequestsShow, setDropDownRequestsShow] = useState(false);

  const languages = GetLanguages();
  const games = GetGames();
  const devs = GetDevelopers();

  const user = useSelector((state) => state.user); //
  const templates = user.templates;
  const requests = user.requests;

  const handleVendor = (e) => {
    e.preventDefault();
    setDropdownVendorsShow(!dropdownVendorsShow);
  };
  const handleGames = (e) => {
    e.preventDefault();
    setDropDownGamesShow(!dropDownGamesShow);
  };

  const handleDevs = (e) => {
    e.preventDefault();
    setDropDownDevsShow(!dropDownDevsShow);
  };
  const handleTemplates = (e) => {
    e.preventDefault();
    setDropDownTemplatesShow(!dropDownTemplatesShow);
  };
  const handleRequests = (e) => {
    e.preventDefault();
    setDropDownRequestsShow(!dropDownRequestsShow);
  };

  const showGamesLibrary = () => {
    if (games) {
      let count = 0;
      return (
        <>
          <ul>
            {" "}
            {games.map((item) => {
              if (count < 20) {
                count++;
                return <li>{item.title}</li>;
              }
            })}
          </ul>
          <Link to={"/Games"}>Show more...</Link>
        </>
      );
    } else {
      return "Loading...";
    }
  };
  const showDevsLibrary = () => {
    if (devs) {
      let count = 0;
      return (
        <>
          <ul>
            {devs.map((item) => {
              if (count < 20) {
                count++;
                return <li>{item.name}</li>;
              }
            })}
          </ul>
          <Link to={"/Developers"}>Show more...</Link>
        </>
      );
    } else {
      return "Loading...";
    }
  };
  const showTemplatesLibrary = () => {
    let count = 0;
    if (templates) {
      const map = templates.map((item) => {
        if (count < 20) {
          count++;
          return (
            <li>
              {" "}
              <Link to={`/Template/${item._id}`}>{item.title}</Link>
            </li>
          );
        }
      });
      return (
        <>
          <ul>{map}</ul>
          <Link to={"/TemplateList"}>Show more...</Link>
        </>
      );
    } else {
      return "Loading...";
    }
  };

  const showRequestsLibrary = () => {
    let count = 0;
    if (requests) {
      const map = requests.map((item) => {
        if (count !== 10) {
          count++;
          return (
            <li>
              {" "}
              <Link to={`/Request/${item._id}`}>{item.title}</Link>
            </li>
          );
        }
      });
      return (
        <>
          {" "}
          <ul> {map}</ul>
          <Link to={"/RequestList"}>Show more...</Link>
        </>
      );
    } else {
      return "Loading...";
    }
  };

  const showVendorsLibrary = () => {
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

  useEffect(() => {
    dropdownVendorsShow
      ? setDropdownVendors(showVendorsLibrary)
      : setDropdownVendors("");
    dropDownGamesShow
      ? setDropDownGames(showGamesLibrary)
      : setDropDownGames("");
    dropDownDevsShow ? setDropDownDevs(showDevsLibrary) : setDropDownDevs("");
    dropDownTemplatesShow
      ? setDropDownTemplates(showTemplatesLibrary)
      : setDropDownTemplates("");
    dropDownRequestsShow
      ? setDropDownRequests(showRequestsLibrary)
      : setDropDownRequests("");
  }, [
    dropdownVendorsShow,
    dropDownGamesShow,
    dropDownDevsShow,
    dropDownTemplatesShow,
    dropDownRequestsShow,
  ]);

  return (
    <>
      <div className="libraryDiv" id="libraryDiv">
        <div className="VendorsLibraryList">
          <button
            value="vendorsPlusButton-library"
            id="vendorsPlusButton-library"
            onClick={(e) => handleVendor(e)}
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
            onClick={(e) => handleGames(e)}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
          </button>{" "}
          <Link to="/Games">Games</Link>
          <div>{dropDownGames}</div>
        </div>
        <div className="DevsLibraryList">
          <button
            value="developersPlusButton-library"
            onClick={(e) => handleDevs(e)}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
          </button>{" "}
          <Link to="/Developers">Developers</Link>
          <div>{dropDownDevs}</div>
        </div>
        <div>
          <button
            value="templatesPlusButton-library"
            onClick={(e) => handleTemplates(e)}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
          </button>{" "}
          <Link to="/TemplateList">Templates</Link>
          <div>{dropDownTemplates}</div>
        </div>
        <div>
          <button
            value="templatesPlusButton-library"
            onClick={(e) => handleRequests(e)}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
          </button>{" "}
          <Link to="/RequestList">Requests created</Link>
          <div>{dropDownRequests}</div>
        </div>
      </div>
    </>
  );
};

export default Library;
