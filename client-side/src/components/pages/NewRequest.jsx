import React, { useState } from "react";
import Axios from "axios";

/* SMALL COMPONENTS */
import RequestList from "../../features/templates/att-req-lists";
import TextAreaComponent from "../../features/templates/textArea";
import MainTable from "../../features/Vendors/VendorsTable/MainTable";


/* DEFAULT VARIABLES */
import { mongoDB_Request, initialParagraph, randomGreetings } from "../../apis";

/* DATABASE DEPENDENCIES*/
import CreateDeadlines from "../../features/templates/createDeadlines";
import { GetGames } from "../../features/Games/fetchGames";

function NewRequest() {
  const [greetings, setGreetings] = useState("hi");
  const [instructions, setInstructions] = useState();
  const [attachments, setAttachments] = useState();
  const [requirements, setRequirements] = useState();
  const [thisService, setThisService] = useState();
  const [transDL, setTransDL] = useState();
  const [proofDL, setProofDL] = useState();
  const [projectTitle, setprojectTitle] = useState();
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
  /** const GamesLoop = games.map((game) => (
    <option id={game} key={game} value={game}>
      {game}
    </option>
  ));
*/
  const randomreeting = Math.floor(Math.random() * randomGreetings.length);
  function handleChange() {
    let greetingValue = document.querySelector("#greetingsSelectDropdown");
    setGreetings(greetingValue.value);
  }

  function HandleSubmit(e) {
    e.preventDefault();
    setprojectTitle(document.getElementById("projectTitleInput").value);
    setGame(document.getElementById("gamesSelectOptions").value);
    setMqproject(document.getElementById("mqProjectInput").value);
    setWordcount(document.getElementById("wordcountInput").value);
    setFiles(document.getElementById("filesInput").value);
    const object = {
      projectTitle: document.getElementById("projectTitleInput").value,
      game: document.getElementById("gamesSelectOptions").value,
      greeting: document.getElementById("greetingsSelectOptions").value,
      introText: initialParagraph,
      instructions: instructions,
      service: thisService,
      languageTeam: teamTable,
      attachments: attachments,
      requirements: requirements,
      deadlines: { translation: transDL, proofreading: proofDL },
    };
    console.log(teamTable);

    Axios.post(mongoDB_Request, {
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
      .then(alert(`New request ${projectTitle} has been created!`));
  }

  /**      .then(location.reload());
   */
  console.log();
  return (
    <>
      <div className="">
        <div className="">
          <form>
            {" "}
            <label className="">Request's title:</label>
            <input id="projectTitleInput"></input>
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
                  <input id="mqProjectInput" type="text"></input>
                </li>
                <li>
                  <label>WC</label>
                  <input id="wordcountInput" type="text"></input>
                </li>
                <li>
                  {" "}
                  <label>Files</label>
                  <input id="filesInput" type="text"></input>
                </li>
              </ul>
            </div>
            <MainTable
              getService={(serviceCall) => setThisService(serviceCall)}
              getTeamTable={(thisTeamTable) => setTeamTable(thisTeamTable)}
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
