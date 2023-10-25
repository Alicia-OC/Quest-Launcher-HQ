import { GetGames } from "./fetchGames";
import { Link } from "react-router-dom";

const GamesList = ({}) => {
  let games = GetGames();
  //const gamesArray = games.map((game) => game);
  let array = [];

  if (games) {
    for (let i = 0; i < games.length; i++) {
      array.push(
        <tr id={games[i]._id}>
          <td>{games[i].title}</td>
          <td>
            {" "}
            <td>{games[i].developer}</td>
          </td>
          <td>{games[i].languages.toString()}</td>
        </tr>
      );
    }
  } else {
    array.push("Loading...");
  }

  if (!games) {
    return (
      <div>
        <p1>
        Loading...
        </p1>
      </div>
    );
  } else {
    return (
      <div className="GamesList">
        <table>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Developer</th>
              <th scope="col">Languages</th>
            </tr>
          </thead>
          <tbody>{array}</tbody>
        </table>
      </div>
    );
  }
};

export default GamesList;
