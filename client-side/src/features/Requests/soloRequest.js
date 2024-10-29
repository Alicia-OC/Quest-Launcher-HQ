import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { mongoDB_Games, mongoDB_Request } from "../../apis.js";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

/**CSS */
import "../../containers/css/SoloRequest.css";

function SoloRequest() {
  const { requestId } = useParams();
  const [gameObj, setGameObj] = useState(null);

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [requestIs, setRequestIs] = useState(null);

  const requestInScope = async () => {
    try {
      const res = await Axios.get(
        `${mongoDB_Request}/${user._id}/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequestIs(res.data);
    } catch (error) {
      console.error("Error fetching template:", error);
    }
  };

  useEffect(() => {
    requestInScope();
  }, [user?._id, token]);

  const {
    title,
    greeting,
    introText,
    instructions,
    game,
    mqproject,
    wordcount,
    files,
    languageTeam,
    attachments,
    requirements,
    deadlines,
  } = requestIs || {};

  const GetDev = async () => {
    try {
      const res = await Axios.get(mongoDB_Games + `/${game}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGameObj(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (game && token) {
      GetDev();
    }
  }, [game, token]);

  if (requestIs === null) {
    return "Loading...";
  }

  const teamTableLoop = () => {
    let array = [];
    const team = languageTeam;

    if (team) {
      for (let i = 0; i < team.length; i++) {
        let object = (
          <tr key={i}>
            <td className="languageColumnSoloRequest">{team[i].language}</td>
            <td>{team[i].translator}</td>
            <td>{team[i].proofreader}</td>
          </tr>
        );
        array.push(object);
      }
    } else array.push("Loading...");

    return array;
  };

  const attachmentsLoop = attachments.map((item) => (
    <li key={item.value}>{item.value}</li>
  ));
  const reqsLoop = requirements.map((item) => (
    <li key={item.value}>{item.value}</li>
  ));

  return (
    <div className="SoloRequest">
      <div className="introduction">
        <h3>{title}</h3>
        <p>{greeting},</p>
        <br />
        <p>{parse(introText)}</p>

        {instructions ? (
          <>
            <br />{" "}
            <label>
              <b>Notes: </b>
            </label>
            <p> {parse(instructions)}</p> <br />
          </>
        ) : null}
      </div>
      <div className="details">
        <div>
          <strong>Videogame: </strong>
          {game}
        </div>
        {gameObj && (
          <div>
            <strong>Developer: </strong>
            {gameObj[0].developer}
          </div>
        )}
        <div>
          <strong>MQ project: </strong>
          {mqproject}{" "}
        </div>
        <div>
          <strong>Wordcount: </strong>
          {wordcount} words
        </div>
        <div>
          {" "}
          <strong>File in scope: </strong>
          {files}
        </div>
      </div>
      <br />{" "}
      <div className="teamTableDisplayed">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Translation</th>
              <th>Proofreading</th>
            </tr>
          </thead>
          <tbody>{teamTableLoop()}</tbody>
        </table>
      </div>
      <br />{" "}
      <div className="req-att-list">
        <label>Attachments list</label> <br />
        <ul>{attachmentsLoop}</ul> <br />
        <label>Deliverables list </label>
        <ul> {reqsLoop}</ul>
      </div>{" "}
      <br />
      <div className="Deadlines">
        <strong>
          <label>DEADLINE:</label>
        </strong>
        <ul>
          <strong>
            <li> TRA: {deadlines.translation}</li>
            <li>
              {" "}
              <strong>PRF: </strong> {deadlines.proofreading}
            </li>
          </strong>
        </ul>
      </div>
      <br />
      <div>
        <p>
          {" "}
          Please confirm safe receipt of the files and the deadline. Should you
          have any queries, please let me know as soon as possible.{" "}
        </p>
        <br />
        Thank you!
      </div>
    </div>
  );
}

export default SoloRequest;
