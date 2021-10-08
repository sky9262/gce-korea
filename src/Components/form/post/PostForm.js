import { React, useState, useContext } from "react";
import "./PostForm.css";
import aboutContext from "../../../Context/post/postContext";

function PostForm() {
  const [postImage, setPostImage] = useState(null);
  const [postImageURL, setPostImageURL] = useState(
    "https://placeholder.pics/svg/100x100/DEDEDE/555555/Image*"
  );

  const context = useContext(aboutContext);
  const { addPost, uploadImage, validateImage, setIsPostFormOpen } = context;

  //convert form data to json and post req with the data

  const handelSubmit = (e) => {
    //e.preventDefault();
    setIsPostFormOpen(false)
    const id = "addPost";
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
    data.image = postImageURL;
    if (
      data.image ===
      "https://placeholder.pics/svg/100x100/DEDEDE/555555/Image*"
    ) {
      delete data["image"];
    }
    addPost(JSON.stringify(data));
  };

  return (
    <div className="PostForm ">
      <form
        style={{ width: "100%" }}
        id="form"
        name="Postform"
        onSubmit={handelSubmit}
      >
        <h3 className="form-title" style={{ textAlign: "center" }}>
          ADD POST
        </h3>
        <p className="form-undertitle" style={{ textAlign: "center" }}>
          Let's add a new post!😊
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
        <div className="form-input-max">
          <div className="form-input-wrapper flexbox-left">
          <i className="fad fa-file-signature"></i>
            <input
              className="form-input cursor-name"
              id="subtitle"
              name="subtitle"
              type="text"
              placeholder="Subtitle*"
              aria-label=""
              minLength="8"
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
          <div className="form-input-wrapper flexbox-left">
          <i className="fad fa-search-plus"></i>
            <select
              style={{ padding: "0.5em 3.6em 0.5em 3.6em" }}
              className="form-input cursor-name custom-select"
              id="zoom"
              name="zoom"
            >
              <option selected value="">
                Hover zoom..
              </option>
              <option value="zoom-center">Center</option>
              <option value="zoom-left">Left</option>
              <option value="zoom-right">Right</option>
              <option value="zoom-top">Top</option>
              <option value="zoom-bottom">Bottom</option>
              <option value="zoom-top-left">Top-Left</option>
              <option value="zoom-top-right">Top-Right</option>
              <option value="zoom-bottom-left">Bottom-Left</option>
              <option value="zoom-bottom-right">Bottom-Right</option>
            </select>
            <i style={{ marginLeft: "80%" }} className="fad fa-sort"></i>
          </div>
        </div>
        <div className="form-input-grid">
          <div>
            <div className="form-input-wrapper flexbox-left">
            <i className="fad fa-list-ul"></i>
              <input
                className="form-input cursor-text"
                id="category"
                name="category"
                type="text"
                placeholder="Category*"
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
              onClick={()=>{document.getElementById('Postimage1btn').click()}}
              htmlFor="Postimage1"
              className="border border-danger"
              style={{ width: "300px", cursor:"pointer" }}
              src={postImageURL}
              alt="Postimage1"
            />
            <label id="Postimage1btn" htmlFor="Postimage1" className="btn btn-danger my-2 cursor2">
              Select Image
            </label>
            <div className="form-input-wrapper flexbox-left">
              <input
                className="form-input cursor-name"
                style={{ display: "none" }}
                id="Postimage1"
                name="image"
                type="file"
                placeholder="Image 1*"
                aria-label=""
                accept="image/*"
                onChange={async (e) => {
                  if (validateImage(e.target.files[0].name)) {
                    setPostImage(e.target.files[0].name);
                    setPostImageURL(await uploadImage(e));
                  }
                  else{
                    setPostImage("Wrong file uploaded!");
                    setPostImageURL("https://placeholder.pics/svg/100x100/DEDEDE/555555/Image*");
                  }
                }}
                required
              />
            </div>
            {postImage !== null ? postImage : ""}
          </div>
        </div>

        {/* Add Description */}
        <div className="form-input-max">
          <div
            id="textarea"
            className="form-input-wrapper flexbox-left-start cursor-text"
          >
            <i className="fad fa-comment-lines"></i>
            <textarea
              className="form-input cursor-text"
              id="description"
              name="description"
              placeholder="Post description* (maximum 500)"
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
              <i className="fad fa-check-circle"></i> Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
