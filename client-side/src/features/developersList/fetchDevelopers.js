import { useState, useEffect } from "react";
import { mongoDB_Developers } from "../../apis";
import Axios from "axios";

const GetDevelopers = () => {
  const [developers, setDevelopers] = useState();
  useEffect(() => {
    Axios.get(mongoDB_Developers)
      .then((res) => setDevelopers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return developers;
};


export { GetDevelopers };
