import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./containers/Home.jsx";
import NoMatch from "./containers/NoMatch";
import Login from "./features/auth/Login.js";
import RegisterAccount from "./features/auth/RegisterAccount.js";
import DashLayout from "./containers/DashLayout.js";
import Library from "./components/pages/ProfileLibrary.js";
import UserProfile from "./components/pages/Profile.js";

/* DATABASE POST */
import NewTemplate from "./components/pages/NewTemplate.jsx";
import NewGame from "./components/pages/NewGame.jsx";
import NewRequest from "./components/pages/NewRequest.jsx";
import NewVendor from "./features/Vendors/NewVendor.jsx";
import NewRequestFromTemplate from "./components/pages/NewRequestFromTemplate.js";

/* DATABASE GET */
import VendorList from "./features/Vendors/VendorList.jsx";
import VendorPerLangList from "./features/Vendors/VendorPerLangList.jsx";
import GamesList from "./features/Games/gamesList.js";
import DevelopersList from "./features/developersList/developersList.js";
import RequestList from "./features/Requests/RequestList.js";
import TemplateList from "./features/templates/templatesList.js";

import SoloRequest from "./features/Requests/soloRequest.js";
import SoloTemplate from "./features/templates/soloTemplate.js";

function App() {
  const [userLogged, setUser] = useState(true);

  const { REACT_APP_mongoDB_Auth } = process.env;

  return (
    <>
      <Routes>
        <Route path="*" element={<NoMatch />} />{" "}
        <Route path="register" element={<RegisterAccount />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<DashLayout isUserLoged={userLogged} />}>
          <Route index element={<Home isUserLoged={userLogged} />} />
          <Route path="/NewRequest">
            <Route index element={<NewRequest />} />
          </Route>
          <Route path="/NewTemplate" element={<NewTemplate />} />
          <Route path="/NewGame" element={<NewGame />} />
          <Route path="/NewVendor" element={<NewVendor />} />

          <Route path="/Library" element={<Library />} />
          <Route path="/Profile" element={<UserProfile />} />

          <Route path="/Vendors" element={<VendorList />} />
          <Route path="/Games" element={<GamesList />} />
          <Route path="/Developers" element={<DevelopersList />} />

          <Route path="/RequestList" element={<RequestList />} />
          <Route path="/TemplateList" element={<TemplateList />} />

          <Route path="/Request/:requestId" element={<SoloRequest />} />
          <Route path="/Template/:templateId" element={<SoloTemplate />} />
          <Route
            path="/NewRequestFromTemplate/:templateReqId"
            element={<NewRequestFromTemplate />}
          />

          <Route
            path="/Vendors-/:language"
            thisLanguage="FR"
            element={<VendorPerLangList />}
          />
        </Route>
        <Route path="/LogOut" element={<NewGame />} />
      </Routes>
    </>
  );
}

export default App;
