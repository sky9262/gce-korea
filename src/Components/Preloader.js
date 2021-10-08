import React, { Component } from "react";
import "./css/Preloader.css";
import preloaderImage from "./img/Preloader/yogocat.gif";
import SpidyOctocat from "./img/Preloader/spidertocat.png";
import FilmToCat from "./img/Preloader/filmtocat.png";

export default class Preloader extends Component {
  render() {
    return (
      <div className="preloader cursor-confused">
        <div className="main-content">
          <div className="preloader-img">
            <img src={preloaderImage} alt="preloaderImage" />
          </div>
          <div className="preloader-text">
            <img
              src="https://readme-typing-svg.herokuapp.com?size=40&center=true&vCenter=true&lines=Loading..."
              alt="Loading..."
            />
          </div>
        </div>

        <div className="spidy-octocat">
          <img src={SpidyOctocat} alt="SpidyOctocat" />
        </div>
        <div className="FilmToCat">
          <img src={FilmToCat} alt="FilmToCat" />
        </div>
      </div>
    );
  }
}
