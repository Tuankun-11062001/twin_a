import React from "react";
import searchIcon from "../assets/searchIcon.svg";
import usericon from "../assets/user.svg";
import Button from "../components/widget/button";
import { useNavigate } from "react-router-dom";

const NavTop = () => {  

  const navigate = useNavigate();
  const onBoxAdmin = (e) => {
    const box = e.target.querySelector(".navigation_top_box");
    box.classList.toggle("active");
  };

  const onListenLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="navigation navigation_top">
      <div className="navigation_top_search">
        <img src={searchIcon} alt="search_icon" />
        <input placeholder="Search..." />
      </div>
      <div className="navigation_top_right">
        <p className="navigation_top_money">$100</p>
        <div className="navigation_top_user" onClick={onBoxAdmin}>
          <img src={usericon} alt="user_icon" />
          <p>Admin</p>

          {/* box admin */}
          <div className="navigation_top_box">
            <Button
              title="Profile"
              classname="button button_top_admin"
              onListen={() => console.log("profile")}
            />
            <Button
              title="Logout"
              classname="button button_top_admin"
              onListen={onListenLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavTop;
