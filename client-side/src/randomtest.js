import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import moment from "moment-timezone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

function UserProfile() {
  const user = useSelector((state) => state.user);
  const createdAt = moment(user.createdAt).format("MMMM Do YYYY");

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
        <button id="fullName" onClick={() => handleEdit("fullName")}>
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
        <button id="email" onClick={() => handleEdit("email")}>
        <FontAwesomeIcon icon={isEditingName ? faCheck : faEdit} />
        </button>
      </ul>
      <ul>
        <label>Title:</label> {user.title}
      </ul>
      <ul>
        <label>Role:</label> {user.role}
      </ul>
      <ul>
        <label>
          Account created on <b>{createdAt}</b>
        </label>
      </ul>
    </div>
  );
}

export default UserProfile;
