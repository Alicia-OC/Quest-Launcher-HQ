import GetTemplate from "./GetTemplate.js";
import { useNavigate } from "react-router-dom";


function TemplateList() {
  const navigate = useNavigate();

  const template = GetTemplate();


  const handleClick = (e, id) => {
    console.log(id);
    e.preventDefault();
    navigate("/NewRequestFromTemplate/" + id);
  };


  let templateArr = [];
  if (template) {
    for (let i = 0; i < template.length; i++) {
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
