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

  const currentHour = `${time.getHours()}:${time.getMinutes()} `;
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    setCurrentTime(currentHour);

    const intervalId = setInterval(() => {
      setCurrentTime(currentHour);
    }, 60000);
  
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App-footer">
      <h4>{date + currentTime + 'CEST'}</h4>
    </div>
  );
}

export default Footer;
