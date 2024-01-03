import React, { useState } from "react";
import "./NewTemplate.css";
import CreateItems from "./elements/itemsList";
import axios from "../../axios";

function NewGame() {
  const [developer, setDeveloper] = useState();
  const [title, setTitle] = useState();
  const [links, setLinks] = useState([]);
  const [languages, setlanguages] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    let object = {
      developer: developer,
      title: title,
      links: {},
      languages: [],
      creationDate: new Date(),
    };
    console.log(object);

    axios.post('/games', {
      developer: developer,
      title: title,
      links: links,
      languages: languages,
      creationDate: new Date(),
    }).then();
  };

  function addLink(newLink) {
    setLinks((prevLinks) => {
      return [...prevLinks, newLink];
    });
  }

  const deleteLink = (e, id) => {
    e.preventDefault();
    setLinks((prevLinks) => {
      return prevLinks.filter((items, index) => {
        return index !== id;
      });
    });
  };

  return (
    <div className="NewGameDiv">
      <div className="">
        <div>
          <label>Developer</label>
          <input
            className="NewGameTitleInput"
            type="text"
            placeholder="Write the developer's name"
            onChange={(e) => setDeveloper(e.target.value)}
          ></input>{" "}
        </div>{" "}
        <div>
          <label>Game title </label>
          <input
            className="NewGameTitleInput"
            type="text"
            placeholder="Write the game's title here"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Languages:</label>
          <input
            placeholder="Please add the languace code only"
            onChange={(e) => setlanguages(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Links of interest:</label>
          <ul>
            {links.map((linkItem, index) => {
              return (
                <li id="">
                  {linkItem.value}{" "}
                  <button onClick={(e) => deleteLink(e, index)}>-</button>
                </li>
              );
            })}
          </ul>{" "}
          <ul>
            {" "}
            <CreateItems onAdd={addLink} />
          </ul>
        </div>
        <input
          type="submit"
          value="Submit"
          className="saveButton"
          onClick={(e) => handleSubmit(e)}
        ></input>
      </div>
    </div>
  );
}

export default NewGame;
