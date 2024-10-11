import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";

import { setRequests } from "../../state/index.js";
import { mongoDB_Request } from "../../apis.js";

function RequestList() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user); //
  const token = useSelector((state) => state.token);
  const requests = user.requests;
  const requestArr = [];

  const getRequests = async () => {
    Axios.get(mongoDB_Request + `/${user._id}/allrequests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(setRequests({ requests: res.data }));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (requests !== null) {
    for (let i = 0; i < requests.length; i++) {
      requestArr.push(
        <li className="libraryDiv"
          key={requests[i]._id}
          id={requests[i]._id}
          value={requests[i].title}
        >
          <a  href={"Request/" + requests[i]._id}> {requests[i].title}</a>
        </li>
      );
    }
  } else {
    window.location.replace("/login");
  }

  return (
    <div className="RequestListed">
      <h2>Your requests:</h2>
      <button onClick={(e) => window.location.replace("/NewRequest")}>
        Create new
      </button>
      <ul>{requestArr}</ul>
    </div>
  );
}

export default RequestList;
