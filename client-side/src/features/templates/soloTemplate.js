import { useParams } from "react-router-dom";
import GetTemplate from "./GetTemplate";
import { useNavigate } from "react-router-dom";
import NavigateToTemplate from "./navigateToTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
/**CSS */

import "../../containers/css/SoloRequest.css";

function SoloTemplate() {
  const { templateId } = useParams();
  const request = GetTemplate();
  const navigate = useNavigate();

  let filteredObject;
  let requestObject = {};
  if (request) {
    filteredObject = request.filter((element) => element._id === templateId);
    Object.assign(requestObject, filteredObject[0]);
  } else {
    return "Loading...";
  }
  const {
    _id,
    templateTitle,
    game,
    introText,
    instructions,
    developer,
    languageTeam,
    attachments,
    requirements,
  } = requestObject;

  let teamTableLoop = () => {
    let array = [];

    if (languageTeam[0] === null) {
      console.log("test");
    }

    if (languageTeam[0] === null) {
      return (
        <p1>
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <b>No team settled for this template</b>
        </p1>
      );
    } else {
      for (let i = 0; i < languageTeam.length; i++) {
        let object = (
          <tr>
            <td className="languageColumnSoloRequest">{languageTeam[i].language}</td>
            <td>{languageTeam[i].translator}</td>
            <td>{languageTeam[i].proofreader}</td>
          </tr>
        );
        array.push(object);
      }
      return (
        <>
          <label>
            {" "}
            <u>Standard Team:</u>
          </label>
          <br />
          <br />
          <table>
            <thead>
              <th></th>
              <th>Translation</th>
              <th>Proofreading</th>
            </thead>
            <tbody>{array}</tbody>
          </table>
        </>
      );
    }
  };

  let instructionsBlock = () => {
    if (!instructions) {
      return "";
    } else {
      return (
        <>
          <p1>{instructions}</p1>
        </>
      );
    }
  };

  let attachmentsLoop = attachments.map((item) => <li>{item}</li>);
  let reqsLoop = requirements.map((item) => <li>{item}</li>);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(0);
    navigate("/NewRequestFromTemplate/" + _id);
  };

  return (
    <div className="SoloRequest">
      <h3>
        {templateTitle}
        <button
          className=""
          onClick={(e) => {
            handleClick(e);
          }}
        >
          New
        </button>
      </h3>
      <div className="introduction">
        <label>Videogame/App: </label> <p1>{game}</p1>
        <br />
        <label>Developer: </label> <p1>{developer}</p1>
        <br /> <br />
        <p1>{introText}</p1>
        <br /> <br />
        <label>Specific instructions: </label>
        {instructionsBlock()}
        <br />
      </div>
      <br />
      <div className="teamTableDisplayed">{teamTableLoop()}</div>
      <br />{" "}
      <div className="req-att-list">
        <label>Attachments list</label> <br></br>
        <ul>{attachmentsLoop}</ul>
        <label>Requirements list </label>
        <br></br>
        <ul> {reqsLoop}</ul>
      </div>
    </div>
  );
}

export default SoloTemplate;
