import Axios from "axios";
import { useEffect } from "react";
import Public from "./Public";
import { Box, useMediaQuery} from "@mui/material";
import { mongoDB_Template, mongoDB_Request } from "../apis";
import { setTemplates, setFavTemplates, setRequests } from "../state";
import { useDispatch, useSelector } from "react-redux";

import HomeListComponents from "../components/pages/HomeListComponents";

const UserLoggedBody = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const templates = user?.templates;
  const requests = user?.requests;
  const greetings = user?.greetings

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const getTemplates = async () => {
    if (!user?._id) return;
    try {
      const res = await Axios.get(
        mongoDB_Template + `/${user._id}/alltemplates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setTemplates({ templates: res.data }));
    } catch (error) {
      console.error(error);
    }
  };

  const getFavTemplates = async () => {
    if (!user?._id) return;
    try {
      const res = await Axios.get(
        `${mongoDB_Template}/${user._id}/favTemplates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setFavTemplates({ favTemplates: res.data }));
    } catch (err) {
      const error = err.response?.data?.message;
      if (error === "jwt expired") {
        console.log(error);
        // dispatch(setLogout())
      }
    }
  };

  const getRequests = async () => {
    if (user && user._id) {
      try {
        const res = await Axios.get(
          mongoDB_Request + `/${user._id}/allrequests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setRequests({ requests: res.data }));
      } catch (err) {
        console.error("Error loading requests:", err);
      }
    } else {
      console.error("User ID is not available");
    }
  };

  useEffect(() => {
    if (user?._id && token) {
      const fetchData = async () => {
        await getTemplates();
        await getFavTemplates();
        await getRequests();
      };
      fetchData();
    }
  }, [user?._id, token]);


  if (user && user._id) {
    return (
      <>
        <Box>
          <p>Welcome, {user.fullName} &#9825;</p>
          <p>
            You have created {templates.length} templates and {requests.length}{" "}
            requests so far!{" "}
          </p>
          <HomeListComponents />
        </Box>
      </>
    );
  } else {
    return "Loading...";
  }
};

function Home({ isUserLoged }) {
  return isUserLoged ? <UserLoggedBody /> : <Public />;
}

export default Home;
