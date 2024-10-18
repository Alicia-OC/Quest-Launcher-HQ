import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mongoDB_Template } from "../../apis";

/**CSS */
import "../../containers/css/SoloRequest.css";

function SoloTemplate() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [template, setTemplate] = useState(null);
  let filteredObject;
  let requestObject = {};



  const getTemplate = async () => {
    try {
      const res = await Axios.get(
        mongoDB_Template + `/${user._id}/${templateId}/test`,
        {
          params: { userId: user._id, templateId: templateId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTemplate(res.data);
    } catch (error) {
      console.log(error);
      setTemplate('')
    }
  };

  useEffect(() => {
    console.log('das');
    getTemplate();
    console.log(template);
  }, [templateId]);


  const handleClick = (e) => {
    e.preventDefault();
    navigate("/NewRequestFromTemplate/" + template._id);
  };
  return (
    <div className="SoloRequest">
      <h3>
        {template.title}
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
        <label>Videogame/App: </label> <p1>{template.game}</p1>
        <br />
        <label>Developer: </label> <p1>{template.developer}</p1>
        <br /> <br />
        <p1>{template.introText}</p1>
        <br /> <br />
        <label>
          <b>Specific instructions: </b>
        </label>
        {template.instructions}
        <br />
      </div>
      <br />
      <div className="teamTableDisplayed">
        <label>
          <b>Languages included:</b>
        </label>
        <p1>{template.languageTeam}</p1>
      </div>
      <br />{" "}
      <div className="req-att-list">
        <label>Attachments list</label> <br></br>
        <ul>{template.attachments}</ul>
        <label>Requirements list </label>
        <br></br>
        <ul> {template.requirements}</ul>
      </div>
    </div>
  );
}

export default SoloTemplate;
