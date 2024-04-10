import { useDispatch } from "react-redux";
import { setLogout } from ".";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { jwtDecode } from "jwt-decode";

function CheckTokenExpiration(props) {
  const token = useSelector((state) => state.token);
  const tokenExpiresAt = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  console.log(tokenExpiresAt, currentTime);
  const dispatch = useDispatch();

  if (props === "jwt expired") {
    dispatch(setLogout());
  }

  return;
}

export default CheckTokenExpiration;
