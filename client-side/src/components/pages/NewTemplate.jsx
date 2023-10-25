import React, { useState } from "react";
import Axios from "axios";

/* SMALL COMPONENTS */
import RequestList from "../../features/templates/att-req-lists";
import TextAreaComponent from "../../features/templates/textArea";
import MainTable from "../../features/Vendors/VendorsTable/MainTable";

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


function NewTemplate() {
  const [instructions, setInstructions] = useState();
  const [attachments, setAttachments] = useState();
  const [requirements, setRequirements] = useState();
  const [thisService, setThisService] = useState();
  const [templateTitle, setTemplateTitle] = useState();
  const [developer, setDeveloper] = useState();

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

  const GetDeveloper = (e) => {
    e.preventDefault();
    const element = document.querySelector("#gamesSelectOptions");
    const id = element.options[element.selectedIndex].id;
    const findDeveloper = DB_games.find((dev) => dev._id === id);

    setDeveloper(findDeveloper.developer);
  };

  function HandleSubmit(e) {
    e.preventDefault();
    setTemplateTitle(document.getElementById("titleInput").value);
    const object = {
      templateTitle: templateTitle,
      game: document.getElementById("gamesSelectOptions").value,
      developer: document.getElementById("developerSelectOptions").value,
      instructions: instructions,
      languageTeam: {
        language: "dsad",
        translator: "dassa",
        proofreader: "dassd",
      },
      attachments: attachments,
      requirements: requirements,
    };

    Axios.post(mongoDB_Template, {
      templateTitle: templateTitle,
      game: document.getElementById("gamesSelectOptions").value,
      developer: document.getElementById("developerSelectOptions").value,
      instructions: instructions,
      languageTeam: {
        language: "dsad",
        translator: "dassa",
        proofreader: "dassd",
      },
      attachments: attachments,
      requirements: requirements,
    })
      .then(alert(`New template ${templateTitle} has been created!`))
      .catch((err) => console.log(err))
      .then(location.reload());

    console.log(object);
  }

  return (
    <div className="createTemplate">
      <form action="" method="">
        <div className="introductionParagraph">
          {" "}
          <div className="templateTitle">
            <label>Template title:</label>
            <input
              id="titleInput"
              type="text"
              placeholder="Write your template's name here"
            ></input>
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
            <p>{initialParagraph}</p>
          </div>
          <TextAreaComponent
            changeInstructions={(thisInstructions) =>
              setInstructions(thisInstructions)
            }
          />{" "}
        </div>

        <MainTable getService={(serviceCall) => setThisService(serviceCall)} />
        <RequestList
          getAttachments={(theseAttachments) =>
            setAttachments(theseAttachments)
          }
          getRequirements={(theseReqs) => setRequirements(theseReqs)}
        />

        <input
          type="submit"
          value="Save"
          onClick={(e) => HandleSubmit(e)}
        ></input>
      </form>
    </div>
  );
}

export default NewTemplate;
