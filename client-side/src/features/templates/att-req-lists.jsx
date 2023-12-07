import React, { useState } from "react";

/* DATABASE DEPENDENCIES*/
import CreateAttachment from "./createAttachment";
import CreateRequirements from "./createRequirements";

/* FONTAWESOME */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

/* CSS */
import "react-datepicker/dist/react-datepicker.css";

let RequestLists = (props) => {
  const [attachment, setAttachment] = useState([
    {
      value: "Att 1",
    },
    {
      value: "Att 2",
    },
    {
      value: "Att 3",
    },
  ]);
  const [requirements, setRequirements] = useState([
    {
      value: "Req 1",
    },
    {
      value: "Req 2",
    },
    {
      value: "Req 3",
    },
  ]);



  let attFormatted = attachment.map((att) => att.value);
  let reqFormatted = requirements.map((req) => req.value);

  props.getAttachments(attachment);
  props.getRequirements(requirements);

  /**attachments */
  function addAttachment(newAttachment) {
    setAttachment((prevAttachment) => {
      return [...prevAttachment, newAttachment];
    });
  }

  function deleteAttachment(e, id) {
    e.preventDefault();
    setAttachment((prevAttachment) => {
      return prevAttachment.filter((attachmentItem, index) => {
        return index !== id;
      });
    });
  }
  /**Requirements */
  function addRequirements(newRequirements) {
    setRequirements((prevRequirements) => {
      return [...prevRequirements, newRequirements];
    });
  }

  function deleteRequirements(e, id) {
    e.preventDefault();
    setRequirements((prevRequirements) => {
      return prevRequirements.filter((requirementsItem, index) => {
        return index !== id;
      });
    });
  }

  /**1. Button to send the att/req list props, couldn't think of anything better :( ) */
  const childToParentCall = (
    <button onClick={(e) => childToParentLists(e)}>
      <FontAwesomeIcon icon={faCheck} />{" "}
    </button>
  );

  const childToParentLists = (e) => {
    e.preventDefault();
    props.getAttachments(attFormatted);
    props.getRequirements(reqFormatted);
  };

  return (
    <>
      <div className="RequestLists">
        <div className="attachementsList">
          <label>
            Attachments list{childToParentCall}
            <p1 className="temporalButtonChildToParent">
              <em>Please click to save the list</em>
            </p1>
          </label>
          <ul id="templateLists">
            {attachment.map((attachmentItem, index) => {
              return (
                <li id={attachmentItem}>
                  {attachmentItem.value}
                  <button onClick={(e) => deleteAttachment(e, index)}>-</button>
                </li>
              );
            })}{" "}
            <CreateAttachment onAdd={addAttachment} />
          </ul>
        </div>
        <div className="deliverablesList">
          <label>
            Requirements list{childToParentCall}{" "}
            <p1 className="temporalButtonChildToParent">
              <em>Please click to save the list</em>
            </p1>
          </label>
          <ul id="templateLists">
            {requirements.map((reqItem, index) => {
              return (
                <li id={reqItem}>
                  {reqItem.value}
                  <button
                    id={reqItem}
                    onClick={(e) => deleteRequirements(e, index)}
                  >
                    -
                  </button>
                </li>
              );
            })}
            <CreateRequirements onAddReq={addRequirements} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default RequestLists;
