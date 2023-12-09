import { useState, useEffect } from "react";
import { mongoDB_Template } from "../../apis";
import Axios from "axios";

const GetTemplate = () => {
  const [template, setTemplate] = useState();
  useEffect(() => {
    Axios.get(mongoDB_Template)
      .then((res) => setTemplate(res.data))
      .catch((err) => console.log(err));
  }, []);

  return template;
};

export default GetTemplate;
