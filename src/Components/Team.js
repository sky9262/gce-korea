import "./css/Team.css";
import "./css/fontawesome.min.css";
import yogocatvideo from "./img/octocat-video.webm";
import React, { useEffect, useContext } from "react";
import teamContext from "../Context/team/teamContext";
import TeamForm from "./form/team/TeamForm";
import Error505 from "./Error505";
import authContext from "../Context/auth/authContext";

const play = () => {
  let video = document.getElementById("yogoVideo");
  video.play();
};
const pause = () => {
  document.getElementById("yogoVideo").pause();
  document.getElementById("yogoVideo").currentTime = 0;
};

export default function Team() {
  const { currentUser } = useContext(authContext);
  const context = useContext(teamContext);
  const {
    getTeam,
    team,
    deleteTeam,
    editTeam,
    isTeamFormOpen,
    setIsTeamFormOpen,
  } = context;
  useEffect(() => {
    getTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelAddTeam = () => {
    if (isTeamFormOpen) {
      setIsTeamFormOpen(false);
    } else {
      setIsTeamFormOpen(true);
    }
  };
  return (
    <div>
      <div id="Team" className="team z-10">
        <h1>OUR AMAZING TEAM</h1>
        <p>Meet GitHub Campus Experts Korea Members!</p>
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          className="team-content"
        >
          {team.length === 0 && <Error505 />}
          {team.map((Team) => (
            <div key={Team._id} className="cards cursor-touch">
              <div className="team-card">
                <div className="imgBox">
                  <img src={Team.image1} alt="teamimg1" />
                  <img src={Team.image2} alt="teamimg2" />
                </div>
                <div className="details">
                  <div className="content">
                    {currentUser.status && (
                      <div className="d-flex justify-content-between w-100">
                        <button
                          type="button"
                          className=" w-10 btn btn-outline-danger my-2 cursor2"
                          onClick={() => {
                            deleteTeam(Team._id);
                          }}
                        >
                          <i className="fad fa-trash-alt"></i>
                        </button>
                        <button
                          type="button"
                          className=" w-10 btn btn-outline-danger my-2 cursor2"
                          onClick={() => {
                            editTeam(Team);
                          }}
                        >
                          <i className="fad fa-edit"></i>
                        </button>
                      </div>
                    )}
                    <h2>{Team.name}</h2>
                    <br />
                    <span>
                      {Team.post_name}
                      <br />@ {Team.post_place}
                    </span>
                    <div className="social-icons">
                      {Team.portfolio ? (
                        <a
                          href={Team.portfolio}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor2"
                        >
                          <i className="fal fa-globe"></i>
                        </a>
                      ) : (
                        ""
                      )}

                      {Team.email ? (
                        <a
                          href={"mailto:" + Team.email}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor2"
                        >
                          <i className="fal fa-at"></i>
                        </a>
                      ) : (
                        ""
                      )}

                      {Team.linkedin ? (
                        <a
                          href={Team.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor2"
                        >
                          <i className="fab fa-linkedin"></i>
                        </a>
                      ) : (
                        ""
                      )}

                      {Team.campus_profile ? (
                        <a
                          href={Team.campus_profile}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor2"
                        >
                          <i className="far fa-map-pin"></i>
                        </a>
                      ) : (
                        ""
                      )}

                      {Team.twitter ? (
                        <a
                          href={Team.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor2"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                      ) : (
                        ""
                      )}

                      {Team.facebook ? (
                        <a
                          href={Team.facebook}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor2"
                        >
                          <i className="fab fa-facebook"></i>
                        </a>
                      ) : (
                        ""
                      )}

                      {Team.instagram ? (
                        <a
                          href={Team.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor2"
                        >
                          <i className="fab fa-instagram"></i>
                        </a>
                      ) : (
                        ""
                      )}

                      {Team.telegram ? (
                        <a
                          href={Team.telegram}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor2"
                        >
                          <i className="fab fa-telegram"></i>
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {currentUser.status && (
            <>
              <button
                key={Team._id}
                id="addTeam"
                type="button"
                className="cursor-read mt-5 btn btn-outline-danger"
                onClick={handelAddTeam}
                style={{
                  width: "90vw",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  className={`fad fa-chevron-circle-${
                    isTeamFormOpen ? "up" : "down"
                  }`}
                ></i>
                Add Team
                <i
                  className={`fad fa-chevron-circle-${
                    isTeamFormOpen ? "up" : "down"
                  }`}
                ></i>
              </button>
            </>
          )}
        </div>

        {isTeamFormOpen ? <TeamForm /> : ""}

        <div data-aos="fade-up" data-aos-duration="1000" className="team-text">
          We love <span className="hov-txt cursor2">technologies</span>,{" "}
          <span className="hov-txt cursor2">communities</span> and empowering
          these two together in a form of cooperative engagements and
          leadership.
        </div>

        <svg
          onMouseOver={play}
          onMouseOut={pause}
          style={{ cursor: "pointer" }}
          fill="#7d1223"
          className="yogocat-text cursor-touch"
          viewBox="0 0 100 100"
          width="100"
          height="100"
        >
          <defs>
            <path
              id="circle"
              d="
                M 50, 50
                m -37, 0
                a 37,37 0 1,1 74,0
                a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text fontSize="17">
            <textPath xlinkHref="#circle">Hover me to dive with me.</textPath>
          </text>
        </svg>

        <video
          id="yogoVideo"
          className="yogocat"
          src={yogocatvideo}
          muted="muted"
        ></video>
        <svg viewBox="0 0 3387 1270">
          <path
            id="planePath"
            className="planePath"
            d="M-226 626c439,4 636,-213 934,-225 755,-31 602,769 1334,658 562,-86 668,-698 266,-908 -401,-210 -893,189 -632,630 260,441 747,121 1051,91 360,-36 889,179 889,179"
          />
          <g id="plane">
            <polygon
              className="fil1"
              points="-141,-10 199,0 -198,-72 -188,-61 -171,-57 -184,-57 "
            />
            <polygon className="fil2" points="199,0 -141,-10 -163,63 -123,9 " />
            <polygon
              className="fil3"
              points="-95,39 -113,32 -123,9 -163,63 -105,53 -108,45 -87,48 -90,45 -103,41 -94,41 "
            />
            <path
              className="fil4"
              d="M-87 48l-21 -3 3 8 19 -4 -1 -1zm-26 -16l18 7 -2 -1 32 -7 -29 1 11 -4 -24 -1 -16 -18 10 23zm10 9l13 4 -4 -4 -9 0z"
            />
            <polygon
              className="fil1"
              points="-83,28 -94,32 -65,31 -97,38 -86,49 -67,70 199,0 -123,9 -107,27 "
            />
          </g>
          <animateMotion
            xlinkHref="#plane"
            dur="5s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref="#planePath" />
          </animateMotion>
        </svg>
      </div>
    </div>
  );
}
