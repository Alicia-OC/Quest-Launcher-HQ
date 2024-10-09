import Axios from "axios";
import { useEffect } from "react";
import Public from "./Public";
import { Box, useMediaQuery, Grid, Typography } from "@mui/material";
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
  }, []);

  const lastRequests = () => {
    let array = [];

    for (let i = requests.length - 1, count = 0; count < 5; i--, count++) {
      console.log(requests[i].projectTitle);
      array.push(
        <HomeCard
          text={
            <a href={"Request/" + requests[i]._id}>
              {" "}
              {requests[i].projectTitle}
            </a>
          }
        />
      );
    }

    return array;
  };

  const lastTemplates = () => {
    let array = [];

    for (let i = templates.length - 1, count = 0; count < 5; i--, count++) {
      console.log(templates[i].templateTitle);
      array.push(
        <HomeCard
          text={
            <a className="linkWithformat" href={"Template/" + templates[i]._id}>
              {templates[i].templateTitle}
            </a>
          }
        />
      );
    }

    return array;
  };

  return (
    <>
      <Box>
        <p>Welcome, {user.fullName} &#9825;</p>
        <p>
          You have created {templates.length} templates and {requests.length}{" "}
          requests so far!{" "}
        </p>
        <Box sx={{ flexGrow: 0, padding: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <h3>Last requests created:</h3>
              {lastRequests()}
            </Grid>

            <Grid item xs={6}>
              <h3>Last templates created:</h3>
              {lastTemplates()}
            </Grid>
          </Grid>
        </Box>
        <Box
          display="grid"
          gap="10px"
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 5" },
          }}
        ></Box>{" "}
      </Box>
    </>
  );
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
