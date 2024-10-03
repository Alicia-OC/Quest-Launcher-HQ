import Axios from "axios";
import { useEffect } from "react";
import Public from "./Public";
import { Box, useMediaQuery } from "@mui/material";
import { HomeCard } from "../components/pages/widgets/HomeCards.";
import { mongoDB_Template } from "../apis";
import { setTemplates, setFavTemplates, setRequest } from "../state";
import { useDispatch, useSelector } from "react-redux";
import GetFavTemplates2 from "../features/templates/GetFavTemplates";

const Public2 = () => {
  const content = (
    <div>
      {" "}
      <Public />
      <img alt="babybel" id="babybel" className="templateScreenshot" />
    </div>
  );

  return content;
};

const UserLoggedBody = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const templates = user.templates;
  const requests = user.requests;

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const getTemplates = async () => {
    Axios.get(mongoDB_Template + `/${user._id}/alltemplates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
       dispatch(setTemplates({ templates: res.data }));
      
      })
      .catch((err) => console.error(err));
  };  

  const GetFavTemplates = async () => {
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

  useEffect(() => {
    getTemplates();
    GetFavTemplates();
       console.log(user.favTemplates)

  }, []);

  const content = (
    <Box>
      <p>Welcome, {user.fullName} &#9825;</p>
      <p>You have created {templates.length} templates and {requests.length} requests so far! </p>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <h3>{templates[0].templateTitle}</h3> <h3>{templates[1].templateTitle}</h3>{" "}
      </Box>{" "}
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <HomeCard text={"New Template"} />
        <HomeCard text={"New Request"} />
      </Box>{" "}
    </Box>
  );
  return content;
};

function Home(props) {
  let userLogged = props.isUserLoged;

  if (userLogged) {
    return UserLoggedBody();
  } else {
    return Public2();
  }
}

export default Home;
