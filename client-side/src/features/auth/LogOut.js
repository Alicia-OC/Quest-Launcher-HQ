import { useDispatch } from "react-redux";
import { setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const LogOut = (e) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      dispatch(setLogout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MenuItem onClick={handleLogout}>
      <FontAwesomeIcon
        style={{ marginRight: "8px" }}
        icon={faRightFromBracket}
      />
      Log Out
    </MenuItem>
  );
};

export default LogOut;
