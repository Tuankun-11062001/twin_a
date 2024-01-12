import React, { useState } from "react";
import logoImage from "../assets/logo.png";
import Input from "../components/widget/input";
import Button from "../components/widget/button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../localData/auth";
import Notification from "../components/notification";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    email: "",
    secretPassword: "",
  });

  const [notification, setNotification] = useState(false);

  const [errorForm, setErrorForm] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
    setErrorForm("");
  };

  const onSubmit = () => {
    // check field empty
    if (dataForm.email === "" || dataForm.secretPassword === "") {
      setErrorForm("Please fill all fields");
      return;
    }
    // check email
    if (!dataForm.email.includes("@")) {
      setErrorForm("Please enter a valid email");
      return;
    }

    // check secret password
    const user = auth.find((u) => u.email === dataForm.email);
    if (!user) {
      setErrorForm("user not exist");
      return;
    }
    if (user.secretPassword !== dataForm.secretPassword) {
      setErrorForm("secret password incorrect");
      return;
    }
    setNotification(true);
  };
  return (
    <div className="layout layout_forgot forgot">
      <div className="forgot_body">
        <img src={logoImage} alt="logo_Twin" className="logo logo_forgot" />
        <div className="forgot_content">
          <h2>Forgot Password</h2>
          <div className="forgot_group">
            <p>Email</p>
            <Input
              placeholder="Your Email"
              classname="input input_forgot"
              type="email"
              name="email"
              value={dataForm.email}
              onListen={handleChange}
            />
          </div>
          <div className="forgot_group">
            <p>Your secret password</p>
            <Input
              placeholder="Your secret password"
              classname="input input_forgot"
              type="password"
              name="secretPassword"
              value={dataForm.secretPassword}
              onListen={handleChange}
            />
          </div>
          {errorForm && <p className="forgot_error">{errorForm}</p>}
          <Button
            title="Get new password"
            onListen={onSubmit}
            classname="button button_forgot"
          />
          <div className="forgot_footer">
            <Link to="/login">login</Link>
            <span>|</span>
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
        {notification && <Notification type="forgotPassword" />}
      </div>
    </div>
  );
};

export default ForgotPass;
