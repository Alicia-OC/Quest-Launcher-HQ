import { useNavigate } from "react-router-dom";
import StarButton from "../../components/pages/elements/StarButton.js";
import { mongoDB_Template } from "../../apis.js";
import { useDispatch, useSelector } from "react-redux";
import { setTemplates } from "../../state/index.js";
import { useEffect } from "react";

import Axios from "axios";


function TemplateList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);
  const templates = user.templates;
  const templateArr = [];

  const getTemplates = async () => {
    Axios.get(mongoDB_Template + `/${user._id}/alltemplates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(setTemplates({ templates: res.data }));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTemplates();
    console.log(templates);
  }, []);

  const handleClick = (e, id) => {
    console.log(id);
    e.preventDefault();
    navigate("/NewRequestFromTemplate/" + id);
  };

  
/**if (user !== null) {
    getTemplates();
  } */  

  if (templates) {
    for (let i = 0; i < templates.length; i++) {
      templateArr.push(
        <li
          key={templates[i]._id}
          id={templates[i]._id}
          value={templates[i].templateTitle}
        >
          <a href={"Template/" + templates[i]._id}>
            {" "}
            {templates[i].templateTitle}
          </a>
          <button
            className=""
            onClick={(e) => {
              handleClick(e, templates[i]._id);
            }}
          >
            New
          </button>
          <StarButton
            isStarred={templates[i].favorite}
            getId={templates[i]._id}
            isToUpdateBackend={true}
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
