import React from "react";
import { Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Home from "./containers/Home.js";
import NoMatch from "./containers/NoMatch";
import Login from "./containers/Login.js";
import RegisterAccount from "./containers/RegisterAccount.js";
import DashLayout from "./containers/DashLayout.js";
import Library from "./components/pages/ProfileLibrary.jsx";
import UserProfile from "./components/pages/Profile.jsx";
import RegistrationSucceeded from "./containers/RegistrationSucceeded.js";
import UnauthorizedAccess from "./containers/UnauthorizedAccess.js";
/* DATABASE POST */
import NewTemplate from "./components/pages/NewTemplate.jsx";
import NewGame from "./components/pages/NewGame.jsx";
import NewRequest from "./components/pages/NewRequest.jsx";
import NewVendor from "./features/Vendors/NewVendor.jsx";
import NewRequestFromTemplate from "./components/pages/NewRequestFromTemplate.jsx";

/* DATABASE GET */
import VendorList from "./features/Vendors/VendorList.jsx";
import GamesList from "./features/Games/gamesList.js";
import DevelopersList from "./features/developersList/developersList.js";
import RequestList from "./features/Requests/RequestList.js";
import TemplateList from "./features/templates/templatesList.js";

import SoloRequest from "./features/Requests/soloRequest.js";
import SoloTemplate from "./features/templates/soloTemplate.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogout } from "./state/index.js";
import { useEffect } from "react";
import VendorPerLangList from "./features/Vendors/VendorPerLangList.jsx";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      const tokenExpiresAt = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime > tokenExpiresAt.exp) {
        dispatch(setLogout());
        // window.location.reload();
      }
      //
    }
  }, [isAuth]);

  return (
    <>
      <Routes>
        <Route path="*" element={<NoMatch />} />{" "}
        <Route path="register" element={<RegisterAccount />} />
        <Route path="login" element={<Login />} />
        <Route
          path="/RegistrationSucceeded"
          element={<RegistrationSucceeded />}
        />
        <Route path="/" element={<DashLayout isUserLoged={isAuth} />}>
          <Route index element={<Home isUserLoged={isAuth} />} />
          <Route path="/NewRequest">
            <Route
              index
              element={isAuth ? <NewRequest /> : <UnauthorizedAccess />}
            />
          </Route>
          <Route
            path="/NewTemplate"
            element={isAuth ? <NewTemplate /> : <UnauthorizedAccess />}
          />
          <Route
            path="/NewGame"
            element={isAuth ? <NewGame /> : <UnauthorizedAccess />}
          />
          <Route
            path="/NewVendor"
            element={isAuth ? <NewVendor /> : <UnauthorizedAccess />}
          />

          <Route
            path="/Library"
            element={isAuth ? <Library /> : <UnauthorizedAccess />}
          />
          <Route
            path="/Profile"
            element={isAuth ? <UserProfile /> : <UnauthorizedAccess />}
          />

          <Route
            path="/Vendors"
            element={isAuth ? <VendorList /> : <UnauthorizedAccess />}
          />
          <Route path="/Games" element={<GamesList />} />
          <Route
            path="/Developers"
            element={isAuth ? <DevelopersList /> : <UnauthorizedAccess />}
          />

          <Route
            path="/RequestList"
            element={isAuth ? <RequestList /> : <UnauthorizedAccess />}
          />
          <Route
            path="/TemplateList"
            element={isAuth ? <TemplateList /> : <UnauthorizedAccess />}
          />

          <Route
            path="/Request/:requestId"
            element={isAuth ? <SoloRequest /> : <UnauthorizedAccess />}
          />
          <Route
            path="/Vendors/:language"
            element={isAuth ? <VendorPerLangList /> : <UnauthorizedAccess />}
          />
          <Route
            path="/Template/:templateId"
            element={isAuth ? <SoloTemplate /> : <UnauthorizedAccess />}
          />
          <Route
            path="/Template/:templateId/test"
            element={isAuth ? <SoloTemplate /> : <UnauthorizedAccess />}
          />

          <Route
            path="/NewRequestFromTemplate/:templateReqId"
            element={
              isAuth ? <NewRequestFromTemplate /> : <UnauthorizedAccess />
            }
          />
        </Route>
        <Route
          path="/LogOut"
          element={isAuth ? <NewGame /> : <UnauthorizedAccess />}
        />
      </Routes>
    </>
  );
}

export default App;
