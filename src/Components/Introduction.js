/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./css/Introduction.css";

export default function Introduction() {
  const [more1, setMore1] = useState(false);

  const _more1 = () => {
    if (more1 === true) {
      setMore1(false);
    } else {
      setMore1(true);
    }
  };
  const [more2, setMore2] = useState(false);

  const _more2 = () => {
    if (more2 === true) {
      setMore2(false);
    } else {
      setMore2(true);
    }
  };
  const [more3, setMore3] = useState(false);

  const _more3 = () => {
    if (more3 === true) {
      setMore3(false);
    } else {
      setMore3(true);
    }
  };

  return (
    <>
      <div className="Introduction z-10" id="Introduction">
        <div id="intro">
          INTRODUCTION
          <div style={{ fontSize: "20px", color: "black" }}>
            GitHub Campus Experts possess three main passions on
            <a style={{ fontStyle: "bold", color: "white" }}> Technology</a>,
            <a style={{ fontStyle: "bold", color: "white" }}> Communities</a>{" "}
            and
            <a style={{ fontStyle: "bold", color: "white" }}> Leadeship</a>
          </div>
        </div>

        <div className="introduction">
          <div className="box cursor-touch">
            <span></span>
            <div className="content">
              <h2>Technology</h2>
              <p
                style={
                  more1 === true ? { height: "auto" } : { height: "100px" }
                }
              >
                We are deeply passionate about technology. We work closely with
                our peers to close the gap {more1 === true ? "" : ".......... "}{" "}
                between industry and academia, creating new opportunities for
                students to learn industry-valued skills.
              </p>
              <a
                className="cursor2 btn1"
                onClick={_more1}
                style={{
                  cursor: "pointer",
                  color: `${more1 === true ? "white" : "black"}`,
                  backgroundColor: `${more1 === true ? "crimson" : "white"}`,
                }}
              >
                {more1 === true ? "Read less" : "Read more"}
              </a>
            </div>
          </div>
          <div className="box cursor-touch">
            <span></span>
            <div className="content">
              <h2>Community</h2>
              <p
                style={
                  more2 === true ? { height: "auto" } : { height: "100px" }
                }
              >
                We build technical communities around the world. As local
                leaders, We Campus Experts know
                {more2 === true ? "" : "....... "}
                the challenges students face at college. We bring positive
                impact not only in our respective campuses but also in various
                student communities.
              </p>
              <a
                className="cursor2 btn2"
                onClick={_more2}
                style={{
                  cursor: "pointer",
                  color: `${more2 === true ? "white" : "black"}`,
                  backgroundColor: `${more2 === true ? "crimson" : "white"}`,
                }}
              >
                {more2 === true ? "Read less" : "Read more"}
              </a>
            </div>
          </div>
          <div className="box cursor-touch">
            <span></span>
            <div className="content">
              <h2>Leadership</h2>
              <p
                style={
                  more3 === true ? { height: "auto" } : { height: "100px" }
                }
              >
                We provide students with valuable resources and training to
                ensure that they have everything they
                {more3 === true ? "" : "....."} need to face these challenges
                head on, achieve their goals, and better serve our student
                communities as leaders.
              </p>
              <a
                className="cursor2 btn3"
                onClick={_more3}
                style={{
                  cursor: "pointer",
                  color: `${more3 === true ? "white" : "black"}`,
                  backgroundColor: `${more3 === true ? "crimson" : "white"}`,
                }}
              >
                {more3 === true ? "Read less" : "Read more"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
