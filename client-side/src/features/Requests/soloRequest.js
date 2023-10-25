import { useParams } from "react-router-dom";
import GetRequest from "./fetchRequest.js";

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
    projectTitle,
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
    const team = languageTeam.slice(1);

    if (team) {
      for (let i = 0; i < team.length; i++) {
        let object = (
          <tr>
            <tr>
              <strong>{team[i].language}</strong>
            </tr>
            <td>{team[i].translator}</td>
            <td>{team[i].proofreader}</td>
          </tr>
        );
        array.push(object);
      }
    } else array.push("Loading...");

    return array;
  };

  let attachmentsLoop = attachments.map((item) => <li>{item}</li>);
  let reqsLoop = requirements.map((item) => <li>{item}</li>);

  return (
    <div className="SoloRequest">
      <div className="introduction">
        <h3>{projectTitle}</h3>
        <p1>{greeting}</p1>
        <br />
        <p1>{introText}</p1>
        <br /> <br />
        <label>Instructions:</label>
        <p1>{instructions}</p1>
      </div>
      <div className="details">
        <label>
          <b>
            <u>Details</u>
          </b>
        </label>
        <br />
        <label>
          <b>Videogame/App:</b>
        </label>
        <p1>{game}</p1> <br />
        <label>
          <b>MQ project:</b>
        </label>
        <p1>{mqproject}</p1> <br />
        <label>
          <b>Wordcound:</b>
        </label>
        <p1>{wordcount}</p1> <br />
        <label>
          <b>Files in scope:</b>
        </label>
        <p1>{files}</p1> <br />
      </div>
      <br></br>
      <div className="TeamsTable">
        <label>
          {" "}
          <u>Teams</u>
        </label>
        <table className="">
          <thead>
            <th></th>
            <th>Translation</th>
            <th>Proofreading</th>
          </thead>
          <tbody>{teamTableLoop()}</tbody>
        </table>
      </div>
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
        <ul>TRA: {deadlines.translation}</ul>
        <ul>PRF: {deadlines.proofreading}</ul>
      </div>
    </div>
  );
}

export default SoloRequest;
