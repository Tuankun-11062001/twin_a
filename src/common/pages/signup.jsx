import React, { useState } from "react";
import logoImage from "../assets/logo.png";
import Input from "../components/widget/input";
import Button from "../components/widget/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetMessage, signUpThunk } from "../providers/slices/userSlice";
import NotificationInfo from "../components/notification";

const Signup = () => {
  const dispatch = useDispatch();
  const { user, message } = useSelector((state) => state.user);

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
    rePassword: "",
  });

  console.log("message", message);

  const [errorForm, setErrorForm] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
    setErrorForm("");
    dispatch(resetMessage(""));
  };

  const onSubmit = async () => {
    // check field empty
    if (
      dataForm.email === "" ||
      dataForm.password === "" ||
      dataForm.rePassword === ""
    ) {
      setErrorForm("Please fill all fields");
      return;
    }

    // check email
    if (!dataForm.email.includes("@")) {
      setErrorForm("Please enter a valid email");
      return;
    }

    // check password
    if (dataForm.password !== dataForm.rePassword) {
      setErrorForm("Password not match");
      return;
    }

    dispatch(signUpThunk(dataForm));
  };
  return (
    <div className="layout layout_signup signup">
      <div className="signup_body">
        <img src={logoImage} alt="logo_Twin" className="logo logo_signup" />
        <div className="signup_content">
          <h2>Sign up</h2>
          <div className="signup_group">
            <p>Email</p>
            <Input
              placeholder="Your Email"
              classname="input input_signup"
              type="email"
              name="email"
              value={dataForm.email}
              onListen={handleChange}
            />
          </div>
          <div className="signup_group">
            <p>Password</p>
            <Input
              placeholder="Your Password..."
              classname="input input_signup"
              type="password"
              name="password"
              value={dataForm.password}
              onListen={handleChange}
            />
          </div>
          <div className="signup_group">
            <p>Re-password</p>
            <Input
              placeholder="Your Password again..."
              classname="input input_signup"
              type="password"
              name="rePassword"
              value={dataForm.rePassword}
              onListen={handleChange}
            />
          </div>

          {message && <p className="signup_success">{message}</p>}
          {errorForm && <p className="signup_error">{errorForm}</p>}
          <Button
            title="Sign up"
            onListen={onSubmit}
            classname="button button_signup"
          />
          <div className="signup_footer">
            <p>
              If you have account, so <Link to="/login">Login here!</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
