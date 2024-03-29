import React, { useState } from "react";
import logoImage from "../assets/logo.png";
import Input from "../components/widget/input";
import Button from "../components/widget/button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../localData/auth";
import { login } from "../api/userAPI";

const Login = () => {
  console.log(auth);
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
    secretCode: "",
  });

  const [errorForm, setErrorForm] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
    setErrorForm("");
  };

  const onSubmit = async () => {
    // check field empty
    if (
      dataForm.email === "" ||
      dataForm.password === "" ||
      dataForm.secretCode === ""
    ) {
      setErrorForm("Please fill all fields");
      return;
    }

    // check email
    if (!dataForm.email.includes("@")) {
      setErrorForm("Please enter a valid email");
      return;
    }

    const user = await login(dataForm);

    if (user?.status === 400) {
      setErrorForm(user.message);
      return;
    }

    const token = user.email;
    localStorage.setItem("token", JSON.stringify(token));
    navigate("/");
  };
  return (
    <div className="layout layout_login login">
      <div className="login_body">
        <img src={logoImage} alt="logo_Twin" className="logo logo_login" />
        <div className="login_content">
          <h2>Login</h2>
          <div className="login_group">
            <p>Email</p>
            <Input
              placeholder="Your Email"
              classname="input input_login"
              type="email"
              name="email"
              value={dataForm.email}
              onListen={handleChange}
            />
          </div>
          <div className="login_group">
            <p>Password</p>
            <Input
              placeholder="Your Password..."
              classname="input input_login"
              type="password"
              name="password"
              value={dataForm.password}
              onListen={handleChange}
            />
          </div>
          <div className="login_group">
            <p>
              Secret password <span>(Secret pass in your email)</span>
            </p>
            <Input
              placeholder="Your Secret Password..."
              classname="input input_login"
              type="password"
              name="secretCode"
              value={dataForm.secretCode}
              onListen={handleChange}
            />
          </div>
          {errorForm && <p className="login_error">{errorForm}</p>}
          <Button
            title="Login"
            onListen={onSubmit}
            classname="button button_login"
          />
          <div className="login_footer">
            <Link to="/forgotPassword">Forgot Account</Link>
            <span>|</span>
            <Link to="/signup">Sign up Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
