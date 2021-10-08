import { React, useState, useContext } from "react";
import "./TeamForm.css";
import aboutContext from "../../../Context/team/teamContext";

function TeamForm() {
  const [teamImage1, setTeamImage1] = useState(null);
  const [teamImage1URL, setTeamImage1URL] = useState(
    "https://placeholder.pics/svg/100x100/DEDEDE/555555/Image%201*"
  );
  const [teamImage2, setTeamImage2] = useState(null);
  const [teamImage2URL, setTeamImage2URL] = useState(
    "https://placeholder.pics/svg/100x100/DEDEDE/555555/Image%202*"
  );

  const context = useContext(aboutContext);
  const { addTeam, uploadImage, validateImage, setIsTeamFormOpen } = context;

  //convert form data to json and post req with the data

  const handelSubmit = (e) => {
    setIsTeamFormOpen(false);
    const id = "addTeam";
    const yOffset = -100;
    const element = document.getElementById(id);
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    const formData = new FormData(e.target);
    const data = Array.from(formData.entries()).reduce(
      (memo, pair) => ({
        ...memo,
        [pair[0]]: pair[1],
      }),
      {}
    );
    data.image1 = teamImage1URL;
    data.image2 = teamImage2URL;
    if (
      data.image1 ===
      "https://placeholder.pics/svg/100x100/DEDEDE/555555/Image%201*"
    ) {
      delete data["image1"];
    }
    if (
      data.image2 ===
      "https://placeholder.pics/svg/100x100/DEDEDE/555555/Image%202*"
    ) {
      delete data["image2"];
    }
    addTeam(JSON.stringify(data));
  };

  return (
    <div className="TeamForm ">
      <form id="form" method="POST" name="Teamform" onSubmit={handelSubmit}>
        <h3 className="form-title" style={{ textAlign: "center" }}>
          ADD TEAM
        </h3>
        <p className="form-undertitle" style={{ textAlign: "center" }}>
          Welcome to our GCE-KR Team!😊
        </p>
        <p className="form-undertitle">Fields marked "*" are required.</p>

        <div className="form-input-max">
          <div className="form-input-wrapper flexbox-left">
            <i className="fad fa-user-tie"> </i>
            <input
              className="form-input cursor-name"
              id="name"
              name="name"
              type="text"
              placeholder="Teammate Name*"
              aria-label=""
              minLength="5"
              required
            />
          </div>
        </div>
        <div className="form-input-grid">
          <div>
            <div className="form-input-wrapper flexbox-left">
              <i className="fad fa-graduation-cap"></i>
              <input
                className="form-input cursor-text"
                id="post_name"
                name="post_name"
                type="text"
                placeholder="Post name*"
                aria-label=""
                required
              />
            </div>
          </div>
          <div>
            <div className="form-input-wrapper flexbox-left">
              <i className="fad fa-university"></i>
              <input
                className="form-input cursor-text"
                id="post_place"
                name="post_place"
                type="text"
                placeholder="Post place* ,   i.e.: @SNU"
                aria-label=""
                required
              />
            </div>
          </div>
        </div>

        {/* Add Image */}
        <p 
              onclick="document.getElementsByClassName('Teamimage1').click()" className="form-undertitle" style={{ textAlign: "center" }}>
          Two image required * 😊
        </p>
        <div className="form-input-grid">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              onClick={()=>{document.getElementById('Teamimage1btn').click()}}
              className="border border-danger"
              style={{ width: "300px", cursor:"pointer"}}
              src={teamImage1URL}
              alt="Teamimage1"
            />
            <label id="Teamimage1btn" htmlFor="Teamimage1" className="btn btn-danger my-2 cursor2">
              Select Image
            </label>
            <div className="form-input-wrapper flexbox-left">
              <input
                className="form-input cursor-name"
                style={{ display: "none" }}
                id="Teamimage1"
                name="image1"
                type="file"
                placeholder="Image 1*"
                aria-label=""
                accept="image/*"
                onChange={async (e) => {
                  if (validateImage(e.target.files[0].name)) {
                    setTeamImage1(e.target.files[0].name);
                    setTeamImage1URL(await uploadImage(e));
                  }
                  else{
                    setTeamImage1("Wrong file uploaded!");
                    setTeamImage1URL("https://placeholder.pics/svg/100x100/DEDEDE/555555/Image%201*");
                  }
                }}
                required
              />
            </div>
            {teamImage1 !== null ? teamImage1 : ""}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              onClick={()=>{document.getElementById('Teamimage2btn').click()}}
              htmlFor="Teamimage2"
              className="border border-danger"
              style={{ width: "300px", cursor:"pointer" }}
              src={`${teamImage2URL}`}
              alt="Teamimage2"
            />
            <label id="Teamimage2btn" htmlFor="Teamimage2" className="btn btn-danger my-2 cursor2">
              Select Image
            </label>
            <div className="form-input-wrapper flexbox-left">
              <input
                className="form-input cursor-name"
                style={{ display: "none" }}
                id="Teamimage2"
                name="image2"
                type="file"
                placeholder="Image 1*"
                aria-label=""
                accept="image/*"
                onChange={async (e) => {
                  if (validateImage(e.target.files[0].name)) {
                    setTeamImage2(e.target.files[0].name);
                    setTeamImage2URL(await uploadImage(e));
                  }
                  else{
                    setTeamImage2("Wrong file uploaded!");
                    setTeamImage2URL("https://placeholder.pics/svg/100x100/DEDEDE/555555/Image%202*");}
                }}
                required
              />
            </div>
            {teamImage2 !== null ? teamImage2 : ""}
          </div>
        </div>

        {/* Social links */}
        <p className="form-undertitle" style={{ textAlign: "center" }}>
          Contact links if available (not required) 😊
        </p>
        {/* portfolio */}
        <div className="form-input-max">
          <div className="form-input-wrapper flexbox-left">
            <i className="fad fa-globe"></i>
            <input
              className="form-input cursor-email"
              id="portfolio"
              name="portfolio"
              type="text"
              placeholder="Portfolio"
              aria-label=""
            />
          </div>
        </div>
        {/* email */}
        <div className="form-input-max">
          <div className="form-input-wrapper flexbox-left">
            <i className="fad fa-at"></i>
            <input
              className="form-input cursor-email"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              aria-label=""
            />
          </div>
        </div>
        {/* campus_profile */}
        <div className="form-input-max">
          <div className="form-input-wrapper flexbox-left">
           <i className="far fa-map-pin"></i>
            <input
              className="form-input cursor-email"
              id="campus_profile"
              name="campus_profile"
              type="text"
              placeholder="Campus profile"
              aria-label=""
            />
          </div>
        </div>
        {/* linkedin */}
        <div className="form-input-max">
          <div className="form-input-wrapper flexbox-left">
            <i className="fab fa-linkedin-in"></i>
            <input
              className="form-input cursor-email"
              id="linkedin"
              name="linkedin"
              type="text"
              placeholder="Linkedin"
              aria-label=""
            />
          </div>
        </div>
        {/* facebook */}
        <div className="form-input-max">
          <div className="form-input-wrapper flexbox-left">
            <i className="fab fa-facebook-f"></i>
            <input
              className="form-input cursor-email"
              id="facebook"
              name="facebook"
              type="text"
              placeholder="Facebook"
              aria-label=""
            />
          </div>
        </div>
        {/* instagram */}
        <div className="form-input-max">
          <div className="form-input-wrapper flexbox-left">
            <i className="fab fa-instagram"></i>
            <input
              className="form-input cursor-email"
              id="instagram"
              name="instagram"
              type="text"
              placeholder="Instagram"
              aria-label=""
            />
          </div>
        </div>
        {/* telegram */}
        <div className="form-input-max">
          <div className="form-input-wrapper flexbox-left">
            <i className="fab fa-telegram"></i>
            <input
              className="form-input cursor-email"
              id="telegram"
              name="telegram"
              type="text"
              placeholder="Telegram"
              aria-label=""
            />
          </div>
        </div>
        <div className="form-input-max flexbox-left">
          <div className="button-wrapper">
            <button
              id="form-button"
              type="submit"
              className="button btn-danger cursor-send"
            >
              <i className="fad fa-check-circle"></i> Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TeamForm;
