import React, { useState } from "react";

/* DATABASE DEPENDENCIES*/
import CreateAttachment from "./createAttachment";
import CreateRequirement from "./createRequirement";

/* FONTAWESOME */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

/* CSS */
import "react-datepicker/dist/react-datepicker.css";

let RequestLists = (props) => {
  const [attachment, setAttachment] = useState([]);
  const [requirements, setRequirements] = useState([]);

  props.getAttachments(attachment);
  props.getRequirements(requirements);

  const TemplateAttachments = props.sendTemplateAttachments;
  const TemplateRequirements = props.sendTemplateRequirements;

  let TemplateAttachmentsLoop;
  let TemplateRequirementsLoop;

  if (TemplateAttachments && TemplateRequirements) {
    TemplateAttachmentsLoop = TemplateAttachments.map((item) => (
      <li>{item}</li>
    ));

    TemplateRequirementsLoop = TemplateRequirements.map((item) => (
      <li>{item}</li>
    ));
  }

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

  return (
    <>
      <div className="RequestLists">
        <div className="attachementsList">
          <h4>List of items attached to this request:</h4>{" "}
          <ul id="templateLists">
            {TemplateAttachmentsLoop}
            {attachment.map((attachmentItem, index) => {
              return (
                <li id={attachmentItem}>
                  <input
                    onChange={(e) => console.log(e.target.value)}
                    value={attachmentItem.value}
                  ></input>
                  <button onClick={(e) => deleteAttachment(e, index)}>-</button>
                </li>
              );
            })}{" "}
            <CreateAttachment onAdd={addAttachment} />
          </ul>
        </div>
        <div className="deliverablesList">
          <h4>List of items expected to be received upon delivery:</h4>{" "}
          <ul id="templateLists">
            {TemplateRequirementsLoop}
            {requirements.map((reqItem, index) => {
              return (
                <li id={reqItem}>
                  <input
                    onChange={(e) => console.log(e.target.value)}
                    value={reqItem.value}
                  ></input>
                  

                  <button
                    id={reqItem}
                    onClick={(e) => deleteRequirements(e, index)}
                  >
                    -
                  </button>
                </li>
              );
            })}
          </ul>
          <ul id="templateLists">
            <CreateRequirement onAddReq={addRequirements} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default RequestLists;
