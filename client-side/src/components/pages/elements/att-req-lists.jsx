import React, { useState, useEffect } from "react";

/* DATABASE DEPENDENCIES*/

import CreateAttachment from "./createAttachment";
import CreateRequirement from "./createRequirement";

/* CSS */
import "react-datepicker/dist/react-datepicker.css";

let RequestLists = (props) => {
  const [attachment, setAttachment] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const TemplateAttachments = props.sendTemplateAttachments;
  const TemplateRequirements = props.sendTemplateRequirements;

  const formattedAttachmentsList = [];
  const formattedRequirementsList = [];

  if (TemplateAttachments && TemplateRequirements) {
    for (let i = 0; i < TemplateAttachments.length; i++) {
      formattedAttachmentsList.push({ value: TemplateAttachments[i] });
    }
    for (let x = 0; x < TemplateRequirements.length; x++) {
      formattedRequirementsList.push({ value: TemplateRequirements[x] });
    }
  }

  useEffect(() => {
    if (TemplateAttachments && TemplateRequirements) {
      setAttachment(formattedAttachmentsList);
      setRequirements(formattedRequirementsList);
    }
  }, [TemplateAttachments, TemplateRequirements]);

  /**attachments */
  function AddAttachment(newAttachment) {
    setAttachment((prevAttachment) => {
      return [...prevAttachment, newAttachment];
    });
  }

  function DeleteAttachment(e, id) {
    e.preventDefault();
    setAttachment((prevAttachment) => {
      return prevAttachment.filter((attachmentItem, index) => {
        return index !== id;
      });
    });
  }

  /**Requirements */
  function AddRequirements(newRequirements) {
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

  useEffect(() => {
    props.getRequirements(requirements);
    props.getAttachments(attachment);
  }, [requirements, attachment]);

  return (
    <>
      <div className="RequestLists">
        <div className="attachementsList">
          <h4>List of items you will need:</h4>{" "}
          <ul id="templateLists">
            {attachment.map((attachmentItem, index) => {
              return (
                <li id={attachmentItem}>
                  <label>{attachmentItem.value}</label>
                  <button
                    className="generalButton"
                    onClick={(e) => DeleteAttachment(e, index)}
                  >
                    -
                  </button>
                </li>
              );
            })}{" "}
            <CreateAttachment onAddAtt={AddAttachment} />
          </ul>
        </div>
        <div className="deliverablesList">
          <h4>List of items expected to be received upon delivery:</h4>{" "}
          <ul id="templateLists">
            {requirements.map((reqItem, index) => {
              return (
                <li id={reqItem}>
                  <label>{reqItem.value}</label>
                  <button
                    className="generalButton"
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
            <CreateRequirement onAddReq={AddRequirements} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default RequestLists;
