import React, { useState } from "react";
import Axios from "axios";

/* SMALL COMPONENTS */
import RequestList from "../../features/templates/att-req-lists";
import TextAreaComponent from "../../features/templates/textArea";
import MainTable from "../../features/Vendors/VendorsTable/MainTable";
import PickServiceButtons from "./elements/PickServiceButtons";
import NewInput from "./elements/NewInput";

/* DEFAULT VARIABLES */
import { initialParagraph, mongoDB_Template } from "../../apis";

/* DATABASE DEPENDENCIES*/
import { GetDevelopers } from "../../features/developersList/fetchDevelopers";
import { GetGames } from "../../features/Games/fetchGames";

/* FONTAWESOME */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

/* CSS */
import "./NewTemplate.css";

function NewTemplate(props) {
  const [instructions, setInstructions] = useState();
  const [attachments, setAttachments] = useState();
  const [requirements, setRequirements] = useState();
  const [thisService, setThisService] = useState();
  const [templateTitle, setTemplateTitle] = useState();
  const [developer, setDeveloper] = useState("Frozen District");
  const [introText, setIntroText] = useState(
    "Write a small instroduction to the project here."
  );
  const [languageTeam, setLanguageTeam] = useState();

  const DB_devs = GetDevelopers();
  const DB_games = GetGames();

  let GamesLoop = [];
  let DevLoop = [];

  if (DB_games) {
    for (let i = 0; i < DB_games.length; i++) {
      GamesLoop.push(
        <option
          id={DB_games[i]._id}
          key={DB_games[i].title}
          value={DB_games[i].title}
        >
          {DB_games[i].title}
        </option>
      );
    }
  }

  const GetDeveloper = () => {
    const element = document.querySelector("#gamesSelectOptions");
    const id = element.options[element.selectedIndex].id;
    const findDeveloper = DB_games.find((dev) => dev._id === id);
    setDeveloper(findDeveloper.developer);
  };

  const tableChanged = (e) => {
    let table = document.getElementsByTagName("table")[0];
    let rows = table.rows;
    let tableToObjectArr = [];

    for (let index = 0; index < rows.length; index++) {
      let language = rows[index].id;
      let selectTRoptions;
      let selectPRFoptions;
      let result;
      if (language) {
        if (thisService === "TEP") {
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
        } else if (thisService === "TRA") {
          selectTRoptions = document.querySelector(
            `#${language}-Translator > select`
          ).value;
          result = {
            language: language,
            translator: selectTRoptions,
          };
        } else if (thisService === "PRF") {
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
    const tableToObjectArrSliced = tableToObjectArr.slice(1);
    setLanguageTeam(tableToObjectArrSliced);
  };
  /** tableChanged is only triggered if one of the select option changes, which means
   * adding languages won't trigger the finction hence won't take the table values.
   * Should fix that.
   */

  function HandleSubmit(e) {
    e.preventDefault();

    let attFormatted = attachments.map((att) => att.value);
    let reqFormatted = requirements.map((req) => req.value);
    console.log(attFormatted);

    const object = {
      templateTitle: templateTitle,
      game: document.getElementById("gamesSelectOptions").value,
      developer: developer,
      instructions: instructions,
      introText: introText,
      languageTeam: languageTeam,
      attachments: attachments,
      requirements: requirements,
    };
    console.log(object);
    Axios.post(mongoDB_Template, {
      templateTitle: templateTitle,
      game: document.getElementById("gamesSelectOptions").value,
      developer: developer,
      instructions: instructions,
      languageTeam: languageTeam,
      introText: introText,

      attachments: attFormatted,
      requirements: reqFormatted,
    })
      .then(alert(`New template ${templateTitle} has been created!`))
      .catch((err) => console.log(err));
    //.then(location.reload());

    console.log(object);
  }

  return (
    <div className="createTemplate">
      <form action="" method="">
        <div className="introductionParagraph">
          {" "}
          <div className="templateTitle">
            <label>Template title:</label>
            <NewInput
              getInput={(title) => setTemplateTitle(title)}
              placeholder="Write your template's title here"
            />
          </div>
          <div className="gamesDiv">
            <div>
              <label>Game</label>
              <select
                onChange={(e) => GetDeveloper(e)}
                id="gamesSelectOptions"
                className="gamesSelectOptions"
              >
                {GamesLoop}{" "}
              </select>
              <button>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </div>
            <div className="clientDiv">
              {" "}
              <label>Developer:</label>
              <p1>{developer}</p1>
            </div>
          </div>
          <div className="introText" data-type="select">
            <textarea
              onChange={(e) => setIntroText(e.target.value)}
              placeholder={introText}
              rows="4"
              cols="100"
              type="text"
            ></textarea>
          </div>
          <TextAreaComponent
            changeInstructions={(thisInstructions) =>
              setInstructions(thisInstructions)
            }
          />{" "}
        </div>

        <PickServiceButtons
          getService={(thisService) => {
            setThisService(thisService);
          }}
        />
        <MainTable
          getService={(serviceCall) => setThisService(serviceCall)}
          getTeamTable={(thisTeamTable) => setLanguageTeam(thisTeamTable)}
          service={thisService}
          onChange={(e) => {
            tableChanged(e);
          }}
        />

        <RequestList
          getAttachments={(theseAttachments) =>
            setAttachments(theseAttachments)
          }
          getRequirements={(theseReqs) => setRequirements(theseReqs)}
        />

        <input
          type="submit"
          value="Create"
          onClick={(e) => HandleSubmit(e)}
        ></input>
      </form>
    </div>
  );
}

export default NewTemplate;
