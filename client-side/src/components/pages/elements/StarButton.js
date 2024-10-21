import { React, useState, useEffect } from "react";
import Axios from "axios";
import { mongoDB_Template } from "../../../apis";
import { setFavTemplates } from "../../../state";
import { useDispatch, useSelector } from "react-redux";

import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

function StarButton(props) {
  const isStarred = props.isStarred;
  const id = props.getId;
  const isToUpdateBackend = props.isToUpdateBackend;
  const [starred, setStarred] = useState(isStarred);
  const [isUpdated, setIsUpdated] = useState(false);

  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(isUpdated);
    const updateTemplates = async () => {
      if (isUpdated) {
        const dbUpdated = await updateDB(); // Await the updateDB
        if (dbUpdated) {
          await UpdateFavs(); // Call UpdateFavs only if the DB update was successful
        }
        setIsUpdated(false);
      }
    };

    updateTemplates();
  }, [starred, isUpdated]);

  const UpdateFavs = async () => {
    console.log(user.favTemplates);
    {
      try {
        const response = await Axios.get(
          mongoDB_Template + `/${user._id}/favTemplates`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setFavTemplates({ favTemplates: response.data }));
      } catch (err) {
        const error = err.response ? err.response.data.message : err.message;
        if (error === "jwt expired") {
          console.log(error);
          // Optionally dispatch logout action here
        } else {
          console.error("Error fetching favorite templates:", error);
        }
      }
    }
  };

  const updateDB = async () => {
    console.log({ id: id, favorite: starred });
    try {
      await Axios.patch(
        mongoDB_Template + `/${id}`,
        { userId: user._id, id: id, favorite: starred },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setStarred(!starred);
    setIsUpdated(true);
  };

  return (
    <button onClick={(e) => handleChange(e)} className="buttonNew">
      {starred ? (
        <StarIcon style={{ fontSize: "1rem" }} />
      ) : (
        <StarBorderOutlinedIcon style={{ fontSize: "1rem" }} />
      )}
    </button>
  );
}

export default StarButton;
