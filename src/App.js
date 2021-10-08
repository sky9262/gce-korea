import "./App.css";
import "./bootstrap.min.css";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Introduction from "./Components/Introduction";
import Posts from "./Components/Posts";
import About from "./Components/About";
import Team from "./Components/Team";
import ContactUs from "./Components/ContactUs";
import Footer from "./Components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useState } from "react";
import Preloader from "./Components/Preloader";
import TeamState from "./Context/team/TeamState";
import PostState from "./Context/post/PostState";
import AboutState from "./Context/about/AboutState";
import AuthState from "./Context/auth/AuthState";
const dotenv = require("dotenv");

dotenv.config();
AOS.init();

export default function App() {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
    document.body.style.overflow = "scroll";
    document.body.style.overflowX = "hidden";
  }, 15000);

  // eslint-disable-next-line

  return (
    <div className="App overflow-hidden">
      {isLoading ? <Preloader /> : ""}
      <TeamState>
        <PostState>
          <AboutState>
            <AuthState>
              <Navbar />
              <Header />
              <Introduction />
              <Posts />
              <About />
              <Team />
              <ContactUs />
              <Footer />
            </AuthState>
          </AboutState>
        </PostState>
      </TeamState>
    </div>
  );
}
