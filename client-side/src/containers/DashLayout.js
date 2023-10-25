import "./css/Containers.css";
import { Outlet } from "react-router-dom";
import Header from "../components/pages/elements/Footer and Header/Header.jsx";
import Footer from "../components/pages/elements/Footer and Header/Footer.jsx";
import SideMenu from "../components/pages/elements/Footer and Header/SideMenu";

const DashLayout = (props) => {
  let userLogged = props.isUserLoged;
  let visibility;
  if (userLogged) {
    visibility = "visible";
  } else visibility = "hidden";
  return (
    <>
      <Header isUserLoged={userLogged} />
      <div className="DashContainer">
        <div className="container">
          <div className="sideContainer" style={{ visibility: visibility }}>
            <SideMenu />
          </div>
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
