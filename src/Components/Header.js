import React, { useEffect, useState } from "react";
import "./css/Header.css";
import gitFlag from "./img/Header/flag.png";
import taegeuk_in from "./img/Header/taegeuk-in.png";
import taegeuk_out from "./img/Header/taegeuk-out.png";
import cap1 from "./img/Header/cap/cap1.png";
import cap2 from "./img/Header/cap/cap2.png";
import cap3 from "./img/Header/cap/cap3.png";
import cap4 from "./img/Header/cap/cap4.png";
import cap5 from "./img/Header/cap/cap5.png";
import cloud1 from "./img/Header/cloud1.png";
import cloud2 from "./img/Header/cloud2.png";
import Hi from "./img/Header/Hi.gif";

export default function Header() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
      if (window.pageYOffset > 250) {
        document.getElementById("mode").style.zIndex = "-99";
        document.getElementById("mode").style.visibility = "hidden";
      } else {
        document.getElementById("mode").style.zIndex = "99";
        document.getElementById("mode").style.visibility = "visible";
      }
      if (window.pageYOffset > 150) {
        document.getElementById("nav").style.backgroundColor = "#222";
        document.getElementById("nav").style.transform = "scale(1.0)";
      } else {
        document.getElementById("nav").style.backgroundColor =
          "rgba(255, 255, 255, 0)";
        document.querySelector(".dropbtn").style.backgroundColor =
          "rgba(255, 255, 255, 0)";
        if (window.innerWidth > 769) {
          document.getElementById("nav").style.transform = "scale(1.1)";
        }
      }
    };

    window.onload = DefaultBg;
  });

  const DefaultBg = (time) => {
    time = new Date().getHours();
    if ((time >= 6) & (time <= 11)) {
      document.getElementById("bg").style.backgroundImage =
        " -webkit-linear-gradient(#8FCCD8, #F7D4A6)";
    }
    if ((time >= 12) & (time <= 16)) {
      document.getElementById("bg").style.backgroundImage =
        "radial-gradient(80px at 85% 16%, rgb(255 255 255) 10%, rgb(255 255 255), rgb(255 254 225) 60%, rgb(253, 251, 211) 70%, rgb(2, 153, 218) 200%)";
    }
    if ((time >= 17) & (time <= 20)) {
      document.getElementById("bg").style.backgroundImage =
        " -webkit-radial-gradient(bottom, circle,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%)";
    }
    if (time > 20 || time < 6) {
      document.getElementById("bg").style.backgroundImage =
        " radial-gradient(250px circle at 85% 17%, #7a7a7a 0%, #c7c5be 75%, #383838 100%)";
    }

    document.getElementById("Header").style.background =
      document.getElementById("bg").style.backgroundImage;
  };

  return (
    <>
      <div id="Header" className="z-10">
        <div id="bg" className="bg"></div>
        <div
          className="wave"
          id="wave1"
          style={{ backgroundPositionX: 500 + offset * 4 + "px" }}
        ></div>
        <div
          className="wave"
          id="wave2"
          style={{ backgroundPositionX: 400 + offset * -4 + "px" }}
        ></div>
        <div
          className="wave"
          id="wave3"
          style={{ backgroundPositionX: 300 + offset * 2 + "px" }}
        ></div>
        <div
          className="wave"
          id="wave4"
          style={{ backgroundPositionX: 200 + offset * -2 + "px" }}
        ></div>
        <div className="content" id="content">
          <img className="git-flag" src={gitFlag} alt="Git-Flag" />
          <div className="taegeuk">
            <img className="taegeuk_in" src={taegeuk_in} alt="taegeuk_in" />
            <img className="taegeuk_out" src={taegeuk_out} alt="taegeuk_out" />
          </div>
          <img className="cap cap1" src={cap1} alt="cap1" />
          <img className="cap cap2" src={cap2} alt="cap2" />
          <img className="cap cap3" src={cap3} alt="cap3" />
          <img className="cap cap4" src={cap4} alt="cap4" />
          <img className="cap cap5" src={cap5} alt="cap5" />
          <img
            className="cloud cloud1"
            src={cloud1}
            style={{ left: 0 + offset * 1 + "px" }}
            alt="cloud1"
          />
          <img
            className="cloud cloud2"
            src={cloud2}
            style={{ right: 0 + offset * 3 + "px" }}
            alt="cloud2"
          />
          <img
            className="cloud cloud3"
            src={cloud2}
            style={{ left: 0 + offset * 2 + "px" }}
            alt="cloud3"
          />
          <img
            className="cloud cloud4"
            src={cloud1}
            style={{ right: 0 + offset * 1.5 + "px" }}
            alt="cloud4"
          />
        </div>
        <div className="birds">
          <div className="bird-container bird-container--one">
            <div className="bird bird--one"></div>
          </div>

          <div className="bird-container bird-container--two">
            <div className="bird bird--two"></div>
          </div>

          <div className="bird-container bird-container--three">
            <div className="bird bird--three"></div>
          </div>

          <div className="bird-container bird-container--four">
            <div className="bird bird--four"></div>
          </div>
        </div>
        <div className="header-text">
          <div className="text" style={{ fontSize: "4vw" }}>
            반갑습니다!
            <img
              alt="Hi"
              className="cursor-hello"
              style={{
                display: "inline-block",
                position: "relative",
                top: "-5px",
              }}
              src={Hi}
              width="50vw"
            />
          </div>
          <div className="text">BE PART OF OUR GCE🇰🇷</div>
          <div className="text">STORY!</div>
        </div>

        <div id="mode" className="mode" onMouseLeave={DefaultBg}>
          <div
            className="day cursor-surprised"
            onMouseEnter={() =>
              (document.getElementById("bg").style.backgroundImage =
                " -webkit-linear-gradient(#8FCCD8, #F7D4A6)")
            }
          >
            <div className="mode-icon">
              <i className="fas fa-sun-cloud"></i>
            </div>
            <div className="mode-text cursor-surprised">Morning</div>
          </div>
          <div
            className="mid-day cursor-creativity"
            onMouseEnter={() =>
              (document.getElementById("bg").style.backgroundImage =
                "radial-gradient(80px at 85% 16%, rgb(255 255 255) 10%, rgb(255 255 255), rgb(255 254 225) 60%, rgb(253, 251, 211) 70%, rgb(2, 153, 218) 200%)")
            }
          >
            <div className="mode-icon">
              <i className="fa fa-sun-o" aria-hidden="true"></i>
            </div>
            <div
              className="mode-text cursor-creativity"
              style={{ marginLeft: "5px", fontSize: "15px" }}
            >
              Afternoon
            </div>
          </div>
          <div
            className="Evening cursor-breathing"
            onMouseEnter={() =>
              (document.getElementById("bg").style.backgroundImage =
                " -webkit-radial-gradient(bottom, circle,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%)")
            }
          >
            <div className="mode-icon">
              {/* <i className="fa fa-sun-o" aria-hidden="true"></i> */}
              <i className="fas fa-sun-haze"></i>
            </div>
            <div className="mode-text cursor-breathing">Evening</div>
          </div>
          <div
            className="night cursor-dream"
            onMouseEnter={() =>
              (document.getElementById("bg").style.backgroundImage =
                "radial-gradient(250px circle at 85% 17%, #7a7a7a 0%, #c7c5be 75%, #383838 100%)")
            }
          >
            <div className="mode-icon">
              {/* <i className="fa fa-moon-o" aria-hidden="true"></i> */}
              <i className="fas fa-moon-stars"></i>
            </div>
            <div className="mode-text cursor-dream">Night</div>
          </div>
        </div>
      </div>
    </>
  );
}
