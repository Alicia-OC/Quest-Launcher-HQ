import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

/* DATABASE */
import { GetLanguages } from "../../features/languagesList/fetchLanguages";
import { GetGames } from "../../features/Games/fetchGames";
import { GetDevelopers } from "../../features/developersList/fetchDevelopers";

/* FONTAWESOME */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faGamepad,
  faCode,
  faFileLines,
  faBook,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";

/**MUI */

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";


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

  console.log(devs);

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
            <Link to={`/Vendors/${language.language}`}>
              {language.language}
            </Link>
          </li>
        );
      });
    } else {
      result = "Loading...";
    }
    return <ul>{result}</ul>;
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

  const content = (
    <>
      <List>
        <ListItem></ListItem>
      </List>
    </>
  );

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
          <Link className="title-profile-library" to="/Vendors">
            Vendors
          </Link>{" "}
          <FontAwesomeIcon icon={faAddressBook} />{" "}
          {languages ? (
            <p className="small-description-profile-library">
              More than {languages.length - 1} language pairs with many
              vendors to work with...
            </p>
          ) : (
            ""
          )}
        </div>
        <Divider></Divider>

        <div>
          <button
            value="gamesPlusButton-library"
            onClick={(e) => handleGames(e)}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
          </button>{" "}
          <Link className="title-profile-library" to="/Games">
            Games
          </Link>{" "}
          <FontAwesomeIcon icon={faGamepad} />
          <div>{dropDownGames}</div>{" "}
          {games ? (
            <p className="small-description-profile-library">
              More than {games.length - 1} games to be used in your quests...
            </p>
          ) : (
            ""
          )}
        </div>
        <Divider></Divider>

        <div className="DevsLibraryList">
          <button
            value="developersPlusButton-library"
            onClick={(e) => handleDevs(e)}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
          </button>{" "}
          <Link className="title-profile-library" to="/Developers">
            Developers
          </Link>{" "}
          <FontAwesomeIcon icon={faCode} />
          <div>{dropDownDevs}</div>{" "}
          {devs ? (
            <p className="small-description-profile-library">
              More than {devs.length - 1} developers...
            </p>
          ) : (
            ""
          )}{" "}
        </div>
        <Divider></Divider>

        <div>
          <button
            value="templatesPlusButton-library"
            onClick={(e) => handleTemplates(e)}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
          </button>{" "}
          <Link className="title-profile-library" to="/TemplateList">
            Templates
          </Link>{" "}
          <FontAwesomeIcon icon={faBook} />
          <div>{dropDownTemplates}</div>{" "}
          {templates ? (
            <p className="small-description-profile-library">
              More than {templates.length - 1} templates created by you and your
              team...
            </p>
          ) : (
            ""
          )}
        </div>
        <Divider></Divider>

        <div>
          <button
            value="templatesPlusButton-library"
            onClick={(e) => handleRequests(e)}
          >
            <FontAwesomeIcon icon={faPlus} />{" "}
          </button>{" "}
          <Link className="title-profile-library" to="/RequestList">
            Requests created
          </Link>{" "}
          <FontAwesomeIcon icon={faFileLines} />
          <div>{dropDownRequests}</div>
          {requests ? (
            <p className="small-description-profile-library">
              More than {requests.length - 1} requeste created by you...
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Library;
