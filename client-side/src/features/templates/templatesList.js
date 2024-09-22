import { useNavigate } from "react-router-dom";
import StarButton from "../../components/pages/elements/StarButton.js";
import { useDispatch, useSelector } from "react-redux";

function TemplateList() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user); //
  const templates = user.templates;
  const templateArr = [];
  console.log(templates)

  const handleClick = (e, id) => {
    console.log(id);
    e.preventDefault();
    navigate("/NewRequestFromTemplate/" + id);
  };


  if (templates) {
    for (let i = 0; i < templates.length; i++) {
      templateArr.push(
        <li className="itemTemplateList"
          key={templates[i]._id}
          id={templates[i]._id}
          value={templates[i].templateTitle}
        >
          <a href={"Template/" + templates[i]._id} className="templateList">
            {" "}
            {templates[i].templateTitle}
          </a>
          <button
            className="btnTemplateList"
            onClick={(e) => {
              handleClick(e, templates[i]._id);
            }}
          >
            New
          </button>
          <StarButton
            isStarred={templates[i].favorite}
            getId={templates[i]._id}
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
