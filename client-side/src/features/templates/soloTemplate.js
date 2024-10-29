import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";

import parse from "html-react-parser";
import NewInput from "../../components/pages/elements/NewInput";

import { mongoDB_Template } from "../../apis";

/**CSS */

import "../../containers/css/SoloRequest.css";

function SoloTemplate() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const { templateId } = useParams();

  const [newMqTitle, setNewMqTitle] = useState(null);
  const [templateIs, setTemplateIs] = useState(null);

  const templateInScope = async () => {
    try {
      const res = await Axios.get(
        `${mongoDB_Template}/${user._id}/${templateId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTemplateIs(res.data);
    } catch (error) {
      console.error("Error fetching template:", error);
     
    }
  };

  useEffect(() => {
    templateInScope();
  }, [user?._id, token]);

  if (templateIs === null) {
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
  } = templateIs || {};

  let attachmentsLoop = attachments.map((item) => <li>{item}</li>);
  let reqsLoop = requirements.map((item) => <li>{item}</li>);
  let langsLoop = languageTeam.map((item) => item).join(" - ");

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/NewRequestFromTemplate/" + _id);
  };

  const handleSave = async (e) => {
    e.preventDefault();

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
        {instructions ? (
          <>
            <br />{" "}
            <label>
              <b>Notes: </b>
            </label>
            <p> {parse(instructions)}</p> <br />
          </>
        ) : null}
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
        <label>Deliverables list </label>
        <br></br>
        <ul> {reqsLoop}</ul>
      </div>
      <button onClick={(e) => handleSave(e)}>Save</button>
    </div>
  );
}

export default SoloTemplate;
