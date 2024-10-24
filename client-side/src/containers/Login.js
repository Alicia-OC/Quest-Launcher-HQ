import React, { useState, useEffect } from "react";
import Axios from "axios";
import { mongoDB_Auth } from "../apis";
import { Link } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { setLogin } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { setTemplates, setRequests, setGreetings } from "../state";
import { mongoDB_Template, mongoDB_Request } from "../apis";
import cat from "../img/photo_2024-10-18_13-38-02.jpg";

const Login = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwVisibility, setPwVisibility] = useState(false);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);
  const templates = user?.templates;
  const requests = user?.requests;
  const favTemplates = user?.favTemplates;

  /** */ useEffect(() => {
    console.log("Updated user templates:", templates);
    console.log("Updated user requests:", requests);
  }, [templates, requests]);

  const getTemplates = async (userId, token) => {
    if (userId && token) {
      try {
        const res = await Axios.get(
          mongoDB_Template + `/${userId}/alltemplates`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setTemplates({ templates: res.data }));
      } catch (err) {
        console.error("Error loading templates:", err);
      }
    } else {
      console.error("User ID is not available");
    }
  };

  const getRequests = async (userId, token) => {
    if (userId && token) {
      try {
        const res = await Axios.get(
          mongoDB_Request + `/${userId}/allrequests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setRequests({ requests: res.data }));
      } catch (err) {
        console.error("Error loading requests:", err);
      }
    } else {
      console.error("User ID is not available");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(mongoDB_Auth + "/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const loggedInUser = response.data.user;
        const token = response.data.token;
        dispatch(
          setLogin({
            user: loggedInUser,
            token: token,
          })
        );
        if (loggedInUser && loggedInUser._id) {
          await Promise.all([
            getTemplates(loggedInUser._id, token),
            getRequests(loggedInUser._id, token),
          ]);
          setGreetings(loggedInUser.greetings)
        }
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goToRegistrationForm = (e) => {
    e.preventDefault();
    window.location.replace("/register");
    /**use replace so users cannot click the “back” button and return to the previous, pre-redirect page*/
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
        <div className="creationForm-image">
          <img className="registrationImage" src={cat}></img>
        </div>{" "}
      </div>
    </Box>
  );
};

export default Login;
