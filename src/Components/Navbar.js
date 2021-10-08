/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import ScrollspyNav from "react-scrollspy-nav";
import "./css/Navbar.css";
import logo from "./img/Navbar/logo.png";
import authContext from "../Context/auth/authContext";

function Navbar() {
  const context = useContext(authContext);
  const { signup, login, logout, currentUser } = context;

  const onnav = () => {
    let height = document.getElementById("mainListDiv").clientHeight;
    if (height === 0) {
      document.getElementById("mainListDiv").style.height = "100vh";
      document.getElementById("nav-container").style.backgroundColor = "#222";
      document.getElementById("mediaButton").style.animation = "rotate1 0.5s";
    } else {
      document.getElementById("mainListDiv").style.height = "0";
      document.getElementById("nav-container").style.backgroundColor =
        "rgba(255, 255, 255, 0)";
      document.getElementById("mediaButton").style.animation = "rotate2 0.5s";
    }
  };

  const offnav = () => {
    document.getElementById("mediaButton").style.animation = "rotate2 0.5s";
    document.getElementById("mainListDiv").style.height = "0";
  };

  return (
    <div>
      <ScrollspyNav
        scrollTargetIds={["Introduction", "Posts", "About", "Team", "Contact"]}
        offset={0}
        activeNavClass="is-active"
        scrollDuration="10"
        headerBackground="false"
      >
        <nav className="nav" id="nav">
          <div className="container" id="nav-container">
            <div className="logo">
              <img
                className="cursor-home"
                src={logo}
                style={{ height: "50px", marginBottom: "15px" }}
                alt="logo"
              />{" "}
              <a href="#" className="cursor-home">
                GitHub Campus Expert Korea
              </a>
            </div>
            <div id="mainListDiv" className="main_list">
              <ul>
                <a
                  className="nav1 cursor2"
                  onClick={offnav}
                  href="#Introduction"
                >
                  Introduction
                </a>
                <a className="nav2 cursor2" onClick={offnav} href="#Posts">
                  Posts
                </a>
                <a className="nav3 cursor2" onClick={offnav} href="#About">
                  About
                </a>
                <a className="nav4 cursor2" onClick={offnav} href="#Team">
                  Team
                </a>
                <a className="nav5 cursor2" onClick={offnav} href="#Contact">
                  Contact
                </a>
                <div className="dropdown">
                  <button className="dropbtn">
                    {currentUser.status ? (
                      <>
                        <img
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginRight: "5px",
                            objectFit: "cover",
                          }}
                          src={currentUser.user.image}
                          className=""
                          alt="userLogo"
                        />
                        {currentUser.user.name}
                      </>
                    ) : (
                      <>
                        <i className="user fad fa-user-circle"></i>SignUp/LogIn
                      </>
                    )}
                  </button>
                  <div className="dropdown-content">
                    {currentUser.status ? (
                      <a href="#" onClick={logout}>
                        Logout
                      </a>
                    ) : (
                      <>
                        <a href="#" onClick={signup}>
                          Signup
                        </a>
                        <a href="#" onClick={login}>
                          Login
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </ul>
            </div>

            <div className="media_button" onClick={onnav}>
              <button className="main_media_button" id="mediaButton">
                <span id="bar"></span>
                <span id="bar"></span>
                <span id="bar"></span>
              </button>
            </div>
          </div>
        </nav>
      </ScrollspyNav>
    </div>
  );
}

export default Navbar;
