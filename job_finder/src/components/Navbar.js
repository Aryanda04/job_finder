import React from "react";
import logoSanbercode from "../assets/img/logo.png";
import "./nav-style.css";

import Cookies from "js-cookie";
const Nav = () => {
  return (
    <>
      <div>
        <div className="topnav z-100">
          <a href>
            <img src={logoSanbercode} width={70} />
          </a>
          <a href="/">Home</a>
          {/* <a href="/dashboard/list-job-vacancy">Job List</a> */}
          {/* <a href="/login">Login</a> */}

          {/* <a href="/profile">Profile</a> */}
          {!Cookies.get("token") && <a href="/login">Login</a>}
          {!Cookies.get("token") && <a href="/register">Register</a>}
          {Cookies.get("token") && <a href="/dashboard">Profile</a>}

          {Cookies.get("token") && (
            <a
              href="/"
              onClick={() => {
                Cookies.remove("token");
              }}
            >
              Logout
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
