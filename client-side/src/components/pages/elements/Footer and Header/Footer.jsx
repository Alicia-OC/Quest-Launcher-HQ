import React from "react";
import { useState, useEffect } from "react";

function Footer() {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const time = new Date();
  const date = `${weekday[time.getDay()]}, ${
    months[time.getMonth()]
  } ${time.getDate()} - `;

  let testnumber = 12

  const currentHour = `${time.getHours()}:${time.getMinutes()} `;
  const [currentTime, setCurrentTime] = useState(null);

  const timeOfTheDay = () => {
    if (testnumber >= 12) {
      return " PM";
    } else if (time.getHours() < 12) {
      return " AM";
    }
  };

  useEffect(() => {
    setInterval(() => setCurrentTime(currentHour), 1000);
  }, []);

  return (
    <div className="App-footer">
      <h4>{date + currentTime + timeOfTheDay()}</h4>
    </div>
  );
}

export default Footer;
