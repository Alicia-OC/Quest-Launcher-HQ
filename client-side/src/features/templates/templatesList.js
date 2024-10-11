import { useNavigate } from "react-router-dom";
import StarButton from "../../components/pages/elements/StarButton.js";
import { useSelector } from "react-redux";

function TemplateList() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user); //
  const templates = user.templates;
  const templateArr = [];

  const handleClick = (e, id) => {
    console.log(id);
    e.preventDefault();
    navigate("/NewRequestFromTemplate/" + id);
  };

  if (templates) {
    for (let i = 0; i < templates.length; i++) {
      templateArr.push(
        <li
          className="itemTemplateList"
          key={templates[i]._id}
          id={templates[i]._id}
          value={templates[i].title}
        >
          <a href={"Template/" + templates[i]._id} className="libraryDiv">
            {" "}
            {templates[i].title}
          </a>
          <button
            className="buttonNew"
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
    <div className="libraryDiv">
      <h2>Your templates:</h2>

      <button>Create new</button>
      <ul>{templateArr}</ul>
    </div>
  );
}

export default TemplateList;
