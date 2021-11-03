import teamContext from "./teamContext";
import { useState } from "react";
import Swal from "sweetalert2";
import loadingImg from "../auth/img/random/swal/loading/octocatLoading.gif";

const TeamState = (props) => {
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

  //Get all team data
  const [team, setTeam] = useState([]);

  const getTeam = async () => {
    //Api call
    const response = await fetch(`${process.env.REACT_APP_API}/api/team/read`, {
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
      setTeam(json);
    }
  };

  //Add a team
  const addTeam = async (body) => {
    swalWait("Uploading");
    //Api call
    const response = await fetch(`${process.env.REACT_APP_API}/api/team/add`, {
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
        setTeam(team.concat(json.AddedTeamData));
        setIsTeamFormOpen(false);
        Swal.fire("Nice!", `${json.msg}`, "success");

        Toast.fire({
          icon: "success",
          title: `<strong class="text-success">Added: </strong>${json.AddedTeamData.name}`,
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

  //Delete a team
  const deleteTeam = async (id) => {
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
            `${process.env.REACT_APP_API}/api/team/delete/${id}`,
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
            if (response.status === 404) {
              Toast.fire({
                icon: "error",
                title: `Deleted or Not found!!`,
              });
            } else {
              const json = await response.json();
              const newTeam = team.filter((team) => {
                return team._id !== id;
              });
              setTeam(newTeam);
              Toast.fire({
                icon: "success",
                title: `<strong style="color:#d72240">Removed: </strong>${json.team.name}`,
              });
            }
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            `Your teammate is safe :)`,
            "info"
          );
        }
      });
  };

  //Edit a team
  const editTeam = async (Team) => {
    const { value: selected } = await Swal.fire({
      title: "Select field validation",
      input: "select",
      inputOptions: {
        "Teammate details": {
          name: "Teammate name",
          post_name: "Post name",
          post_place: "Post place",
          image1: "Image 1",
          image2: "Image 2",
        },
        "Contact links": {
          portfolio: "Portfolio",
          email: "Email",
          campus_profile: "Campus profile",
          github: "GitHub",
          linkedin: "Linkedin",
          facebook: "Facebook",
          instagram: "Instagram",
          telegram: "Telegram",
        },
      },
      inputPlaceholder: "Select one to edit",
      showCancelButton: true,
    });

    if (selected === "image1" || selected === "image2") {
      const { value: file } = await Swal.fire({
        title: `Upload ${Team.name}'s ${
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
            title: `${Team.name}'s new ${
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
              const response = await fetch(
                `${process.env.REACT_APP_API}/api/team/update/${Team._id}`,
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
                if (selected === "image1") {
                  Team.image1 = e.target.result;
                } else if (selected === "image2") {
                  Team.image2 = e.target.result;
                }
                getTeam();
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
          `${process.env.REACT_APP_API}/api/team/update/${Team._id}`,
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

        getTeam();
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
  const [isTeamFormOpen, setIsTeamFormOpen] = useState(false);
  return (
    <teamContext.Provider
      value={{
        team,
        addTeam,
        deleteTeam,
        editTeam,
        getTeam,
        isTeamFormOpen,
        setIsTeamFormOpen,
        uploadImage,
        validateImage,
      }}
    >
      {props.children}
    </teamContext.Provider>
  );
};

export default TeamState;
