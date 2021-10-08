import React, { useEffect, useContext } from "react";
import aboutContext from "../Context/about/aboutContext";
import "./css/About.css";
import AboutForm from "./form/about/AboutForm";
import Error505 from "./Error505";
import aboutImg from "./img/BE-PART.png";
import authContext from "../Context/auth/authContext";

export default function About() {
  const context = useContext(aboutContext);
  const {
    getAbout,
    about,
    deleteAbout,
    editAbout,
    isAboutFormOpen,
    setIsAboutFormOpen,
  } = context;
  const { currentUser } = useContext(authContext);
  useEffect(() => {
    getAbout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelAddAbout = () => {
    if (isAboutFormOpen) {
      setIsAboutFormOpen(false);
    } else {
      setIsAboutFormOpen(true);
    }
  };
  return (
    <div id="About" className="z-10">
      <div className="about z-10">
        <h1 style={{ paddingTop: "130px" }}>About</h1>
        <p
          style={{
            paddingTop: "30px",
            fontStyle: "italic",
            margin: " 0 20px",
            textAlign: "center",
          }}
        >
          한 눈에 보는 GCE가 걸어온 길, 앞으로 만들어나갈 화려한 여정에 저희와
          함께해요!
        </p>
      </div>
      <div className="wrapper">
        {about.length !== 0 && <div className="center-line"></div>}
        {about.length === 0 && <Error505 />}
        {about.map((data, index) => (
          <div key={data._id} className={(index + 1) % 2 === 0 ? "row row-2" : "row row-1"}>
            <section>
              {currentUser.status && (
                <>
                  <button
                    type="button"
                    className="editBtn btn btn-outline-danger my-2 cursor2"
                    onClick={() => {
                      deleteAbout(data._id);
                    }}
                  >
                    <i className="fad fa-trash-alt"></i>
                  </button>

                  <button
                    type="button"
                    className="deleteBtn btn btn-outline-danger my-2 cursor2"
                    onClick={() => {
                      editAbout(data);
                    }}
                  >
                    <i className="fad fa-edit"></i>
                  </button>
                </>
              )}

              <div className="icon">
                <img className="image" src={data.image} alt={data.image} />
              </div>
              <div
                data-aos={(index + 1) % 2 === 0 ? "fade-left" : "fade-right"}
                className="details"
              >
                <span className="title">{data.title}</span>
                <span style={{ paddingBottom: "42px", fontStyle: "italic" }}>
                  {data.event_date}
                </span>
              </div>
              <p
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="100"
                data-aos-duration="500"
                data-aos-offset="5"
              >
                {data.description}
              </p>
              {data.button ? (
                <div className="bottom">
                  <a
                    className="cursor2"
                    data-aos="zoom-in"
                    href={data.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {data.button}
                  </a>
                </div>
              ) : (
                ""
              )}
            </section>
          </div>
        ))}

        {about.length !== 0 && (
          <div className="wrapper">
            <div className="row rowlast row-1">
              <section className="no-content" style={{ padding: "0" }} id="end">
                <i className="icon">
                  <img src={aboutImg} alt="BE-PART.png" />
                </i>
              </section>
            </div>
          </div>
        )}
      </div>
      {currentUser.status && (
        <>
          <button
            id="addAbout"
            type="button"
            className="cursor-read btn btn-outline-danger"
            onClick={handelAddAbout}
            style={{
              width: "90vw",
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "100px",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <i
              className={`fad fa-chevron-circle-${
                isAboutFormOpen ? "up" : "down"
              }`}
            ></i>
            Add About
            <i
              className={`fad fa-chevron-circle-${
                isAboutFormOpen ? "up" : "down"
              }`}
            ></i>
          </button>
        </>
      )}

      {isAboutFormOpen ? <AboutForm /> : ""}
    </div>
  );
}
