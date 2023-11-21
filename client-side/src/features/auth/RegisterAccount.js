import React, { useState } from "react";
import Axios from "axios";
import { mongoDB_Users } from "../../apis";
import "../../containers/css/RegistrationForm.css";

import { Link } from "react-router-dom";
function NewUserCreation() {
  const [pwVisibility, setPwVisibility] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState();
  const [inputClassName, setInputClassName] = useState("validInput");
  const [userRole, setUserRole] = useState();
  const [fullName, setFullName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  function validateForm() {
    /** */ let x =
      document.forms["newUserForm"][
        ("fullName", "username", "email", "password")
      ].value;
    if (x === "") {
      alert("All fields must be filled out");
      return;
    } else {
      if (password.length < 8) {
        setInputClassName("invalidInput");
        setInvalidPassword("The password should be at least 8 characters");
      } else {
        setInputClassName("validInput");
      }

      if (!emailPattern.test(email)) {
      }

      if (username.length < 4 || username.match(/[a-zA-Z0-9_]/g)) {
      }

      if (fullName.length < 0 || !fullName.match(/[A-Za-z]/g)) {
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    const newUser = {
      fullName: fullName,
      username: username,
      email: email,
      password: password,
      role: userRole,
    };

    Axios.post(mongoDB_Users, {
      fullName: fullName,
      username: username,
      email: email,
      password: password,
      role: userRole,
    }).catch((err) => {
      console.log(err);
      if (err) {
        alert(
          "Please check your username and email again, there seems to be a duplicate"
        );
      } else {
        alert("User created succesfully!");
      }
    });
  };

  return (
    <div className="creationForm-div">
      <div className="creationForm-form">
        <form method="post" name="newUserForm">
          <h2>Registration</h2>
          <div className="form-group-div">
            <label>Name</label>
            <input
              name="fullName"
              id="userFullName"
              type="text"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            ></input>{" "}
          </div>
          <div className="form-group-div">
            <label>Username</label>
            <input
              name="username"
              id="userUsername"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          </div>
          <div className="form-group-div">
            <label>Email</label>
            <input
              name="email"
              id="userEmail"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="form-group-div">
            {" "}
            <label>Password</label>
            <input
              name="password"
              className={inputClassName}
              type={pwVisibility ? "text" : "password"}
              id="userPwd"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>{" "}
          </div>
          <div className="form-group-div-checkbox">
            <label>Show password</label>
            <input
              className="passwordCheckbox"
              type="checkbox"
              id="passwordCheckbox"
              onChange={(e) => {
                setPwVisibility(!pwVisibility);
              }}
            ></input>
          </div>
          <div className="form-group-div">
            <label>Role</label>
            <select
              id="userRole"
              onChange={(e) => {
                setUserRole(e.target.value);
              }}
            >
              <option>Project Manager</option>
              <option>Project Manager Coordinator</option>
              <option>Student</option>
              <option>Tester</option>
              <option>Recruiter</option>
            </select>
          </div>
          <div className="form-group-div submit-btn">
            <input
              type="submit"
              value="Submit"
              onClick={(e) => handleSubmit(e)}
            ></input>{" "}
          </div>{" "}
        </form>
        <div className="homeButton">
          <button className="goBack-btn">
            <Link to="/">Go back</Link>
          </button>
        </div>
      </div>
      <div className="register-side-div">[IMAGE]</div>
    </div>
  );
}
export default NewUserCreation;
