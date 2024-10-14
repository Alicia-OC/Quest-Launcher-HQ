import { GetGames } from "./fetchGames";

const GamesList = ({}) => {
  let games = GetGames();

  if (games) {
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
          <tbody>
            {games.map((item) => {
              return (
                <tr id={item._id}>
                  <td>{item.title}</td>
                  <td>
                    {" "}
                    <td>{item.developer}</td>
                  </td>
                  <td>{item.languages.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <p1>Loading...</p1>
      </div>
    );
  }
};

export default GamesList;
