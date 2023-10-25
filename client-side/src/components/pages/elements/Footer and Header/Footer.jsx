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

  const checkTime = () => {
    setCurrentTime(currentHour);
  };



  useEffect(() => {
    setInterval(() => checkTime, 1000);
  }, []);

  return (
    <div className="App-footer">
      {date + currentTime + timeOfTheDay()}
      <h2>this is just a test for the Footer</h2>
    </div>
  );
}

export default Footer;
