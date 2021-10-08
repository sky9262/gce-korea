import postContext from "./postContext";
import { useState } from "react";
import Swal from "sweetalert2";
import loadingImg from "../auth/img/random/swal/loading/d5a2b01b8294bfb8678d67342b106795.gif";

const PostState = (props) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const swalWait = (waitText) => {
    Swal.fire({
      title: "Please Wait !",
      imageUrl: loadingImg,
      html: `${waitText}.....`,
      backdrop: true,
      showConfirmButton: false,
      allowOutsideClick: () => {
        const popup = Swal.getPopup();
        popup.classList.remove("swal2-show");
        setTimeout(() => {
          popup.classList.add("animate__animated", "animate__headShake");
        });
        setTimeout(() => {
          popup.classList.remove("animate__animated", "animate__headShake");
        }, 500);
        return false;
      },
    });
  };

  //Get all post data
  const [post, setPost] = useState([]);

  const getPost = async () => {
    //Api call
    const response = await fetch(`${process.env.REACT_APP_API}/api/post/read`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(() => {
      Swal.close();
      Toast.fire({
        icon: "error",
        title: `Server error!!!`,
      });
    });
    if (response) {
      const json = await response.json();
      setPost(json);
    }
  };

  //Add a post
  const addPost = async (body) => {
    swalWait("Uploading");
    //Api call
    const response = await fetch(`${process.env.REACT_APP_API}/api/post/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NWEwYjUyNGEyOTI0YmFjYmU5ODhlIn0sImlhdCI6MTYzMzAwMjU0MH0.ahmLdVRvhNWqQkpjRVCmd0ME1JP_gm42fYwwBB1sfRU",
      },
      body: body,
    }).catch(() => {
      Swal.close();
      Toast.fire({
        icon: "error",
        title: `Server error!!!`,
      });
    });
    if (response) {
      Swal.close();
      const json = await response.json();
      if (response.status === 200) {
        setPost(post.concat(json.AddedPostData));
        setIsPostFormOpen(false);
        Swal.fire("Nice!", `${json.msg}`, "success");

        Toast.fire({
          icon: "success",
          title: `<strong class="text-success">Added: </strong>${json.AddedPostData.title}`,
        });
      } else if (response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Server not responding!",
          footer: '<a href="">404</a>',
        });
      } else {
        json.errors.forEach((element) => {
          Toast.fire({
            icon: "error",
            title: `<strong style="color:#d72240">${response.status}</strong> : ${element.msg}`,
          });
        });
      }
    }
  };

  //Delete a post
  const deletePost = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        customClass: {
          confirmButton: "mx-2 btn btn-success text-white btn-green",
          cancelButton: "mx-2 btn btn-danger text-white",
        },
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          swalWait("Deleting");
          // After Confirming call delete Api
          const response = await fetch(
            `${process.env.REACT_APP_API}/api/post/delete/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "auth-token":
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NWEwYjUyNGEyOTI0YmFjYmU5ODhlIn0sImlhdCI6MTYzMzAwMjU0MH0.ahmLdVRvhNWqQkpjRVCmd0ME1JP_gm42fYwwBB1sfRU",
              },
            }
          ).catch(() => {
            Swal.close();
            Toast.fire({
              icon: "error",
              title: `Server error!!!`,
            });
          });
          if (response) {
            Swal.close();
            if (response.status === 404) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "error",
                title: `Deleted or Not found!!`,
              });
            } else {
              const json = await response.json();
              const newPost = post.filter((post) => {
                return post._id !== id;
              });
              setPost(newPost);

              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "success",
                title: `<strong style="color:#d72240">Removed: </strong>${json.post.title}`,
              });
            }
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            `Your post is safe :)`,
            "error"
          );
        }
      });
  };
  //Edit a post
  const editPost = async (Post) => {
    const { value: selected } = await Swal.fire({
      title: "Select field validation",
      input: "select",
      inputOptions: {
        "Post details": {
          title: "Title",
          subtitle: "Subtitle",
          image: "Image",
          description: "Description",
          category: "Category",
          event_date: "Event Date",
          button: "Button text",
          link: "Button link",
          zoom: "Hover zoom",
        },
      },
      inputPlaceholder: "Select one to edit",
      showCancelButton: true,
    });

    if (selected === "image") {
      const { value: file } = await Swal.fire({
        title: `Upload ${Post.title}'s ${
          selected.replace("_", " ").charAt(0).toUpperCase() +
          selected.replace("_", " ").slice(1)
        }`,
        input: "file",
        inputAttributes: {
          accept:
            "image/png,image/jpeg,image/jpg,image/png,image/webp,image/svg,image/jfif",
          "aria-label": `Upload your ${
            selected.replace("_", " ").charAt(0).toUpperCase() +
            selected.replace("_", " ").slice(1)
          }`,
        },
      });
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          Swal.fire({
            title: `${Post.title}'s new ${
              selected.replace("_", " ").charAt(0).toUpperCase() +
              selected.replace("_", " ").slice(1)
            }`,
            imageUrl: e.target.result,
            imageAlt: "The uploaded picture",
            showCancelButton: true,
            confirmButtonText: "Yes, save it!",
            cancelButtonText: "No, cancel!",
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#d33",
            showLoaderOnConfirm: true,
          }).then(async (result) => {
            if (result.isConfirmed) {
              swalWait("Uploading");
              // After Confirming call update Api
              const response = await fetch(
                `${process.env.REACT_APP_API}/api/post/update/${Post._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    "auth-token":
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NWEwYjUyNGEyOTI0YmFjYmU5ODhlIn0sImlhdCI6MTYzMzAwMjU0MH0.ahmLdVRvhNWqQkpjRVCmd0ME1JP_gm42fYwwBB1sfRU",
                  },
                  body: `{"${selected}": "${e.target.result}"}`,
                }
              ).catch(() => {
                Swal.close();
                Toast.fire({
                  icon: "error",
                  title: `Server error!!!`,
                });
              });

              if (response) {
                Swal.close();
                if (selected === "image") {
                  Post.image = e.target.result;
                }
                getPost();
                Swal.fire("Saved!", "", "success");
              }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
        };
        reader.readAsDataURL(file);
      }
    } else if (selected === "zoom") {
      const { value: zoom } = await Swal.fire({
        title: "Select field zoomin position",
        input: "select",
        inputOptions: {
          "zoom-center": "Center",
          "zoom-left": "Left",
          "zoom-right": "Right",
          "zoom-top": "Top",
          "zoom-bottom": "Bottom",
          "zoom-top-left": "Top-Left",
          "zoom-top-right": "Top-Right",
          "zoom-bottom-left": "Bottom-Left",
          "zoom-bottom-right": "Bottom-Right",
        },
        inputPlaceholder: "Select anyone",
        showCancelButton: true,
      });

      if (zoom) {
        swalWait("Uploading");
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/post/update/${Post._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NWEwYjUyNGEyOTI0YmFjYmU5ODhlIn0sImlhdCI6MTYzMzAwMjU0MH0.ahmLdVRvhNWqQkpjRVCmd0ME1JP_gm42fYwwBB1sfRU",
            },
            body: `{"${selected}": "${zoom}"}`,
          }
        ).catch(() => {
          Swal.close();
          Toast.fire({
            icon: "error",
            title: `Server error!!!`,
          });
        });
        if (response) {
          Swal.close();
          getPost();
          Swal.fire("Saved!", "", "success");
        }

        getPost();
      }
    } else if (selected) {
      const { value: answer } = await Swal.fire({
        title: `Enter new ${
          selected.replace("_", " ").charAt(0).toUpperCase() +
          selected.replace("_", " ").slice(1)
        }`,
        input: "text",
        inputLabel: `${
          selected.replace("_", " ").charAt(0).toUpperCase() +
          selected.replace("_", " ").slice(1)
        }`,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      });
      if (answer) {
        swalWait("Uploading");
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/post/update/${Post._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1NWEwYjUyNGEyOTI0YmFjYmU5ODhlIn0sImlhdCI6MTYzMzAwMjU0MH0.ahmLdVRvhNWqQkpjRVCmd0ME1JP_gm42fYwwBB1sfRU",
            },
            body: `{"${selected}": "${answer}"}`,
          }
        ).catch(() => {
          Swal.close();
          Toast.fire({
            icon: "error",
            title: `Server error!!!`,
          });
        });
        if (response) {
          Swal.close();
          getPost();
          Swal.fire("Saved!", "", "success");
        }

        getPost();
      }
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    return base64;
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
        Toast.fire({
          icon: "error",
          title: `Image file error!!!`,
        });
      };
    });
  };

  const validateImage = (fileName) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.webp|\.svg|\.jfif)$/i;
    if (!allowedExtensions.exec(fileName)) {
      Swal.fire(
        "File type error!!",
        "Please upload file having extensions .jpeg/.jpg/.png/.webp/.svg/.jfif only.",
        "error"
      );
    } else {
      return true;
    }
  };
  const [fullPost, setFullPost] = useState("0");
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  return (
    <postContext.Provider
      value={{
        post,
        addPost,
        deletePost,
        isPostFormOpen,
        setIsPostFormOpen,
        editPost,
        getPost,
        fullPost,
        setFullPost,
        uploadImage,
        validateImage,
      }}
    >
      {props.children}
    </postContext.Provider>
  );
};

export default PostState;
