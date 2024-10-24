import React, { useState } from "react";
import { useSelector } from "react-redux";

function GreetingsDropdownMenu(props) {
  const user = useSelector((state) => state.user);
  const userGreetings = user?.greetings;
  const [greetings, setGreetings] = useState(null);

  const GreetingsLoop = userGreetings.map((greet) => (
    <option className="greetingsSelectDropdown" key={greet} value={greet}>
      {greet}
    </option>
  ));

  function handleChange(e) {
    e.preventDefault();
    let chosenGreet = e.target.value;
    const randomGreet =
      userGreetings[Math.floor(Math.random() * (userGreetings.length - 1)) + 1];

    if (chosenGreet === "Random greet") {
      chosenGreet = randomGreet;
    }
    setGreetings(chosenGreet);
    props.getGreet(chosenGreet);
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
      </select>
    </div>
  );
}

export default GreetingsDropdownMenu;
