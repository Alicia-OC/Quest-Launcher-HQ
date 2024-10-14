import { useParams } from "react-router-dom";
import GetRequest from "./fetchRequest.js";
import parse from 'html-react-parser';


/**CSS */

import "../../containers/css/SoloRequest.css";

function SoloRequest() {
  const { requestId } = useParams();
  const request = GetRequest();

  let filteredObject;
  let requestObject = {};
  if (request) {
    filteredObject = request.filter((element) => element._id === requestId);
    Object.assign(requestObject, filteredObject[0]);
  } else {
    return "Loading...";
  }
  const {
    title,
    greeting,
    introText,
    instructions,
    game,
    mqproject,
    wordcount,
    files,
    languageTeam,
    attachments,
    requirements,
    deadlines,
  } = requestObject;

  let teamTableLoop = () => {
    let array = [];
    const team = languageTeam;

    if (team) {
      for (let i = 0; i < team.length; i++) {
        let object = (
          <tr>
            <td className="languageColumnSoloRequest">{team[i].language}</td>
            <td>{team[i].translator}</td>
            <td>{team[i].proofreader}</td>
          </tr>
        );
        array.push(object);
      }
    } else array.push("Loading...");

    return array;
  };

  let instructionsBlock = () => {
    if (instructions.length === 0) {
      return "";
    } else {
      return (
        <>
          <label>Specific Instructions: </label>
          {parse(instructions)}
        </>
      );
    }
  };

  let attachmentsLoop = attachments.map((item) => (
    <li key={item.value}>{item.value}</li>
  ));
  let reqsLoop = requirements.map((item) => <li key={item.value}>{item.value}</li>);

  return (
    <div className="SoloRequest">
      <div className="introduction">
        <h3>{title}</h3>
        <p1>{greeting},</p1>
        <br />
        <p1>{parse(introText)}</p1>
        <br /> <br />
        {instructionsBlock()}
        <br />
      </div>
      <div className="details">
        <label>
          <b>
            <u>Details</u>
          </b>
        </label>
        <br />
        <label>
          <b>Videogame/App: </b>
        </label>
        <p1>{game}</p1> <br />
        <label>
          <b>MQ project: </b>
        </label>
        <p1>{mqproject}</p1> <br />
        <label>
          <b>Wordcound: </b>
        </label>
        <p1>{wordcount} words</p1> <br />
        <label>
          <b>File in scope: </b>
        </label>
        <p1>{files}</p1> <br />
      </div>
      <br />{" "}
      <div className="teamTableDisplayed">
        <label>
          {" "}
          <u>Team:</u>
        </label>
        <br />
        <br />
        <table>
          <thead>
            <th></th>
            <th>Translation</th>
            <th>Proofreading</th>
          </thead>
          <tbody>{teamTableLoop()}</tbody>
        </table>
      </div>
      <br />{" "}
      <div className="req-att-list">
        <label>Attachments list</label> <br></br>
        <ul>{attachmentsLoop}</ul>
        <label>Requirements list </label>
        <br></br>
        <ul> {reqsLoop}</ul>
      </div>
      <div className="Deadlines">
        <label>Deadlines:</label>
        <br></br>

        <ul>
          <li>
            {" "}
            <strong>TRA: </strong>
            {deadlines.translation}
          </li>

          <li>
            {" "}
            <strong>PRF: </strong>
            {deadlines.proofreading}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SoloRequest;
