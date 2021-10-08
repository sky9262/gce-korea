import aboutContext from "./aboutContext";
import { useState } from "react";
import Swal from "sweetalert2";
import loadingImg from "../auth/img/random/swal/loading/713a3272124cc57ba9e9fb7f59e9ab3b.gif";

const AboutState = (props) => {
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

  /*eslint no-extend-native: ["error", { "exceptions": ["Object"] }]*/
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

  //Get all about data
  const [about, setAbout] = useState([]);

  const getAbout = async () => {
    //Api call
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/about/read`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
      const json = await response.json();
      setAbout(json);
    }
  };

  //Add a about
  const addAbout = async (body) => {
    swalWait("Uploading");
    //Api call
    const response = await fetch(`${process.env.REACT_APP_API}/api/about/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("GCE-KR_TOKEN"),
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
        setAbout(about.concat(json.AddedAboutData));
        setIsAboutFormOpen(false);
        Swal.fire("Nice!", `${json.msg}`, "success");

        Toast.fire({
          icon: "success",
          title: `<strong class="text-success">Added: </strong> ${json.AddedAboutData.title}`,
        });
      } else if (response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Server not responding!",
          footer: '<a href="">404</a>',
        });
      } else {
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
        json.errors.forEach((element) => {
          Toast.fire({
            icon: "error",
            title: `<strong style="color:#d72240">${response.status}</strong> : ${element.msg}`,
          });
        });
      }
    }
  };

  //Delete a about
  const deleteAbout = async (id) => {
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
          confirmButton: "mx-2 my-2 btn btn-success text-white btn-green",
          cancelButton: "mx-2 my-2 btn btn-danger text-white",
        },
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          swalWait("Deleting");
          // After Confirming call delete Api
          const response = await fetch(
            `${process.env.REACT_APP_API}/api/about/delete/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("GCE-KR_TOKEN"),
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
            if (response.status === 500) {
              Toast.fire({
                icon: "error",
                title: `Server error!!!`,
              });
            }
            if (response.status === 404) {
              Toast.fire({
                icon: "error",
                title: `Deleted or Not found!!`,
              });
            } else {
              const json = await response.json();
              const newAbout = about.filter((about) => {
                return about._id !== id;
              });
              setAbout(newAbout);

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
                title: `<strong style="color:#d72240">Removed: </strong>${json.about.title}`,
              });
            }
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            `Your data is safe :)`,
            "error"
          );
        }
      });
  };

  //Edit a about
  const editAbout = async (About) => {
    const { value: selected } = await Swal.fire({
      title: "Select field validation",
      input: "select",
      inputOptions: {
        "About details": {
          title: "Title",
          event_date: "Event date",
          image: "Image",
          description: "Description",
          button: "Button text",
          link: "Button link",
        },
      },
      inputPlaceholder: "Select one to edit",
      showCancelButton: true,
    });

    if (selected === "image") {
      const { value: file } = await Swal.fire({
        title: `Upload ${About.name}'s ${selected.value}`,
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
            title: `${About.name}'s new ${
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
          }).then(async (result) => {
            if (result.isConfirmed) {
              swalWait("Uploading");
              // After Confirming call update Api
              const response = await fetch(
                `${process.env.REACT_APP_API}/api/about/update/${About._id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("GCE-KR_TOKEN"),
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
                  Swal.close();
                  About.image = e.target.result;
                }
                getAbout();
                Swal.fire("Saved!", "", "success");
              }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
        };
        reader.readAsDataURL(file);
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
        await fetch(
          `${process.env.REACT_APP_API}/api/about/update/${About._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("GCE-KR_TOKEN"),
            },
            body: `{"${selected}": "${answer}"}`,
          }
        )
          .then(() => {
            Swal.close();
            Swal.fire("Saved!", "", "success");
          })
          .catch(() => {
            Swal.close();
            Toast.fire({
              icon: "error",
              title: `Server error!!!`,
            });
          });

        getAbout();
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
  const [isAboutFormOpen, setIsAboutFormOpen] = useState(false);
  return (
    <aboutContext.Provider
      value={{
        about,
        addAbout,
        deleteAbout,
        editAbout,
        getAbout,
        isAboutFormOpen,
        setIsAboutFormOpen,
        uploadImage,
        validateImage,
      }}
    >
      {props.children}
    </aboutContext.Provider>
  );
};

export default AboutState;
