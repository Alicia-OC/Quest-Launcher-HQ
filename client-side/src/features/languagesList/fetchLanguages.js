import { useState, useEffect } from "react";
import { mongoDB_Languages } from "../../apis";
import Axios from "axios";


const GetLanguages = () => {
  const [languages, setLanguages] = useState();
  useEffect(() => {
    Axios.get(mongoDB_Languages)
      .then((res) => setLanguages(res.data))
      .catch((err) => console.log(err));
  }, []);

  return languages;
};


export { GetLanguages };
