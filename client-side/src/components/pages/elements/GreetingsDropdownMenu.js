import React, { useState } from "react";
import { randomGreetings } from "../../../apis";

function GreetingsDropdownMenu(props) {
  const [greetings, setGreetings] = useState(randomGreetings[0]);

  const GreetingsLoop = randomGreetings.map((greet) => (
    <option className="greetingsSelectDropdown" key={greet} value={greet}>
      {greet}
    </option>
  ));

  function handleChange(e) {
    e.preventDefault();
    let chosenGreet = e.target.value;
    const randomGreet =
      randomGreetings[Math.floor(Math.random() * randomGreetings.length)];

    if (chosenGreet === "Random greet") {
      chosenGreet = randomGreet;
    }
    setGreetings(chosenGreet);
    props.getGreet(chosenGreet)
  }

  return (
    <div className="dropDownGreetings" data-type="select">
      <select
        onChange={(e) => {
          handleChange(e);
        }}
        id="greetingsSelectOptions"
        className="greetingsSelectOptions"
      >
        {GreetingsLoop}
        <option value="Random greet">Random greet</option>
      </select>
    </div>
  );
}

export default GreetingsDropdownMenu;
