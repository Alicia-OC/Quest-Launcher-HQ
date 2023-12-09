import GetTemplate from "./GetTemplate";
import { useNavigate } from "react-router-dom";

function NavigateToTemplate(templateId) {
  const template = GetTemplate();
  const navigate = useNavigate();

  let filteredObject;
  let templateObject = {};
  if (template) {
    filteredObject = template.filter((element) => element._id === templateId);
    Object.assign(templateObject, filteredObject[0]);

    navigate("Request/" + filteredObject._id);
  } else {
    return "Loading...";
  }
}

export default NavigateToTemplate;
