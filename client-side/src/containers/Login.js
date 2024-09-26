import React, { useState } from "react";
import Axios from "axios";
import { mongoDB_Auth } from "../apis";
import ".//css/RegistrationForm.css";
import { Link } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { setLogin } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { setTemplates, setFavTemplates } from "../state";
import { mongoDB_Template } from "../apis";

const Login = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwVisibility, setPwVisibility] = useState(false);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);

  /** */

  const getTemplates = async () => {
    const templates = user.templates;
    const templateArr = [];
    console.log(templates);
    Axios.get(mongoDB_Template + `/${user._id}/alltemplates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return dispatch(setTemplates({ templates: res.data }));
      })
      .catch((err) => console.error(err));
  };

  const getFavTemplates = async () => {
    Axios.get(mongoDB_Template + `/${user._id}/favTemplates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(setFavTemplates({ favTemplates: res.data }));
      })
      .catch((err) => {
        const error = err.response.data.message;
        if (error === "jwt expired") {
          console.log(error);
          // dispatch(setLogout())
        }
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      Axios.post(mongoDB_Auth + "/login", {
        email: email,
        password: password,
      })
        .then(function (response) {
          if (response.status === 200) {
            dispatch(
              setLogin({
                user: response.data.user,
                token: response.data.token,
              })
            );
            window.location.replace("/");
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {console.log(error);}
  };

  const goToRegistrationForm = (e) => {
    e.preventDefault();
    window.location.replace("/register");
    /**use replace  so users cannot click the “back” button and return to the previous, pre-redirect page*/
  };

  return (
    <Box
      p="1rem 6%"
      textAlign="center"
      width={isNonMobileScreens ? "70%" : "100%"}
      m="2rem auto"
      borderRadius="3rem"
    >
      <div className="creationForm-div">
        <div className="creationForm-form">
          <form method="post" name="newUserForm">
            <h2>Sign In</h2>
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
    </Box>
  );
};

export default Login;
