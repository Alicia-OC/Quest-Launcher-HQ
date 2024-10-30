import { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { mongoDB_Games } from "../../apis";

const editButton = (e) => {
  let id = e.currentTarget.id;
  alert("Edit not available yet! Sorry :C");
};

const GameCard = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const { gameTitle } = useParams();
  const [game, setGame] = useState(null);
  console.log(gameTitle);
  const getGame = async () => {
    try {
      const res = await Axios.get(mongoDB_Games + `/${gameTitle}`, {
        params: { gameTitle },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGame(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGame();
  }, [user?._id, token]);

  if (game === null) {
    return (
      <div>
        <p1>
          Sorry! Our database is currently on strike and they will only show you
          our top vendor:
        </p1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="addNewVendorButton">
          <Link to="/NewGame">Add a new game</Link>
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col">Developer</th>
              <th scope="col">Title</th>
              <th scope="col">Links</th>
              <th scope="col">Languages</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {" "}
            <tr value={game._id} key={game._id} id={game._id}>
              {" "}
              <td>{game.developer}</td>
              <td>{game.title}</td>
              <td>{game.links}</td>
              <td>{game.languages}</td>
              <td>
                <button className="VendorsListEditButton">
                  <FontAwesomeIcon icon={faEdit} />{" "}
                </button>
              </td>{" "}
              <td>
                <button>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>{" "}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default GameCard;
