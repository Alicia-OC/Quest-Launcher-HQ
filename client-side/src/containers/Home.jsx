import { Route, Routes, Link } from "react-router-dom";
import Public from "./Public";

const Public2 = () => {
  const content = (
    <div>
      {" "}
      <Public />
      <img
        alt="babybel"
        id="babybel"
        className="templateScreenshot"
        src="https://m.media-amazon.com/images/I/81YDkr7Ti6L._AC_SL1500_.jpg"
      />
    </div>
  );

  return content;
};

const userLoggedBody = () => {
  const content = (
    <div className="">
      {" "}
      <h1>You're logged</h1>
      
    </div>
  );
  return content;
};

function Home(props) {
  let userLogged = props.isUserLoged;

  if (userLogged) {
    return userLoggedBody();
  } else {
    return Public2();
  }
}

export default Home;
