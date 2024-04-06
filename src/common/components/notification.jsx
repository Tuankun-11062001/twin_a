import React from "react";

const NotificationInfo = ({ info, handleClose }) => {
  return (
    <div className="notification info">
      <div className="content">
        <p>{info}</p>
        <button onClick={handleClose}>Done</button>
      </div>
    </div>
  );
};

export const NotificationAsk = ({ info, handleClose, handleAccept }) => {
  return (
    <div className="notification ask">
      <div className="content">
        <p>{info}</p>
        <div className="btns">
          <button onClick={handleAccept}>Apcept</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationInfo;
