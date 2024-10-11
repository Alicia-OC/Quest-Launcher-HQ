import { useParams } from "react-router-dom";
import GetTemplate from "./GetTemplate";
import { useNavigate } from "react-router-dom";

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
    title,
    game,
    introText,
    instructions,
    developer,
    languageTeam,
    attachments,
    requirements,
  } = requestObject;

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
  let langsLoop = languageTeam.map(item => item).join(' - ');

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/NewRequestFromTemplate/" + _id);
  };

  return (
    <div className="SoloRequest">
      <h3>
        {title}
        <button
          className="buttonNew"
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
        <label><b>Specific instructions: </b></label>
        {instructionsBlock()}
        <br />
      </div>
      <br />
      <div className="teamTableDisplayed"><label><b>Languages included:</b></label><p1>{langsLoop}</p1></div>
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
