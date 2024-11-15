import React, { useState } from "react";
import Axios from "axios";
import { mongoDB_Auth } from "../apis";
import ".//css/RegistrationForm.css";
import { Link } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import * as yup from "yup";
import cat from '../img/photo_2024-10-18_13-38-02.jpg'

const registerSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

function NewUserCreation() {

  const [pwVisibility, setPwVisibility] = useState(false);
  const [userRegistrationInput, setUserRegistrationInput] =
    useState("UserAuthInput");
  const [userTitle, setUserTitle] = useState();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgFullName, setMsgFullName] = useState();
  const [msgEmail, setMsgEmail] = useState();
  const [msgPassword, setMsgPassword] = useState();

  /*const emailPattern = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
*/

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      fullName: fullName,
      email: email,
      password: password,
    };

    const errors = registerSchema.validate(formData);

    if (errors.length > 0) {
      console.log(errors.join("\n"));
      setMsgEmail(
        <p className="errorForm">
          <i>
            {" "}
            Your name should not contain any special character and should be at
            least 4 characters long
          </i>
        </p>
      );
      console.log("¡d");
    } else if (errors.length === 0) {
      console.log("valid");
    }

    Axios.post(mongoDB_Auth + "/signup", {
      fullName: fullName,
      email: email,
      username: email,
      password: password,
      title: userTitle,
    })
      .then(function (response) {
        if (response.status === 200) {
          window.location.replace("/RegistrationSucceeded");
        } else console.log("error");
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          alert("You already have an account using this e-mail address");
        }
      });

    //
  };
  const goToLoginForm = (e) => {
    e.preventDefault();
    window.location.replace("/login");
    /**Use "window.location.replace()" when you don’t want the user to be able to go back to the original page using the “back” button.
    Use "window.location.assign()" or "window.location.href" when you want the user to be able to go back to the original page using the “back” button
    */
  };
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      p="1rem 6%"
      textAlign="center"
      width={isNonMobileScreens ? "70%" : "90%"}
      m="2rem auto"
      borderRadius="3rem"
    >
      <div className="creationForm-div">
        <div className="creationForm-form">
          <form method="post" name="newUserForm">
            <h2>Registration</h2>
            <p>
              Please use a google generated password, this website uses
              encryption and a bunch of salt rounds, but mind that I'm just a
              lovely junior to work with, doing her first ever app :D
            </p>
            <div className="form-group-div">
              <label>Name</label>
              <input
                className="UserAuthInput"
                name="fullName"
                id="userFullName"
                type="text"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                onMouseOut={(e) => {
                  if (!fullName.match(/[A-Za-z]/g) || fullName.length < 4) {
                    setMsgFullName(
                      <p className="errorForm">
                        <i>
                          {" "}
                          Your name should not contain any special character and
                          should be at least 4 characters long
                        </i>
                      </p>
                    );
                  } else {
                    setMsgFullName("");
                  }
                }}
              ></input>{" "}
              {msgFullName}
            </div>
            <div className="form-group-div">
              <label>Email</label>
              <input
                className="UserAuthInput"
                name="email"
                id="userEmail"
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log(email);
                }}
              ></input>

              {msgEmail}
            </div>
            <div className="form-group-div">
              {" "}
              <label>Password</label>
              <input
                name="password"
                className={userRegistrationInput}
                type={pwVisibility ? "text" : "password"}
                id="userPwd"
                autoComplete="new-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onMouseOut={(e) => {
                  if (password.length < 8) {
                    setUserRegistrationInput("invalidInput");
                    setMsgPassword(
                      <p className="errorForm">
                        <i> The password should be at least 8 characters</i>
                      </p>
                    );
                  } else {
                    setUserRegistrationInput("UserAuthInput");
                    setMsgPassword("");
                  }
                }}
              ></input>{" "}
              {msgPassword}
            </div>
            <div className="form-group-div-checkbox">
              <label for="showPassword">Show password</label>
              <input
                className="passwordCheckbox"
                type="checkbox"
                id="showPassword"
                onChange={(e) => {
                  setPwVisibility(!pwVisibility);
                }}
              ></input>
            </div>
            <div className="form-group-div">
              <label>Title</label>
              <select
                id="userTitle"
                onChange={(e) => {
                  setUserTitle(e.target.value);
                }}
              >
                <option>Project Manager</option>
                <option>Project Manager Coordinator</option>
                <option>Student</option>
                <option>Tester</option>
                <option>Recruiter</option>
                <option>Linguist</option>
              </select>
            </div>
            <div className="form-group-div submit-btn">
              <input
                type="submit"
                value="Create account"
                onClick={(e) => handleSubmit(e)}
              ></input>{" "}
              <input
                type="submit"
                value="Login"
                onClick={(e) => goToLoginForm(e)}
              ></input>{" "}
            </div>{" "}
          </form>
          <div className="homeButton">
            <button className="goBack-btn">
              <Link className="goBack-btn" to="/">Go back</Link>
            </button>
          </div>
        </div>
        <div className="creationForm-image">
          <img className="registrationImage" src={cat} ></img>
        </div>
      </div>
    </Box>
  );
}
export default NewUserCreation;
