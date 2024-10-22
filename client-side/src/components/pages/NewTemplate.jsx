import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

/* SMALL COMPONENTS */
import RequestList from "./elements/att-req-lists";
import NewTextArea from "./elements/textArea_general";
import MainTable from "../../features/Vendors/VendorsTable/MainTable";
import PickServiceButtons from "./elements/PickServiceButtons";
import NewInput from "./elements/NewInput";

/* DEFAULT VARIABLES */
import { mongoDB_Template, mongoDB_Users } from "../../apis";

/* DATABASE DEPENDENCIES*/
import { GetDevelopers } from "../../features/developersList/fetchDevelopers";
import { GetGames } from "../../features/Games/fetchGames";

/* MUI */
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

/* CSS */
import "./NewTemplate.css";

function NewTemplate(props) {
  const [instructions, setInstructions] = useState();
  const [attachments, setAttachments] = useState();
  const [requirements, setRequirements] = useState();
  const [thisService, setThisService] = useState("TEP");
  const [teamTable, setTeamTable] = useState();

  const [templateTitle, setTemplateTitle] = useState();
  const [developer, setDeveloper] = useState("Frozen District");
  const [introText, setIntroText] = useState(
    "Write a small introduction about project."
  );
  const [templateStarred, setTemplateStarred] = useState(false);
  const [thisListOfLanguages, setThisListOfLanguages] = useState();
  const [mqproject, setMqproject] = useState();

  const user = useSelector((state) => state.user); //

  const DB_devs = GetDevelopers();
  const DB_games = GetGames();

  let GamesLoop = [];
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
    setTeamTable(tableToObjectArrSliced);
  };
  /** tableChanged is only triggered if one of the select option changes, which means
   * adding languages won't trigger the finction hence won't take the table values.
   * Should fix that.
   */

  function HandleSubmit(e) {
    e.preventDefault();
    console.log(attachments);

    if (!developer || !templateTitle || !mqproject || !introText) {
      alert("Please make sure all required fields are filled.");
      return;
    }
    let attFormatted = attachments.map((att) => att.value);
    let reqFormatted = requirements.map((req) => req.value);
    let domain = user.domain;
    let userID = user._id;

    Axios.post(mongoDB_Template, {
      userId: userID,
      domain: domain,
      title: templateTitle,
      game: document.getElementById("gamesSelectOptions").value,
      developer: developer,
      mqproject: mqproject,
      instructions: instructions,
      languageTeam: thisListOfLanguages,
      introText: introText,
      favorite: templateStarred,
      attachments: attFormatted,
      requirements: reqFormatted,
    })
      .then(function (response) {
        console.log('TESTING');
        if (response.status == 200) {
          Axios.patch(mongoDB_Users, {
            userId: user._id,
            templateId: response.data,
          });

          window.location.replace(`/Template/${response.data}`);
        }
      })
      .then(alert(`New template ${templateTitle} has been created!`))

      .catch((err) => console.log(err));

    //.then(location.reload());
  }

  const setStar = (e) => {
    e.preventDefault();
    setTemplateStarred(!templateStarred);
  };

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
            />{" "}
            <button onClick={(e) => setStar(e)} className="btnStarTemplateList">
              {templateStarred ? (
                <StarIcon style={{ fontSize: "1rem" }} />
              ) : (
                <StarBorderOutlinedIcon style={{ fontSize: "1rem" }} />
              )}
            </button>
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
            </div>
            <div className="clientDiv">
              {" "}
              <label>Developer:</label>
              <p1>{developer}</p1>
            </div>
          </div>
          <div className="introText" data-type="text">
            <NewTextArea
              getText={(text) => setIntroText(text)}
              defaultValue={introText}
            />
          </div>
          <label>MQ project</label>
          <NewInput
            getInput={(project) => setMqproject(project)}
            placeholder=""
          />
        </div>

        <PickServiceButtons
          getService={(thisService) => {
            setThisService(thisService);
          }}
        />
        <MainTable
          getService={(serviceCall) => setThisService(serviceCall)}
          getTeamTable={(thisTeamTable) => setTeamTable(thisTeamTable)}
          getLanguages={(thisListOfLanguages) =>
            setThisListOfLanguages(thisListOfLanguages)
          }
          service={thisService}
          onChange={(e) => {
            tableChanged(e);
          }}
        />

        <RequestList
          getAttachments={(theseAttachments) => {
            setAttachments(theseAttachments);
            console.log(theseAttachments);
          }}
          getRequirements={(theseReqs) => {
            setRequirements(theseReqs);
            console.log(theseReqs);
          }}
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
