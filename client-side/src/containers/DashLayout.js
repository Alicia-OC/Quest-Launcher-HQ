import "./css/Containers.css";
import { Outlet } from "react-router-dom";
import Header from "../components/pages/elements/Footer and Header/Header.jsx";
import Footer from "../components/pages/elements/Footer and Header/Footer.jsx";
import SideMenu from "./SideMenu.js";
import { useDispatch, useSelector } from "react-redux";

const DashLayout = (props) => {
  const user = useSelector((state) => state.user); //

  let userLogged = props.isUserLoged;
  let visibility;
  if (userLogged) {
    visibility = "visible";
  } else visibility = "hidden";

  const isUSerLogged = () => {
    if (user !== null) {
      return (
        <div className="sideContainer" style={{ visibility: "visible" }}>
          <SideMenu />
        </div>
      );
    }
  };

  return (
    <>
      <Header isUserLoged={userLogged} />
      <div className="DashContainer">
        <div className="container">
          {isUSerLogged()}
          <div className="mainContainer">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashLayout;
