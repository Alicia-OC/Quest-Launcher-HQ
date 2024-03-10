import React from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedAccess = () => {
  let navigate = useNavigate();

  return (
    <div>
      <div className="">
        <div className="error-page">
          <p className="error-text">
            You need an account to have access to this part of the app
          </p>
          <button
            onClick={(e) => {
              navigate("/login");
            }}
          >
            {" "}
            Login
          </button>
          <button
            onClick={(e) => {
              navigate("/register");
            }}
          >
            {" "}
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
