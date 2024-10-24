import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

/* SMALL COMPONENTS */
import RequestList from "./elements/att-req-lists.jsx";
import PickServiceButtons from "./elements/PickServiceButtons.js";
import MainTable from "../../features/Vendors/VendorsTable/MainTable.js";
import NewInput from "./elements/NewInput.js";
import NewTextArea from "./elements/textArea_general.js";
import TextAreaComponent from "../../features/templates/textArea_instructions.js";
import GreetingsDropdownMenu from "./elements/GreetingsDropdownMenu.js"; /* DEFAULT VARIABLES */
import { initialParagraph, randomGreetings } from "../../apis";
import { mongoDB_Request } from "../../apis";
import { mongoDB_Users } from "../../apis";

import MainTableRemanu from "../../features/Vendors/VendorsTable/MainTableRemanu.js";

/* DATABASE DEPENDENCIES*/
import CreateDeadlines from "../../features/templates/createDeadlines";
import { GetGames } from "../../features/Games/fetchGames";

function NewRequest(props) {
  const user = useSelector((state) => state.user);
  const [projectTitle, setProjectTitle] = useState();
  const [greetings, setGreetings] = useState(randomGreetings[0]);
  const [instructions, setInstructions] = useState("");
  const [attachments, setAttachments] = useState();
  const [requirements, setRequirements] = useState();
  const [thisService, setThisService] = useState("TEP");
  const [transDL, setTransDL] = useState();
  const [proofDL, setProofDL] = useState();
  const [teamTable, setTeamTable] = useState();
  const [game, setGame] = useState();
  const [mqproject, setMqproject] = useState();
  const [wordcount, setWordcount] = useState();
  const [files, setFiles] = useState();
  const [introText, setIntroText] = useState();
  const [thisListOfLanguages, setThisListOfLanguages] = useState();

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

  const tableChanged = (e) => {
    let table = document.getElementsByTagName("table")[0];
    let rows = table.rows;
    let tableToObjectArr = [];

    for (let index = 0; index < rows.length; index++) {
      let language = rows[index].id;
      
      console.log(rows[index]);

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
      console.log(result);
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

    let attFormatted = attachments.map((att) => att.value);
    let reqFormatted = requirements.map((req) => req.value);

    setGame(document.getElementById("gamesSelectOptions").value);
    setGreetings(document.getElementById("greetingsSelectOptions").value);

    const object = {
      userId: user._id,
      title: projectTitle,
      game: document.getElementById("gamesSelectOptions").value,
      greeting: document.getElementById("greetingsSelectOptions").value,
      introText: introText,
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
    if (
      !projectTitle ||
      !wordcount ||
      !introText ||
      !teamTable.length ||
      !mqproject ||
      !files
    ) {
      alert("Please make sure all required fields are filled.");
      return;
    }

    Axios.post(mongoDB_Request, {
      userId: user._id,
      title: projectTitle,
      greeting: document.getElementById("greetingsSelectOptions").value,
      introText: initialParagraph,
      instructions: instructions,
      game: document.getElementById("gamesSelectOptions").value,
      wordcount: wordcount,
      mqproject: mqproject,
      files: files,
      service: thisService,
      languageTeam: teamTable,
      attachments: attachments,
      requirements: requirements,
      deadlines: { translation: transDL, proofreading: proofDL },
    })
      .then(function (response) {
        if (response.status == 200) {
          Axios.patch(mongoDB_Users, {
            userId: user._id,
            reqId: response.data,
          });

          window.location.replace(`/Request/${response.data}`);
        }
      })
      .catch((err) => {
        alert(
          "The request wasnt createDispatchHook, please make sure all required fields are filled"
        );
        console.log(err);
      });
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
            <NewInput getInput={(title) => setProjectTitle(title)} />
            <div className="introText" data-type="select">
              <GreetingsDropdownMenu getGreet={(item) => setGreetings(item)} />
              <NewTextArea
                getText={(text) => setIntroText(text)}
                defaultValue={greetings}
              />
            </div>{" "}
            <div className="textAreaAddInstructions">
              <TextAreaComponent
                changeInstructions={(thisInstructions) =>
                  setInstructions(thisInstructions)
                }
              />
            </div>
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
                  <label>File(s)</label>
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
            <MainTableRemanu
              getService={(serviceCall) => setThisService(serviceCall)}
              getTeamTable={(thisTeamTable) => {
                setTeamTable(thisTeamTable);
                console.log(thisTeamTable);
              }}
              getLanguages={(thisListOfLanguages) =>
                setThisListOfLanguages(thisListOfLanguages)
              }
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
