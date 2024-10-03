import React from "react";
import { useState, useEffect } from "react";
import moment from "moment-timezone";

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


  const [currentTime, setCurrentTime] = useState(null);
  const [currentTimeNew_York, setCurrentTimeNew_York] = useState(null);
  const [currentTimeKorea, setCurrentTimeKorea] = useState(null);
  const [currentTimeBrazil, setCurrentTimeBrazil] = useState(null);

  const updateTimes = () => {
    const timeInCest = moment().tz("Europe/Berlin").format("HH:mm");
    const timeNew_York = moment().tz("America/New_York").format("HH:mm");
    const timeKorea = moment().tz("Asia/Seoul").format("HH:mm");
    const timeBrazil = moment().tz("America/Sao_Paulo").format("HH:mm");

    setCurrentTime(timeInCest);
    setCurrentTimeNew_York(timeNew_York);
    setCurrentTimeKorea(timeKorea);
    setCurrentTimeBrazil(timeBrazil);

  };

  useEffect(() => {
    updateTimes();
    const intervalId = setInterval(() => {
      updateTimes();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App-footer">
      <h4>
        {date + currentTime} Europe | {currentTimeNew_York}-New York |{" "}
        {currentTimeKorea}-Korea | {currentTimeBrazil}-Brazil
      </h4>
    </div>
  );
}

export default Footer;
