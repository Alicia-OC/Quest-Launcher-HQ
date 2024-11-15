import React, { useState } from "react";
import { mongoDB_Vendors } from "../../apis";
import Axios from "axios";
import LanguagesDropDown from "../../components/pages/elements/languagesDropdown";
import { useSelector } from "react-redux";

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


const NewVendor = () => {

  const [language, setLanguage] = useState();
  const [fullName, setFullName] = useState();
  const [nickname, setNickname] = useState();
  const [translation, setTranslation] = useState(true);
  const [proofreading, setProofreading] = useState(true);
  const [email, setEmail] = useState();

  const user = useSelector((state) => state.user); //

  function validateForm() {
    let x =
      document.forms["newVendorForm"][
        ("fullName",
        "nickname",
        "language",
        "email",
        "transService",
        "proofService")
      ].value;
    if (x === "") {
      
      alert("This field must be filled out");
      return false;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    const newVendor = {
      language: language,
      fullName: fullName,
      nickname: nickname,
      service: { translation: translation, proofreading: proofreading },
      email: email,
    };

    Axios.post(mongoDB_Vendors, {
      userId: user._id,
      language: newVendor.language,
      fullName: newVendor.fullName,
      nickname: newVendor.nickname,
      service: {
        translation: newVendor.service.translation,
        proofreading: newVendor.service.proofreading,
      },
      email: newVendor.email,
    })
      .then(alert(`New vendor ${nickname} has been created!`))
      //.then(location.reload())
      .catch((err) => {
        console.log(err);
        alert(
          "Please check the nickname and email again, there seems to be a duplicate"
        );
      });
  };

  return (
    <div className="creationForm">
      <form name="newVendorForm" action={mongoDB_Vendors} method="POST">
        <label>Full name</label>{" "}
        <input
          name="fullName"
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        ></input>{" "}
        <br></br>
        <label>Nickname</label>
        <input
          name="nickname"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        ></input>{" "}
        <br></br>
        <label>Translation</label>
        <select
          name="transService"
          onChange={(e) => {
            if (e.target.value === "Yes") {
              setTranslation(true);
            } else {
              setTranslation(false);
            }
          }}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
        <br></br>
        <label>Proofreading</label>
        <select
          name="proofService"
          onChange={(e) => {
            if (e.target.value === "Yes") {
              setProofreading(true);
            } else {
              setProofreading(false);
            }
          }}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
        <br></br>
        <LanguagesDropDown
          getlanguage={(thisLanguage) => setLanguage(thisLanguage)}
        />
        <label>E-mail</label>
        <input
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>{" "}
        <br></br>
        <br />
        <input
          type="submit"
          value="Submit"
          onClick={(e) => handleSubmit(e)}
        ></input>
      </form>
    </div>
  );
};

export default NewVendor;
