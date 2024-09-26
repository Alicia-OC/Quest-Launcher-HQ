import React, { useState } from "react";
import "./NewTemplate.css";
import CreateItems from "./elements/itemsList";
import Axios from "axios";
import { mongoDB_Games } from "../../apis";
import { useSelector } from "react-redux";
import { GetLanguages } from "../../features/languagesList/fetchLanguages";

function NewGame() {
  const [developer, setDeveloper] = useState();
  const [title, setTitle] = useState();
  const [links, setLinks] = useState([]);
  const [languages, setlanguages] = useState([]);
  const DB_languages = GetLanguages();
  const [arrayOfLangs, setArrayOfLangs] = useState([]); 

  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    let object = {
      developer: developer,
      title: title,
      links: {},
      languages: arrayOfLangs,
    };
    console.log(object);
    //** */
    //

    Axios.post(mongoDB_Games, {
      userId: user._id,
      developer: developer,
      title: title,
      links: links,
      languages: arrayOfLangs,
    }).catch((err) => {
      alert(
        "This game has already been added, please try another name or check your database."
      );
    });
  };

  function addLink(newLink) {
    setLinks((prevLinks) => {
      return [...prevLinks, newLink];
    });
  }


  function addLanguages(language) {
    setArrayOfLangs([...arrayOfLangs, language])
    if (!arrayOfLangs.includes(language)) {
      setArrayOfLangs([...arrayOfLangs, language])
    } else {
      deleteLanguages(language);
    }
    console.log(arrayOfLangs);
  }

  function deleteLanguages(language) {
    setArrayOfLangs(arrayOfLangs.filter((lang) => lang !== language));
    console.log(arrayOfLangs);

  }

  const deleteLink = (e, id) => {
    e.preventDefault();
    setLinks((prevLinks) => {
      return prevLinks.filter((items, index) => {
        return index !== id;
      });
    });
  };

  const languagesLoop = () => {
    if (DB_languages) {
      const duplicate = DB_languages.map((item) =>  item.language).sort()
      
      return (
        <>
          {duplicate.map((language) => (
            <p className="languagesInputsList">
              <input
                className=""
                type="checkbox"
                id={language}
                onChange={() => addLanguages(language)}
              ></input>
              {language}
            </p>
          ))}
        </>
      );
    }
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
        <div>
          <label>Languages:</label>
          <input
            placeholder="Please add the languace code only"
            onChange={(e) => setlanguages(e.target.value)}
          ></input>
          {languagesLoop()}
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
