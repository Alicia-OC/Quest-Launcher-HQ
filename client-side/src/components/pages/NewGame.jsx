import React, { useState } from "react";
import "./NewTemplate.css";

function NewGame() {
  return (
    <div className="NewGameDiv">
      <div className="">
        <form method="post">
          <div>
            <label>Developer</label>
            <input
              className="NewGameTitleInput"
              type="text"
              placeholder="Write the developer's name"
            ></input>{" "}
          </div>{" "}
          <div>
            <label>Games </label>
            <input
              className="NewGameTitleInput"
              type="text"
              placeholder="Write the game's title here"
            ></input>
          </div>
          <div>
            <label>Links of interest</label>
            <input type="text" className="NewGameTitleInput"></input>
          </div>
          <input type="submit" value="Save" className="saveButton"></input>
        </form>
      </div>
    </div>
  );
}

export default NewGame;
