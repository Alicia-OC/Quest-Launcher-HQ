import { useState } from "react";
import GetTemplate from "./GetTemplate.js";
import { useNavigate } from "react-router-dom";
import StarButton from "../../components/pages/elements/StarButton.js";

function TemplateList() {
  const navigate = useNavigate();
  const template = GetTemplate();
  const [templateStarred, setTemplateStarred] = useState();

  const handleClick = (e, id) => {
    console.log(id);
    e.preventDefault();
    navigate("/NewRequestFromTemplate/" + id);
  };

  let templateArr = [];
  if (template) {
    let isStarred;

    for (let i = 0; i < template.length; i++) {
      if (template[i].favorite) {
        isStarred = true;
      } else {
        isStarred = false;
      }

      templateArr.push(
        <li id={template[i]._id} value={template[i].templateTitle}>
          <a href={"Template/" + template[i]._id}>
            {" "}
            {template[i].templateTitle}
          </a>
          <button
            className=""
            onClick={(e) => {
              handleClick(e, template[i]._id);
            }}
          >
            New
          </button>
          <StarButton
            getStar={(star) => setTemplateStarred(star)}
            isStarred={isStarred}
          />
        </li>
      );
    }
  }

  return (
    <div className="TemplateListed">
      <button>Create new</button>
      <ul>{templateArr}</ul>
    </div>
  );
}

export default TemplateList;