import React, { useState, useEffect } from "react";
import Axios from "axios";
import { mongoDB_Auth } from "../../apis";
import "../../containers/css/RegistrationForm.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwVisibility, setPwVisibility] = useState(false);

  /** */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password);

    Axios.post(mongoDB_Auth, {
      email: email,
      password: password,
    }).catch((err) => console.log(err));
  };

  const goToRegistrationForm = (e) => {
    e.preventDefault();
    window.location.replace("/register");
    /**use replace  so users cannot click the “back” button and return to the previous, pre-redirect page*/
  };

  return (
    <div className="creationForm-div">
      <div className="creationForm-form">
        <form method="post" name="newUserForm">
          <h2>Log in</h2>
          <div className="form-group-div">
            <label>Email</label>
            <input
              className="UserAuthInput"
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
              className="UserAuthInput"
              name="password"
              type={pwVisibility ? "text" : "password"}
              id="userPwd"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>{" "}
            <div className="form-group-div-checkbox-showPassword">
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
          </div>
          <div>
            <input type="checkbox" value="lsRememberMe" id="rememberMe"></input>{" "}
            <label for="rememberMe">Remember me</label>
          </div>
          <div className="form-group-div submit-btn">
            <input
              type="submit"
              value="Login"
              onClick={(e) => handleSubmit(e)}
            ></input>{" "}
            <input
              type="submit"
              value="Create account"
              onClick={(e) => goToRegistrationForm(e)}
            ></input>
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
};

export default Login;
