import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let CreateDeadlines = (props) => {
  const [transDate, settransDate] = useState();
  const [proofDate, setProofDate] = useState();
  const [timezone, setTimeZone] = useState("CET");
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
  let thisHandoffService = props.setService;

  const childToParentTRA = (date) => {
    let hours = String(date.getHours()).padStart(2, '0'); 
    let minutes = String(date.getMinutes()).padStart(2, '0');

    let month = months[date.getMonth()];
    let day = date.getDate();

    let daySuffix = "th";
    if (day === 1 || day === 21 || day === 31) daySuffix = "st";
    else if (day === 2 || day === 22) daySuffix = "nd";
    else if (day === 3 || day === 23) daySuffix = "rd";

    let result = `${month} ${day}${daySuffix} - ${hours}:${minutes} ${timezone}`;
    settransDate(date);
    props.getTransDL(result);
  };
  const childToParentPRF = (date) => {
    let hours = String(date.getHours()).padStart(2, '0'); 
    let minutes = String(date.getMinutes()).padStart(2, '0');

    let month = months[date.getMonth()];
    let day = date.getDate();

    let daySuffix = "th";
    if (day === 1 || day === 21 || day === 31) daySuffix = "st";
    else if (day === 2 || day === 22) daySuffix = "nd";
    else if (day === 3 || day === 23) daySuffix = "rd";

    let result = `${month} ${day}${daySuffix} - ${hours}:${minutes} ${timezone}`;
    setProofDate(date);
    props.getProofDL(result);
  };
  const translationDL = (
    <li>
      <label>TRA:</label>
      <DatePicker
        selected={transDate}
        onChange={(date) => childToParentTRA(date)}
        showTimeSelect
        placeholderText="Select a date"
        timeFormat="HH:mm"
        timeIntervals={30}
        dateFormat="MMMM d, h:mm aa"
      />
    </li>
  );
  const proofreadingDL = (
    <li className="datePickerInput">
      <label>PRF:</label>
      <DatePicker
        selected={proofDate}
        onChange={(date) => childToParentPRF(date)}
        showTimeSelect
        placeholderText="Select a date"
        timeFormat="p"
        timeIntervals={30}
        dateFormat="MMMM d, h:mm aa"
      />
    </li>
  );

  const tepDL = (
    <>
      {translationDL}
      {proofreadingDL}
    </>
  );

  const renderDeadlines = () => {
    if (thisHandoffService) {
      switch (thisHandoffService) {
        case "TRA":
          return translationDL;
        case "PRF":
          return proofreadingDL;
        case "TEP":
          return tepDL;
        default:
          return tepDL;
      }
    } else {
      return tepDL;
    }
  };

  return (
    <div className="deadlinesDiv">
      <label>Deadlines:</label>
      <ul id="templateLists">{renderDeadlines()}</ul>
    </div>
  );
};

export default CreateDeadlines;
