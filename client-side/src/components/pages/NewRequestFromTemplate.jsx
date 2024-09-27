import React, { useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

/* SMALL COMPONENTS */
import RequestLists from "./elements/att-req-lists.jsx";
import PickServiceButtons from "./elements/PickServiceButtons.js";
import MainTable from "../../features/Vendors/VendorsTable/MainTable.js";
import NewInput from "./elements/NewInput.js";
import NewTextArea from "./elements/NewTextArea.js";

/* DATABASE DEPENDENCIES*/
import CreateDeadlines from "../../features/templates/createDeadlines.js";
import { randomGreetings } from "../../apis.js";
import { mongoDB_Request } from "../../apis.js";

import GetTemplate from "../../features/templates/GetTemplate.js";

function NewRequestFromTemplate() {
  const template = GetTemplate();
  const { templateReqId } = useParams();
  const [projectTitle, setprojectTitle] = useState();
  const [greetings, setGreetings] = useState("hi");

  let filteredObject;
  let templateObject = {};
  if (template) {
    filteredObject = template.filter(
      (element) => element._id === templateReqId
    );
    Object.assign(templateObject, filteredObject[0]);
  }

  const {
    game,
    introText,
    instructions,
    developer,
    templateTitle,
    languageTeam,
    attachments,
    requirements,
  } = templateObject;

  const [instructionsIsEditable, setInstructionsIsEditable] = useState(false);
  const [instructionsContent, setInstructionsContent] = useState(instructions);
  const [thisIntroText, setThisIntroText] = useState(instructions);
  const [wordcount, setWordcount] = useState();
  const [mqproject, setMqproject] = useState();
  const [files, setFiles] = useState();
  const [thisService, setThisService] = useState();
  const [teamTable, setTeamTable] = useState();
  const [thisAttachments, setThisAttachments] = useState();
  const [thisRequirements, setThisRequirements] = useState();
  const [transDL, setTransDL] = useState();
  const [proofDL, setProofDL] = useState();

  const randomgreeting = Math.floor(Math.random() * randomGreetings.length);

  const listChanged = (e) => {
    console.log(e.target.value);
  };

  function handleChange() {
    let greetingValue = document.querySelector("#greetingsSelectDropdown");
    setGreetings(greetingValue.value);
  }
  const GreetingsLoop = randomGreetings.map((greet) => (
    <option key={greet} value={greet}>
      {greet}
    </option>
  ));

  const editInstructions = (e) => {
    e.preventDefault();
    setInstructionsIsEditable(!instructionsIsEditable);
    console.log(instructionsIsEditable);
    instructionsIsEditable
      ? setInstructionsContent("hello")
      : setInstructionsContent("hi");
    setThisIntroText(<textarea></textarea>);
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

  function HandleSubmit(e) {
    e.preventDefault();
    let attFormatted = thisAttachments.map((att) => att.value);
    let reqFormatted = thisRequirements.map((req) => req.value);

    for (let i = 0; i < attachments.length; i++) {
      attFormatted.push(attachments[i]);
    }

    for (let i = 0; i < requirements.length; i++) {
      reqFormatted.push(requirements[i]);
    }

    const object = {
      creationDate: new Date(),
      projectTitle: projectTitle,
      game: game,
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

    Axios.post(mongoDB_Request, {
      creationDate: new Date(),
      projectTitle: projectTitle,
      game: game,
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
    })
      .catch((err) => {
        alert(
          "The request wasnt createDispatchHook, please make sure all required fields are filled"
        );
        console.log(err);
      })
      .then(alert(`New request ${projectTitle} has been created!`));
  }

  if (templateObject) {
    return (
      <div>
        <div>
          <form>
            <p className="requestWarning">
              {" "}
              **You are using the template <i>{templateTitle}</i> for this
              request
            </p>
            <label className="">Project title:</label>
            <NewInput
              getInput={(title) => setprojectTitle(title)}
              placeholder="Write your request's title here"
            />

            <div className="dropDownGreetings" data-type="select">
              <select
                id="greetingsSelectOptions"
                className="greetingsSelectOptions"
              >
                {GreetingsLoop}
                <option value="Random greet">Random greet</option>
              </select>
            </div>
            <div className="introText" data-type="select">
              <NewTextArea
                getText={(text) => setThisIntroText(text)}
                defaultValue={introText}
              />
              <p>Specific instructions:</p>
              <NewTextArea
                getText={(text) => setThisIntroText(text)}
                defaultValue={instructions}
              />
            </div>

            <div className="projectDetailsParagraph">
              <div className="gamesDiv">
                <label>Game: </label>
                <p1>
                  <b>{game}</b>, by <b>{developer}</b>
                </p1>
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
              languageTeam={languageTeam}
              service={thisService}
              languages={languageTeam}
              onChange={(e) => {
                tableChanged(e);
              }}
            />

            <RequestLists
              sendTemplateAttachments={attachments}
              sendTemplateRequirements={requirements}
              getAttachments={(theseAttachments) =>
                setThisAttachments(theseAttachments)
              }
              getRequirements={(theseReqs) => setThisRequirements(theseReqs)}
              onChange={(e) => {
                listChanged(e);
              }}
            />

            <CreateDeadlines
              setService={thisService}
              getTransDL={(thisDL) => setTransDL(thisDL)}
              getProofDL={(thisDL) => setProofDL(thisDL)}
            />
          </form>
          <input
            type="submit"
            value="Create"
            onClick={(e) => HandleSubmit(e)}
          ></input>
        </div>
      </div>
    );
  } else {
    return 'Template not found.'
  }
}

export default NewRequestFromTemplate;
