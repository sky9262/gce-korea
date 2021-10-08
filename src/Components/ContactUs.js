import "./css/ContactUs.css";

import React, { Component } from "react";

export default class Contect_us extends Component {
  render() {
    return (
      <div id="Contact">
        <div className="contact-bg">
          <div className="form-wrapper">
            <form
              id="form"
              method="POST"
              name="emailform"
              action="https://formspree.io/f/meqvnavp"
            >
              <h3 className="form-title" style={{ textAlign: "center" }}>
                CONTACT US
              </h3>
              <p className="form-undertitle" style={{ textAlign: "center" }}>
                Any inquires on GCE Korea is welcome! Send an email below!😊
              </p>
              <p className="form-undertitle">Fields marked "*" are required.</p>
              <div className="form-input-grid">
                <div>
                  <p className="form-text">Your Name*</p>
                  <div className="form-input-wrapper flexbox-left">
                    <i className="fad fa-user-tie"> </i>
                    <input
                      className="form-input cursor-name"
                      id="uname"
                      name="uname"
                      type="text"
                      placeholder="Your Name*"
                      aria-label=""
                      required
                    />
                  </div>
                </div>
                <div>
                  <p className="form-text">Your Phone</p>
                  <div className="form-input-wrapper flexbox-left">
                    <i className="fal fa-mobile"> </i>
                    <input
                      className="form-input cursor-phone"
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Your Phone"
                      aria-label=""
                    />
                  </div>
                </div>
              </div>
              <div className="form-input-max">
                <p className="form-text">Email*</p>
                <div className="form-input-wrapper flexbox-left">
                  <i className="fal fa-at"> </i>
                  <input
                    className="form-input cursor-email"
                    id="email"
                    name="_replyto"
                    type="email"
                    placeholder="Your Email*"
                    aria-label=""
                    required
                  />
                </div>
              </div>
              <div className="form-input-max">
                <p className="form-text">Message* (Max 500)</p>
                <div
                  id="textarea"
                  className="form-input-wrapper flexbox-left-start cursor-text"
                >
                  {/* <i className="fal fa-comment-dots"> */}
                  <i className="fal fa-comment-smile"> </i>
                  <textarea
                    className="form-input cursor-text"
                    id="message"
                    name="message"
                    placeholder="Your message*"
                    maxLength="500"
                    aria-label=""
                    required
                  ></textarea>
                </div>
              </div>
              <div className="form-input-max flexbox-left">
                <div className="button-wrapper">
                  <button
                    id="form-button"
                    type="submit"
                    className="button btn-danger cursor-send"
                  >
                    <i className="fab fa-telegram-plane"> </i> Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
