import { GetDevelopers } from "./fetchDevelopers";

const DevelopersList = () => {
  let devs = GetDevelopers();
  //const gamesArray = games.map((game) => game);
  let array = [];

  if (devs) {
    for (let i = 0; i < devs.length; i++) {
      let gamesArr = devs[i].games;

      array.push(
        <tr id={devs[i]._id}>
          <td>{devs[i].name}</td>
          <td>
            {gamesArr.map((game) => (
              <ol>
                <li>{game}</li>
              </ol>
            ))}
          </td>
        </tr>
      );
    }
  } else {
    array.push("Loading...");
  }

  if (!devs) {
    return (
      <div>
        <p1>Loading...</p1>
      </div>
    );
  } else {
    return (
      <div>
        <table className="DevelopersList">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Videogames</th>
            </tr>
          </thead>
          <tbody>{array}</tbody>
        </table>
      </div>
    );
  }
};

export default DevelopersList;
