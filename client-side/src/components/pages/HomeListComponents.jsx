import Axios from "axios";
import { useEffect } from "react";
import {  Grid } from "@mui/material";
import { HomeCard } from "./widgets/HomeCards.";
import { mongoDB_Template, mongoDB_Request } from "../../apis";
import { setTemplates, setFavTemplates, setRequests } from "../../state";
import { useDispatch, useSelector } from "react-redux";

const HomeListComponents = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const templates = user?.templates;
  const requests = user?.requests;

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

  function lastRequests() {
    if (!user?._id || !requests || requests.length === 0) {
      return [];
    }
    let array = [];
    for (
      let i = requests.length - 1, count = 0;
      count < 5 && i >= 0;
      i--, count++
    ) {
      array.push(requests[i]);
    }
    return array;
  }

  function lastTemplates() {
    if (!user?._id || !templates || templates.length === 0) {
      return [];
    }
    let array = [];
    for (
      let i = templates.length - 1, count = 0;
      count < 5 && i >= 0;
      i--, count++
    ) {
      array.push(templates[i]);
    }
    return array;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <h3>Last requests created:</h3>
        {lastRequests().map((item) => (
          <HomeCard
            key={item._id}
            text={<a href={"Request/" + item._id}> {item.title}</a>}
          />
        ))}
      </Grid>

      <Grid item xs={6}>
        <h3>Last templates created:</h3>
        {lastTemplates().map((item) => (
          <HomeCard
            key={item._id}
            text={<a href={"Template/" + item._id}> {item.title}</a>}
          />
        ))}
      </Grid>
    </Grid>
  );
};
export default HomeListComponents;
