import React, { useState, useEffect } from "react";
import Axios from "axios";
import { mongoDB_Users } from "../../apis";
import "../../containers/css/RegistrationForm.css";

import { Link } from "react-router-dom";
function NewUserCreation() {
  const [pwVisibility, setPwVisibility] = useState(false);
  const [userRegistrationInput, setUserRegistrationInput] =
    useState("validInput");
  const [userRole, setUserRole] = useState();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgFullName, setMsgFullName] = useState();
  const [msgUsername, setMsgUsername] = useState();
  const [msgEmail, setMsgEmail] = useState();
  const [msgPassword, setMsgPassword] = useState();
  const [user, setUser] = useState();

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  useEffect(() => {
    Axios.get(mongoDB_Users)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  function validateForm() {
    /** */ let x =
      document.forms["newUserForm"][
        ("fullName", "username", "email", "password")
      ].value;
    if (x === "") {
      alert("All fields must be filled out");
    }
  }

  const CheckDuplicate = () => {
    let userNameDuplicated;
    let emailDuplicated;

    if (username.length < 6 || !username.match(/[a-zA-Z0-9_]/g)) {
      setMsgUsername(
        <p className="errorForm">
          <i>
            {" "}
            Your username should be at least 6 characters long and contain only
            letters and numbers
          </i>
        </p>
      );
    } else {
      for (let i = 0; i < user.length; i++) {
        if (user[i].username === username) {
          userNameDuplicated = true;
          return
        }
        if (user[i].email === email) {
          emailDuplicated = true;
        }
      }

      userNameDuplicated
        ? setMsgUsername(
            <p className="errorForm">
              <i> This username is not available</i>
            </p>
          )
        : setMsgUsername("");

      emailDuplicated
        ? setMsgEmail(
            <p className="errorForm">
              <i> There is a username registered with this email already</i>
            </p>
          )
        : setMsgUsername("");
    }
  };

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
    //.then(location.reload());
  };
  const [content, setContent] = useState();

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
            <label>Username</label>
            <input
              name="username"
              id="userUsername"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onMouseOut={(e) => {
                CheckDuplicate();
              }}
            ></input>
            {msgUsername}
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
              onMouseOut={(e) => {
                CheckDuplicate();
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
                  setUserRegistrationInput("validInput");
                  setMsgPassword("");
                }
              }}
            ></input>{" "}
            {msgPassword}
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
