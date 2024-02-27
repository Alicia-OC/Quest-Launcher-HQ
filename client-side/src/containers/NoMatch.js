import React from "react";
import { useNavigate } from "react-router-dom";

const NoMatch = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="container">
        <div className="error-page">
          <h1 className="error-code">404</h1>
          <p className="error-text">Page not found</p>
          <button onClick={routeChange}> Go back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default NoMatch;
