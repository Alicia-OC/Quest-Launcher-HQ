import { useParams } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { useEffect, useState } from "react";

import GetTemplate from "./GetTemplate";
import NewInput from "../../components/pages/elements/NewInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { mongoDB_Template } from "../../apis";

/**CSS */

import "../../containers/css/SoloRequest.css";

function SoloTemplate() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const { templateId } = useParams();
  const request = GetTemplate();
  let filteredObject;
  let requestObject = {};

  const [newMqTitle, setNewMqTitle] = useState(null);

  useEffect(() => {
    console.log(newMqTitle);
  }, [newMqTitle]);

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
    mqproject,
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
  let langsLoop = languageTeam.map((item) => item).join(" - ");

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/NewRequestFromTemplate/" + _id);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(newMqTitle);

    try {
      const res = await Axios.patch(
        `${mongoDB_Template}/${_id}`,
        {
          userId: user._id,
          id: templateId,
          mqproject: newMqTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(
        "Error while saving:",
        error.response?.data || error.message
      );
    }
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
        <label>Videogame: </label> <p1>{game}</p1>
        <br />
        <label>Developer: </label> <p1>{developer}</p1>
        <br />
        <p1 className="main-paragraph-rendered">{parse(introText)}</p1>
        <br />
        <label>
          <b>Specific instructions: </b>
        </label>
        {instructionsBlock()}
        <br />
        <br />
        <label>
          <b>MemoQ project title:</b>
        </label>
        <NewInput
          getInput={(title) => setNewMqTitle(title)}
          parentData={mqproject}
        />
      </div>
      <br />
      <div className="teamTableDisplayed">
        <label>
          <b>Languages included:</b>
        </label>
        <p1>{langsLoop}</p1>
      </div>
      <br />{" "}
      <div className="req-att-list">
        <label>Attachments list</label> <br></br>
        <ul>{attachmentsLoop}</ul>
        <label>Requirements list </label>
        <br></br>
        <ul> {reqsLoop}</ul>
      </div>
      <button onClick={(e) => handleSave(e)}>Save</button>
    </div>
  );
}

export default SoloTemplate;
