import Axios from "axios";
import { setFavTemplates } from "../../state";
import { mongoDB_Template } from "../../apis";

import { useDispatch, useSelector } from "react-redux";


const GetFavTemplates2 = async () =>{
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    console.log(user.fav)

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

}

export default GetFavTemplates2;
