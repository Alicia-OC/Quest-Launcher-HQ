import React, { useState } from "react";
import Axios from "axios";

/* SMALL COMPONENTS */
import RequestList from "../../features/templates/att-req-lists";
import TextAreaComponent from "../../features/templates/textArea";
import PickServiceButtons from "./elements/PickServiceButtons.js";
import MainTable from "../../features/Vendors/VendorsTable/MainTable.js";
import NewInput from "./elements/NewInput.js";

/* DEFAULT VARIABLES */
import { initialParagraph, randomGreetings } from "../../apis";

/* DATABASE DEPENDENCIES*/
import CreateDeadlines from "../../features/templates/createDeadlines";
import { GetGames } from "../../features/Games/fetchGames";

function NewRequest(props) {
  const [projectTitle, setprojectTitle] = useState();
  const [greetings, setGreetings] = useState("hi");
  const [instructions, setInstructions] = useState("");
  const [attachments, setAttachments] = useState();
  const [requirements, setRequirements] = useState();
  const [thisService, setThisService] = useState();
  const [transDL, setTransDL] = useState();
  const [proofDL, setProofDL] = useState();
  const [teamTable, setTeamTable] = useState();
  const [game, setGame] = useState();
  const [mqproject, setMqproject] = useState();
  const [wordcount, setWordcount] = useState();
  const [files, setFiles] = useState();
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
  const GreetingsLoop = randomGreetings.map((greet) => (
    <option key={greet} value={greet}>
      {greet}
    </option>
  ));

  const randomgreeting = Math.floor(Math.random() * randomGreetings.length);
  function handleChange() {
    let greetingValue = document.querySelector("#greetingsSelectDropdown");
    setGreetings(greetingValue.value);
  }

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

  const listChanged = (e) => {
    console.log(e.target.value);
  };

  function HandleSubmit(e) {
    e.preventDefault();

    let attFormatted = attachments.map((att) => att.value);
    let reqFormatted = requirements.map((req) => req.value);

    setGame(document.getElementById("gamesSelectOptions").value);

    const object = {
      projectTitle: projectTitle,
      game: document.getElementById("gamesSelectOptions").value,
      greeting: document.getElementById("greetingsSelectOptions").value,
      introText: initialParagraph,
      instructions: instructions,
      wordcount: wordcount,
      mqproject: mqproject,
      service: thisService,
      files: files,
      languageTeam: teamTable,
      attachments: attFormatted,
      requirements: reqFormatted,
      deadlines: { translation: transDL, proofreading: proofDL },
    };
    console.log(object);

    /**Axios.post(mongoDB_Request, {
      projectTitle: document.getElementById("projectTitleInput").value,
      greeting: document.getElementById("greetingsSelectOptions").value,
      introText: initialParagraph,
      instructions: instructions,
      game: document.getElementById("gamesSelectOptions").value,
      mqproject: document.getElementById("mqProjectInput").value,
      wordcount: document.getElementById("wordcountInput").value,
      files: document.getElementById("filesInput").value,
      service: thisService,
      languageTeam: teamTable,
      attachments: attachments,
      requirements: requirements,
      deadlines: { translation: transDL, proofreading: proofDL },
    })
      .catch((err) => {
        alert(
          "The request wasnt createDispatchHook, please make sure all required fields are filled"
        );
        console.log(err);
      })
      .then(alert(`New request ${projectTitle} has been created!`)); */
  }

  /**      .then(location.reload());
   */
  return (
    <>
      <div className="">
        <div className="">
          <form>
            {" "}
            <label className="">Project title:</label>
            <NewInput
              getInput={(title) => setprojectTitle(title)}
              placeholder="Write your request's title here"
            />
            <div className="introText" data-type="select">
              <div className="dropDownGreetings" data-type="select">
                <select
                  id="greetingsSelectOptions"
                  className="greetingsSelectOptions"
                >
                  {GreetingsLoop}
                  <option value="Random greet">Random greet</option>
                </select>
              </div>
              <p>{initialParagraph}</p>
            </div>{" "}
            <TextAreaComponent
              changeInstructions={(thisInstructions) =>
                setInstructions(thisInstructions)
              }
            />
            <div className="projectDetailsParagraph">
              <div className="gamesDiv">
                <label>Game</label>
                <select id="gamesSelectOptions" className="gamesSelectOptions">
                  {GamesLoop}
                </select>
              </div>
              <ul>
                <li>
                  <label>MQ project</label>
                  <NewInput
                    getInput={(project) => setMqproject(project)}
                    placeholder=""
                  />
                </li>
                <li>
                  <label>WC</label>
                  <NewInput
                    getInput={(number) => setWordcount(number)}
                    placeholder=""
                  />
                </li>
                <li>
                  {" "}
                  <label>Files</label>
                  <NewInput
                    getInput={(name) => setFiles(name)}
                    placeholder=""
                  />
                </li>
              </ul>
            </div>
            <PickServiceButtons
              getService={(thisService) => {
                setThisService(thisService);
              }}
            />
            <MainTable
              getService={(serviceCall) => setThisService(serviceCall)}
              getTeamTable={(thisTeamTable) => setTeamTable(thisTeamTable)}
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
              onChange={(e) => {
                listChanged(e);
              }}
            />
            <CreateDeadlines
              setService={thisService}
              getTransDL={(thisDL) => setTransDL(thisDL)}
              getProofDL={(thisDL) => setProofDL(thisDL)}
            />
          </form>{" "}
          <input
            type="submit"
            value="Create"
            onClick={(e) => HandleSubmit(e)}
          ></input>
        </div>
      </div>
    </>
  );
}

export default NewRequest;
