import { useState, useEffect } from "react";
import { mongoDB_Languages } from "../../apis";
import Axios from "axios";

const GetLanguages = () => {
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    Axios.get(mongoDB_Languages)
      .then((res) => setLanguages(res.data))
      .catch((err) => console.log(err));
  }, []);

  return languages;
};

const GetFIGS = () => {
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    Axios.get(mongoDB_Languages)
      .then((res) => setLanguages(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredFIGS = languages.slice(0, 4);
  let arr = [];
  for (let index = 0; index < filteredFIGS.length; index++) {
    arr.push(filteredFIGS[index].language);
  }

  return arr;
};

const GetFIGSOBJ = () => {
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    Axios.get(mongoDB_Languages)
      .then((res) => setLanguages(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredFIGS = languages.slice(0, 4);
  let arr = [];
  for (let index = 0; index < filteredFIGS.length; index++) {
    arr.push(filteredFIGS[index]);
  }

  return arr;
};

export { GetLanguages, GetFIGS, GetFIGSOBJ };
