import "./css/Containers.css";
import { Outlet } from "react-router-dom";
import Header from "../components/pages/elements/Footer and Header/Header.jsx";
import Footer from "../components/pages/elements/Footer and Header/Footer.jsx";
import SideMenu from "./SideMenu.js";
import { useDispatch, useSelector } from "react-redux";

const DashLayout = (props) => {
  const user = useSelector((state) => state.user); //

  let userLogged = props.isUserLoged;

  const isUSerLogged = () => {
    if (user !== null) {
      return (
        <div className="sideContainer">
          <SideMenu />
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <>
      <Header isUserLoged={userLogged} />
      <div className="DashContainer">
        <div className="container">
          {isUSerLogged()}
          {user ? (
            <div className="mainContainer">
              <Outlet />
            </div>
          ) : (
            <div className="publicContainer">
              <Outlet />
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashLayout;
