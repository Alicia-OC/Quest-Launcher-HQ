import Axios from "axios";
import { useEffect } from "react";
import Public from "./Public";
import { Box, useMediaQuery } from "@mui/material";
import { HomeCard } from "../components/pages/widgets/HomeCards.";
import { mongoDB_Template } from "../apis";
import { setTemplates, setFavTemplates } from "../state";
import { useDispatch, useSelector } from "react-redux";

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
  const templateArr = [];
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const getTemplates = async () => {
    console.log(templates);
    Axios.get(mongoDB_Template + `/${user._id}/alltemplates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
       dispatch(setTemplates({ templates: res.data }));
        console.log(templates);
      })
      .catch((err) => console.error(err));
  };

  const getFavTemplates = async () => {
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
    getFavTemplates();
   
  }, []);

  const content = (
    <Box>
      <p>Welcome, {user.fullName} &#9825;</p>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <h3>item 1</h3> <h3>item 2</h3>{" "}
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
