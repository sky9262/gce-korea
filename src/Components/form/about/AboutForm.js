import { React,useState,useContext } from "react"; 
import "./AboutForm.css";
import aboutContext from "../../../Context/about/aboutContext";

function AboutForm() {
  const [aboutImage, setAboutImage] = useState(null); 
  const [aboutImageURL, setAboutImageURL] = useState("https://placeholder.pics/svg/100x100/DEDEDE/555555/Image*"); 
  
  const context = useContext(aboutContext)
  const {addAbout, uploadImage, validateImage, setIsAboutFormOpen} = context;


  //convert form data to json and about req with the data

   const handelSubmit = (e) => {
    setIsAboutFormOpen(false)
    const id = 'addAbout';
    const yOffset = -100; 
    const element = document.getElementById(id);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
    const formData = new FormData(e.target);
    const data = Array.from(formData.entries()).reduce((memo, pair) => ({
      ...memo,
      [pair[0]]: pair[1],
    }), {});
    data.image=aboutImageURL
    if(data.image==="https://placeholder.pics/svg/100x100/DEDEDE/555555/Image*"){
      delete data['image'];
    }
    addAbout(JSON.stringify(data))
  };

  return (
    <div style={{
      width:"90%",
      display:"flex",
      flexDirection:"column"
      }} className="AboutForm ">
      <form
        style={{ width: "100%" }}
        id="form"
        method="POST"
        name="Aboutform"
        onSubmit={handelSubmit}
      >
        <h3 className="form-title" style={{ textAlign: "center" }}>
          ADD ABOUT
        </h3>
        <p className="form-undertitle" style={{ textAlign: "center" }}>
          Let's add a new about!😊
        </p>
        <p className="form-undertitle">Fields marked "*" are required.</p>

        <div className="form-input-max">
          <div className="form-input-wrapper flexbox-left">
          <i className="fad fa-signature"></i>
            <input
              className="form-input cursor-name"
              id="title"
              name="title"
              type="text"
              placeholder="Title*"
              aria-label=""
              minLength="5"
              required
            />
          </div>
        </div>
        <div className="form-input-grid">
          <div>
            <div className="form-input-wrapper flexbox-left">
            <i className="fad fa-calendar-star"></i>
              <input
                className="form-input cursor-text"
                id="event_date"
                name="event_date"
                type="text"
                placeholder="Event date*"
                aria-label=""
                required
              />
            </div>
          </div>
          <div>
            <div className="form-input-wrapper flexbox-left">
            <i className="fad fa-text"></i>
              <input
                className="form-input cursor-text"
                id="button"
                name="button"
                type="text"
                placeholder="Button text"
                aria-label=""
              />
            </div>
          </div>
        </div>
        <div className="form-input-max">
          <div className="form-input-wrapper flexbox-left">
            <i className="fad fa-globe"></i>
            <input
              className="form-input cursor-email"
              id="link"
              name="link"
              type="text"
              placeholder="Button link"
              aria-label=""
            />
          </div>
        </div>

        {/* Add Image */}
        <p className="form-undertitle" style={{ textAlign: "center" }}>
          One image required * 😊
        </p>
        <div className="form-input-max">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              onClick={()=>{document.getElementById('Aboutimage1btn').click()}}
              htmlFor="Aboutimage1"
              className="border border-danger"
              style={{ width: "300px", cursor:"pointer" }}
              src={aboutImageURL}
              alt="Aboutimage1"
            />
            <label id="Aboutimage1btn" htmlFor="Aboutimage1" className="btn btn-danger my-2 cursor2">
              Select Image
            </label>
            <div className="form-input-wrapper flexbox-left">
              <input
                className="form-input cursor-name"
                style={{ display: "none" }}
                id="Aboutimage1"
                name="image"
                type="file"
                placeholder="Image 1*"
                aria-label=""
                accept="image/*"
                onChange={async (e) => {
                  if (validateImage(e.target.files[0].name)) {
                    setAboutImage(e.target.files[0].name);
                    setAboutImageURL(await uploadImage(e));
                  }
                  else{
                    setAboutImage("Wrong file uploaded!");
                    setAboutImageURL("https://placeholder.pics/svg/100x100/DEDEDE/555555/Image*");}
                }}
                required
              />
            </div>
            {aboutImage !== null ? aboutImage : ""}
          </div>
        </div>

        {/* Add Description */}
        <div className="form-input-max">
          <p className="form-text">Message* (Max 500)</p>
          <div
            id="textarea"
            className="form-input-wrapper flexbox-left-start cursor-text"
          >
            <i className="fad fa-comment-lines"></i>
            <textarea
              className="form-input cursor-text"
              id="description"
              name="description"
              placeholder="About description* (maximum 500)"
              maxLength="500"
              aria-label=""
              minLength="10"
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
              <i className="fad fa-check-circle"></i> About
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AboutForm;
