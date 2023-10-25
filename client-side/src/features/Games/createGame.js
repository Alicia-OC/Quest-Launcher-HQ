import React, { useState } from "react";
import "./NewTemplate.css";
import TextAreaComponent from "../../features/templates/textArea";

function NewGame() {
  return (
    <div className="">
      <div className="">
        <form method="post">
          <div>
            <label>Client</label>
            <input
              className="titleInput"
              type="text"
              placeholder="Write the developer's name"
            ></input>{" "}
          </div>{" "}
          <div>
            <label>Games </label>
            <input
              className="titleInput"
              type="text"
              placeholder="Write the game's title here"
            ></input>
          </div>
          <div>
            <label>Links of interest</label>
            <input type="text" className="titleInput"></input>
          </div>
          <input type="submit" value="Save" className="saveButton"></input>
        </form>
      </div>
    </div>
  );
}

export default NewGame;
