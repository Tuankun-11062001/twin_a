import React from "react";
import { Link } from "react-router-dom";
import Button from "./widget/button";
import { actions, useProviderNotification } from "../providers";
import { data } from "./chart";

const Notification = ({ type, data }) => {
  const matchNotifications = () => {
    switch (type) {
      case "signup":
        return <NotificationSignup />;
      case "forgotPassword":
        return <NotificationForgotPassword />;
      case "add":
        return <NotificationAdd data={data} />;
      case "delete":
        return <NotificationDelete data={data} />;
      default:
        return "";
    }
  };
  return (
    <div className="notification">
      <div className="notification_overlay">
        <div className="notification_content">{matchNotifications()}</div>
      </div>
    </div>
  );
};

const NotificationSignup = () => {
  return (
    <div className="notification_signup">
      <h2>Notification</h2>
      <p>Sign up account successfull!</p>
      <Link to="/login">Login here</Link>
    </div>
  );
};

const NotificationForgotPassword = () => {
  return (
    <div className="notification_forgot">
      <h2>Notification</h2>
      <p>Your password is reset! New password in your email</p>
      <Link to="/login">Login here</Link>
    </div>
  );
};

const NotificationAdd = ({ data }) => {
  const [state, dispatch] = useProviderNotification();
  const onListenCloseNotification = () => {
    dispatch(actions.setNotificationAdd(false));
  };
  return (
    <div className="notification_add_product">
      <h2>{data.title}</h2>
      <p>{data.body}</p>
      <Button
        title="Understand"
        classname="button button_add"
        onListen={onListenCloseNotification}
      />
    </div>
  );
};

const NotificationDelete = ({ data }) => {
  const [state, dispatch] = useProviderNotification();

  const onListenCloseNotification = () => {
    dispatch(actions.setNotificationDelete(false));
  };
  return (
    <div className="notification_delete_product">
      <div className="head">
        <h2>{data.title}</h2>
        <p>{data.code}</p>
      </div>
      <p>{data.body}</p>
      <div className="foot">
        <Button
          title="Yes"
          classname="button button_yes"
          onListen={data.handleYesDelete}
        />
        <Button
          title="No"
          classname="button button_no"
          onListen={onListenCloseNotification}
        />
      </div>
    </div>
  );
};

export default Notification;
