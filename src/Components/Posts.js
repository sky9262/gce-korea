/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useContext } from "react";
import postContext from "../Context/post/postContext";
import PostForm from "./form/post/PostForm";
import "./css/Posts.css";
import "animate.css";
import Error505 from "./Error505";
import authContext from "../Context/auth/authContext";

export default function Posts() {
  const context = useContext(postContext);
  const {
    getPost,
    post,
    deletePost,
    editPost,
    fullPost,
    setFullPost,
    isPostFormOpen,
    setIsPostFormOpen,
  } = context;
  const { currentUser } = useContext(authContext);
  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelAddPost = () => {
    if (isPostFormOpen) {
      setIsPostFormOpen(false);
    } else {
      setIsPostFormOpen(true);
    }
  };

  const readMore = (post) => {
    document.getElementById("fullpage").scrollTo(0, 0);
    setFullPost("100vw");
    document.getElementById("fullpageTitle").innerHTML = post.title;
    document.getElementById("fullpageTitle").classList.add("animate__bounce");

    setTimeout(function () {
      document.getElementById("fullpageLine").style.width =
        document.getElementById("fullpageImage").offsetWidth + "px";
    }, 1600);

    document.body.style.overflow = "hidden";
    document.getElementById("fullpageImage").classList.add("animate__fadeInUp");
    document.getElementById("fullpageImage").src = post.image;
    setTimeout(function () {
      document.getElementById("fullpageImage").style.visibility = "visible";
    }, 600);

    setTimeout(function () {
      document.getElementById("fullpageDesc").style.visibility = "visible";
    }, 1000);
    document.getElementById("fullpageDesc").style.animationDelay = "1s";
    document.getElementById("fullpageDesc").innerHTML = post.description;
    document
      .getElementById("fullpageDesc")
      .classList.remove("animate__lightSpeedOutRight");
    document
      .getElementById("fullpageDesc")
      .classList.add("animate__lightSpeedInLeft");

    document.getElementById("fullpageInfo").innerHTML =
      "\u00A0\u00A0\u00A0Event Date: " +
      post.event_date.bold().fontcolor("#d61e3c") +
      "\u00A0\u00A0\u00A0Category: " +
      post.category.bold().fontcolor("#d61e3c");

    if (post.button) {
      document.getElementById("fullpageInfo").style.paddingBottom = "10px";
      document.getElementById("fullpage").style.paddingBottom = "150px";
      document.getElementById("fullpageButton").style.visibility = "visible";
      document.getElementById("fullpageButton").href = post.link;
      document.getElementById("fullpageButton").innerHTML = post.button;
    } else {
      document.getElementById("fullpageInfo").style.paddingBottom = "200px";
      document.getElementById("fullpageButton").style.visibility = "hidden";
    }

    document
      .getElementById("fullpageInfo")
      .classList.add("animate__bounceInUp");
    setTimeout(function () {
      document.getElementById("fullpageInfo").style.visibility = "visible";
    }, 1000);

    document
      .getElementById("fullpageButton")
      .classList.add("animate__rubberBand");
  };

  const readLess = () => {
    setFullPost("0vw");
    document
      .getElementById("fullpageTitle")
      .classList.remove("animate__bounce");
    document.getElementById("fullpageLine").style.width = "0vw";

    setTimeout(function () {
      document.getElementById("fullpageImage").style.visibility = "hidden";
    }, 300);
    document
      .getElementById("fullpageImage")
      .classList.remove("animate__fadeInUp");
    document.body.style.overflowY = "scroll";

    document.getElementById("fullpageDesc").style.animationDelay = "0s";
    document
      .getElementById("fullpageDesc")
      .classList.remove("animate__lightSpeedInLeft");
    document.getElementById("fullpageDesc").style.visibility = "hidden";

    document.getElementById("fullpageInfo").style.visibility = "hidden";
    document
      .getElementById("fullpageInfo")
      .classList.remove("animate__bounceInUp");

    document
      .getElementById("fullpageButton")
      .classList.remove("animate__rubberBand");
  };

  return (
    <>
      <div
        id="fullpage"
        className="fullpage z-10 fullpage-content"
        style={{ height: "100vh", width: fullPost }}
      >
        <a
          className="fullpage-close cursor-check"
          onClick={() => {
            readLess();
          }}
        >
          <i className="fad fa-times-circle" style={{ color: "#b40000" }}></i>
        </a>
        <div className="fullpage-content">
          <div className="fullpageTitle" id="fullpageTitle"></div>
          <div className="fullpageLine" id="fullpageLine"></div>
          <img
            className="fullpageImage"
            id="fullpageImage"
            src=""
            alt="ReadMoreImage"
          />
          <div className="fullpageDescBox" id="fullpageDescBox">
            <div className="fullpageDesc" id="fullpageDesc"></div>
          </div>
          <div className="fullpageInfoBox" id="fullpageInfoBox">
            <div className="fullpageInfo" id="fullpageInfo"></div>
          </div>
        </div>
        {/* eslint-disable-next-line */}
        <a
          id="fullpageButton"
          className="btn btn-outline-danger cursor2"
          href=""
          target="_blank"
          rel="noreferrer"
        ></a>
      </div>
      <div id="Posts" className="z-10">
        <div className="jumbotron text-center mb-2">
          <h1 className="display-4" style={{ paddingTop: "90px" }}>
            Posts
          </h1>
          <p>
            <i>GitHub Campus Experts Korea Blog</i>
          </p>
        </div>
        <div className="Posts">
          <div
            className="container-fluid d-flex justify-content-center"
            style={{ maxWidth: "80vw" }}
          >
            <div className="row">
              {post.length === 0 && <Error505 />}
              {post
                .slice(0)
                .reverse()
                .map((post) => (
                  <div
                    key={post._id}
                    data-aos="zoom-in"
                    className="col-md-4 my-2 d-flex justify-content-center"
                    style={{ height: "370px" }}
                  >
                    <div className="cursor2 card text-center">
                      {currentUser.status && (
                        <>
                          <button
                            type="button"
                            className="editBtn btn btn-outline-danger my-2 cursor2"
                            onClick={() => {
                              deletePost(post._id);
                            }}
                          >
                            <i className="fad fa-trash-alt"></i>
                          </button>

                          <button
                            type="button"
                            className="deleteBtn btn btn-outline-danger my-2 cursor2"
                            onClick={() => {
                              editPost(post);
                            }}
                          >
                            <i className="fad fa-edit"></i>
                          </button>
                        </>
                      )}
                      <div className="overflow border-bottom">
                        <img
                          src={post.image}
                          alt={`${post.title}`}
                          className={
                            post.zoom
                              ? `cursor-zoom pt-1 card-img card-img-top ${post.zoom}`
                              : "cursor-zoom pt-1 card-img card-img-top"
                          }
                        />
                      </div>
                      <div className="card-body text-dark">
                        <h4 className="card-title mx-1">{post.title}</h4>
                        <p className="card-text text-secoundary">
                          {post.subtitle.slice(0, 80)}
                          {post.subtitle.length > 80 ? "....." : ""}
                        </p>
                      </div>
                      <button
                        href="#fullpage"
                        onClick={() => readMore(post)}
                        type="button"
                        className="cursor-read mb-4 btn btn-outline-danger"
                        style={{ width: "80%" }}
                      >
                        Read more
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {currentUser.status && (
          <>
            <button
              key={post._id}
              id="addPost"
              type="button"
              className="cursor-read mt-5 btn btn-outline-danger"
              onClick={handelAddPost}
              style={{
                width: "90vw",
                display: "flex",
                justifyContent: "space-evenly",
                alignContent: "center",
                alignItems: "center",
                marginBottom: "50px",
              }}
            >
              <i
                className={`fad fa-chevron-circle-${
                  isPostFormOpen ? "up" : "down"
                }`}
              ></i>
              Add Post
              <i
                className={`fad fa-chevron-circle-${
                  isPostFormOpen ? "up" : "down"
                }`}
              ></i>
            </button>
          </>
        )}
        {isPostFormOpen ? <PostForm /> : ""}
      </div>
    </>
  );
}
