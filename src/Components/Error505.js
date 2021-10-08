import React, { useState, useEffect, useContext } from "react";
import Error505Image from "./img/505.gif";
import authContext from "../Context/auth/authContext";

// eslint-disable-next-line no-extend-native
Array.prototype.chooseOne = function () {
  return this[Math.floor(Math.random() * this.length)];
};

function Error505() {
  const { noInternet } = useContext(authContext);
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    if (window.navigator.onLine) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      {isOnline ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Error505Image} alt="Error505Image" style={{ mixBlendMode: "multiply" }} />
          <h1>Server error 505</h1>
          <p>Please try again later</p>
          {/* eslint-disable-next-line */}
          <a
            id="refreshBtn"
            className="btn btn-outline-danger cursor2"
            href=""
            onClick={refreshPage}
            target="_blank"
            rel="noreferrer"
          >
            Refresh
          </a>
        </div>
      ) : (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ mixBlendMode: "multiply" }}
              src={noInternet.chooseOne().default}
              alt="noInernetImage"
            />
            <h1>No Internet access</h1>
            <p style={{ marginBottom: "0" }}>Check your connection settings</p>
            <p>and try again</p>
            {/* eslint-disable-next-line */}
            <a
              id="refreshBtn"
              className="btn btn-outline-danger cursor2"
              href=""
              onClick={refreshPage}
              target="_blank"
              rel="noreferrer"
            >
              Refresh
            </a>
          </div>
        </>
      )}
    </>
  );
}

export default Error505;
