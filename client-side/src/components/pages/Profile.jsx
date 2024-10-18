import { useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux/es/hooks/useSelector";
import moment from "moment-timezone";
import { mongoDB_Users } from "../../apis";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

import { setFullName } from "../../state";

function UserProfile() {
  const user = useSelector((state) => state.user);
  const createdAt = moment(user.createdAt).format("MMMM Do YYYY");
  const dispatch = useDispatch();


  const [inputName, setInputName] = useState(user.fullName);
  const [inputEmail, setInputEmail] = useState(user.email);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleEdit = (field) => {
    if (field === "fullName") {
      setIsEditingName(!isEditingName);
    } else if (field === "email") {
      setIsEditingEmail(!isEditingEmail);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputName, inputEmail);
    try {
      const res = Axios.patch(mongoDB_Users, {
        userId: user._id,
        fullName: inputName,
      });
      dispatch(setFullName({ fullName: inputName }));
    } catch (error) {}
  };

  return (
    <div className="" id={user._id}>
      <ul>
        <label>Name:</label>
        {isEditingName ? (
          <input
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        ) : (
          inputName
        )}
        <button
          className="generalButton"
          id="fullName"
          onClick={() => handleEdit("fullName")}
        >
          <FontAwesomeIcon icon={isEditingName ? faCheck : faEdit} />
        </button>
      </ul>
      <ul>
        <label>Email address:</label>
        {isEditingEmail ? (
          <input
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
        ) : (
          inputEmail
        )}
        <button
          className="generalButton"
          id="email"
          onClick={() => handleEdit("email")}
        >
          <FontAwesomeIcon icon={isEditingEmail ? faCheck : faEdit} />
        </button>
      </ul>
      <ul>
        <label>Title:</label> {user.title}
      </ul>
      <ul>
        {" "}
        <label>Role:</label> {user.role}
      </ul>
      <ul>
        {" "}
        <label>
          Account created on <b>{createdAt}</b>
        </label>
      </ul>
      <button onClick={(e) => handleSubmit(e)}>Save changes</button>
    </div>
  );
}

export default UserProfile;
