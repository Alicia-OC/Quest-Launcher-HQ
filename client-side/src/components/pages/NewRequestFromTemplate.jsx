import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

/* SMALL COMPONENTS */
import RequestLists from "./elements/att-req-lists.jsx";
import PickServiceButtons from "./elements/PickServiceButtons.js";
import MainTable from "../../features/Vendors/VendorsTable/MainTable.js";
import NewInput from "./elements/NewInput.js";
import NewTextArea from "./elements/textArea_general.js";
import GreetingsDropdownMenu from "./elements/GreetingsDropdownMenu.js";

/* DATABASE DEPENDENCIES*/
import CreateDeadlines from "../../features/templates/createDeadlines.js";
import { mongoDB_Request } from "../../apis.js";
import { randomGreetings } from "../../apis.js";

import GetTemplate from "../../features/templates/GetTemplate.js";

function NewRequestFromTemplate(props) {
  const user = useSelector((state) => state.user);

  const template = GetTemplate();
  const { templateReqId } = useParams();

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
    title,
    mqproject,
    languageTeam,
    attachments,
    requirements,
  } = templateObject;

  const [projectTitle, setprojectTitle] = useState();
  const [greetings, setGreetings] = useState(randomGreetings[0]);
  const [thisIntroText, setThisIntroText] = useState(introText);
  const [thisInstructions, setThisInstructions] = useState("");
  const [wordcount, setWordcount] = useState();
  const [newMqproject, setNewMqproject] = useState(mqproject);
  const [files, setFiles] = useState();
  const [thisService, setThisService] = useState("TEP");
  const [teamTable, setTeamTable] = useState();
  const [thisAttachments, setThisAttachments] = useState([]);
  const [thisRequirements, setThisRequirements] = useState([]);
  const [transDL, setTransDL] = useState();
  const [proofDL, setProofDL] = useState();
  const [thisListOfLanguages, setThisListOfLanguages] = useState([]);


  useEffect(() => {
    if (templateObject) {
      setThisIntroText(introText);
      setThisInstructions(instructions);
      setNewMqproject(mqproject);
    }
  }, [templateObject]);

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

  async function HandleSubmit(e) {
    e.preventDefault();

    const object = {
      title: projectTitle,
      game: game,
      greeting: document.getElementById("greetingsSelectOptions").value,
      introText: thisIntroText,
      instructions: thisInstructions,
      wordcount: wordcount,
      mqproject: newMqproject,
      service: thisService,
      files: files,
      languageTeam: teamTable,
      attachments: thisAttachments,
      requirements: thisRequirements,
      deadlines: { translation: transDL, proofreading: proofDL },
    };
    console.log(object);

    if (!projectTitle || !wordcount || !newMqproject || !teamTable.length) {
      alert("Please make sure all required fields are filled.");
      return;
    }

    let attFormatted = thisAttachments.map((att) => att.value);
    let reqFormatted = thisRequirements.map((req) => req.value);

    for (let i = 0; i < attachments.length; i++) {
      attFormatted.push(attachments[i]);
    }

    for (let i = 0; i < requirements.length; i++) {
      reqFormatted.push(requirements[i]);
    }

    try {
      const res = await Axios.post(mongoDB_Request, {
        userId: user._id,
        title: projectTitle,
        game: game,
        greeting: document.getElementById("greetingsSelectOptions").value,
        introText: thisIntroText,
        instructions: thisInstructions,
        wordcount: wordcount,
        mqproject: mqproject,
        service: thisService,
        files: files,
        languageTeam: teamTable,
        attachments: thisAttachments,
        requirements: thisRequirements,
        deadlines: { translation: transDL, proofreading: proofDL },
      });

      alert(`New request ${projectTitle} has been created!`);
      window.location.replace(`/Request/${res.data}`);
    } catch (error) {
      console.log(error);
      alert(
        "The quest hasn't been created properly, please make sure all the required fields are filled"
      );
    }
  }

  if (templateObject) {
    return (
      <div>
        <div>
          <form>
            <p className="requestWarning">
              {" "}
              **You are using the template <i>{title}</i> for this request
            </p>
            <label className="">Project title:</label>
            <NewInput
              getInput={(title) => setprojectTitle(title)}
              placeholder="Write your request's title here"
            />
            <br></br>
            <br></br>
            <GreetingsDropdownMenu getGreet={(item) => setGreetings(item)} />

            <div className="introText" data-type="select">
              <NewTextArea
                getText={(text) => setThisIntroText(text)}
                defaultValue={greetings + " " + introText}
              />
              <label>Specific instructions:</label>
              <NewTextArea
                getText={(text) => setThisInstructions(text)}
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
                  <label>MQ project:</label> {mqproject}
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
              getLanguages={(thisListOfLanguages) =>
                setThisListOfLanguages(thisListOfLanguages)
              }
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
    return "Template not found.";
  }
}

export default NewRequestFromTemplate;
