import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoImage from "../assets/logo.png";
import Svgs from "../localData/svgs";

const Navigation = () => {
  const listNav = [
    { title: "Dashboard", href: "/", typeIcon: "dashboard" },
    { title: "Product", href: "/product", typeIcon: "product" },
    { title: "Blog", href: "/blog", typeIcon: "blog" },
  ];
  return (
    <div className="navigation">
      <div className="navigation_left">
        <div className="navigation_logo">
          <Link href="/">
            <img src={logoImage} alt="logo" className="logo logo_small" />
          </Link>
        </div>
        <div className="navigation_left_list">
          {listNav.map((nav, indx) => (
            <NavLink to={nav.href} key={indx}>
              <Svgs type={nav.typeIcon} />
              <p>{nav.title}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
