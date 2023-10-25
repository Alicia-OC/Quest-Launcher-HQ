import { useState, useEffect } from "react";
import { mongoDB_Request } from "../../apis";
import Axios from "axios";

const GetRequest = () => {
  const [request, setRequest] = useState();
  useEffect(() => {
    Axios.get(mongoDB_Request)
      .then((res) => setRequest(res.data))
      .catch((err) => console.log(err));
  }, []);

  return request;
};

export default GetRequest;
