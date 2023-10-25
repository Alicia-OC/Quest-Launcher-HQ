import { useState, useEffect } from "react";
import { mongoDB_Games } from "../../apis";
import Axios from "axios";

const GetGames = () => {
  const [games, setGames] = useState();
  useEffect(() => {
    Axios.get(mongoDB_Games)
      .then((res) => setGames(res.data))
      .catch((err) => console.log(err));
  }, []);

  return games;
};


export { GetGames };
