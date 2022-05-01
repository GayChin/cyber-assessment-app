import React, {useState, useRef, useEffect} from "react";
import styles from "./Profile.module.scss";
import {GeneralButton} from "../components/GeneralButton/GeneralButton";
import {Spinner} from "react-bootstrap";
import {store} from "../redux/store";
import {setUserProfileData, setUserProfilePic} from "../redux/user/userSlice";
import {upsertUserProfile} from "../services/api/userProfile";
import {changePassword} from "../services/api/account";
import {
  getProfileImage,
  upsertProfileImage,
} from "../services/api/profileImage";
import {useDispatch} from "react-redux";
import {AiFillCamera} from "react-icons/ai";

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = store.getState().user.userProfile;
  const userProfPic = store.getState().user.userProfilePic;
  const firstName = userInfo.first_name;
  const lastName = userInfo.last_name;
  const currentEmail = userInfo.email;

  const [tmpPicFormData, setTmpPicFormData] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isPasswordLoading, setIsPasswordLoading] = useState("");
  const [isUpdateLoading, setIsUpdateLoading] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (profileImage === "") {
      var retrievedProfileImage = getProfileImage(currentEmail);
      retrievedProfileImage.then((value) => {
        if (retrievedProfileImage && retrievedProfileImage.length > 25) {
          setProfileImage(value.profile_picture_base64);
        } else {
          setProfileImage(userProfPic)
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangePassword = async (event) => {
    event.preventDefault();
    setIsPasswordLoading(true);
    setButtonClicked(true);
    const updateDetails = {
      email: currentEmail,
      password: newPassword,
      password2: confirmNewPassword,
      old_password: oldPassword,
    };

    if (
      oldPassword &&
      newPassword &&
      confirmNewPassword &&
      newPassword.length >= 8 &&
      newPassword === confirmNewPassword
    ) {
      const result = await changePassword(updateDetails);
      if (result.email === currentEmail) {
        setIsPasswordLoading(false);
        setSuccessText("Password sucessfully changed");
        setTimeout(() => {
          setSuccessText("");
        }, 3000);
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setErrorText("");
        setButtonClicked(false);

        //backend validation
      } else {
        setIsPasswordLoading(false);
        setErrorText(result.data[Object.keys(result.data)[0]]);
      }
    } else {
      if (!oldPassword || !newPassword || !confirmNewPassword) {
        setErrorText(
          "Fields highlighted cannot be left empty, please try again."
        );
      } else if (newPassword.length < 8) {
        setErrorText(
          "This password is too short. It must contain at least 8 characters"
        );
      } else if (newPassword !== confirmNewPassword) {
        setErrorText("Password fields didn't match.");
      }
      setIsPasswordLoading(false);
    }
    // Later would be checking the password strength
  };

  const onUpdate = async (event) => {
    event.preventDefault();
    // const formData = new FormData();
    // formData.append("picFile", profPic.selectedFile, profPic.selectedFile.name);
    // axios.post("api/uploadfile", formData);

    const newUserProfileData = {
      email: currentEmail,
      first_name: firstName,
      last_name: lastName,
      gender: userInfo.gender,
      position: userInfo.position,
      birth_date: userInfo.birth_date,
      total_score: userInfo.total_score,
    };

    setIsUpdateLoading(true);

    if (updatedFirstName) {
      newUserProfileData.first_name = updatedFirstName;
    }
    if (updatedLastName) {
      newUserProfileData.last_name = updatedLastName;
    }

    if (updatedFirstName || updatedLastName) {
      const updatedUserProfile = await upsertUserProfile(
        JSON.stringify(newUserProfileData)
      );

      if (updatedUserProfile) {
        dispatch(setUserProfileData(newUserProfileData));
        setUpdatedFirstName("");
        setUpdatedLastName("");
      }
    }

    if (tmpPicFormData) {
      const updatedProfileImage = await upsertProfileImage(tmpPicFormData);

      if (updatedProfileImage) {
        console.log("profile image updated!");
        console.log(updatedProfileImage);
        dispatch(setUserProfilePic(profileImage));
      }
    }

    setIsUpdateLoading(false);
    setEditForm(false);
  };

  const inputFileRef = useRef(null);
  const chooseProfPic = () => {
    inputFileRef.current.click();
  };

  const onFileChange = (event) => {
    const tmpImg = URL.createObjectURL(event.target.files[0]);
    setProfileImage(tmpImg);

    console.log(event.target.files[0]);
    var data = new FormData();
    data.append("profile_picture", event.target.files[0]);
    setTmpPicFormData(data);
  };

  return (
    <div>
      <div className={styles["profileBanner"]}>
        <h3>Profile</h3>
        <p>Manage your account</p>
      </div>
      <div className={styles["lineColor"]} />
      <div className={styles["profNameEmail"]}>
        {editForm ? (
          <div className={styles["profImgContainer"]}>
            <img className={styles["profPic"]} src={profileImage} alt="" />
            <div className={styles["profPicOverlay"]} onClick={chooseProfPic}>
              <AiFillCamera className={styles["profPicCamIcon"]} />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={inputFileRef}
              onChange={onFileChange}
              style={{display: "none"}}
            />
          </div>
        ) : (
          <img className={styles["profPic"]} src={profileImage} alt="" />
        )}
        <div className={styles["nameAndEmail"]}>
          {editForm ? (
            <form className={styles["formStyle"]}>
              <label className={styles["formLabel"]}>First Name</label>
              <input
                className={styles["formInput"]}
                type="text"
                id="firstName"
                placeholder={firstName}
                value={updatedFirstName}
                onChange={(e) => setUpdatedFirstName(e.target.value)}
              />
              <label className={styles["formLabel"]}>Last Name</label>
              <input
                className={styles["formInput"]}
                type="text"
                id="lastName"
                placeholder={lastName}
                value={updatedLastName}
                onChange={(e) => setUpdatedLastName(e.target.value)}
              />
              <label className={styles["formLabel"]}>Email</label>
              <input
                className={styles["formInput"]}
                type="text"
                id="email"
                placeholder={currentEmail}
                disabled
                style={{cursor: "not-allowed"}}
              />
              <div>
                {isUpdateLoading ? (
                  <Spinner animation="border" role="status"></Spinner>
                ) : null}
              </div>
              <div style={{display:"flex", flexDirection:"row"}}>
                <div className={styles["submitBtn"]} style={{marginRight:"10px"}}>
                  <GeneralButton
                    className={styles["submitBtn"]}
                    text={`Save Changes`}
                    buttonStyle="btn-plump-purple"
                    buttonSize="btn-small"
                    onClick={onUpdate}
                  />
                </div>
                <div className={styles["submitBtn"]}>
                  <GeneralButton
                    className={styles["submitBtn"]}
                    text={`Cancel`}
                    buttonStyle="btn-plump-purple"
                    buttonSize="btn-small"
                    onClick={() => setEditForm(false)}
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className={styles["nameAndEmail"]}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <form className={styles["formStyle"]}>
                  <label className={styles["formLabel"]}>First Name</label>
                  <input
                    className={styles["formInput"]}
                    type="text"
                    id="firstName"
                    placeholder={firstName}
                    value={updatedFirstName}
                    disabled
                    style={{cursor: "not-allowed"}}
                  />
                  <label className={styles["formLabel"]}>Last Name</label>
                  <input
                    className={styles["formInput"]}
                    type="text"
                    id="lastName"
                    placeholder={lastName}
                    value={updatedLastName}
                    disabled
                    style={{cursor: "not-allowed"}}
                  />
                  <label className={styles["formLabel"]}>Email</label>
                  <input
                    className={styles["formInput"]}
                    type="text"
                    id="email"
                    placeholder={currentEmail}
                    disabled
                    style={{cursor: "not-allowed"}}
                  />
                  <div className={styles["submitBtn"]}>
                    <GeneralButton
                      className={styles["submitBtn"]}
                      text={`Edit Profile`}
                      buttonStyle="btn-plump-purple"
                      buttonSize="btn-small"
                      onClick={() => setEditForm(true)}
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles["changePassword"]}>
        <h3>Change your password</h3>
        <form className={styles["formStyle"]}>
          <label className={styles["formLabel"]}>Old Password</label>
          <input
            className={
              buttonClicked && !oldPassword
                ? styles["formErrorInput"]
                : styles["formInput"]
            }
            type="password"
            id="oldPassword"
            value={oldPassword}
            placeholder="Enter your old password here"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <label className={styles["formLabel"]}>New Password</label>
          <input
            className={
              buttonClicked && !newPassword
                ? styles["formErrorInput"]
                : styles["formInput"]
            }
            type="password"
            id="newPassword"
            value={newPassword}
            placeholder="Enter your new password here"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label className={styles["formLabel"]}>Confirm Password</label>
          <input
            className={
              buttonClicked && !confirmNewPassword
                ? styles["formErrorInput"]
                : styles["formInput"]
            }
            type="password"
            id="newPassword"
            value={confirmNewPassword}
            placeholder="Enter your new password here"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </form>
        <div
          className={
            errorText
              ? styles["display-password-error"]
              : styles["hide-password-error"]
          }
        >
          {errorText}
        </div>
        <div
          className={
            successText
              ? styles["display-password-success"]
              : styles["hide-password-success"]
          }
        >
          {successText}
        </div>
        <div>
          {isPasswordLoading ? (
            <Spinner animation="border" role="status"></Spinner>
          ) : null}
        </div>
        <div className={styles["submitBtn"]}>
          <GeneralButton
            text={`Change Password`}
            buttonStyle="btn-plump-purple"
            buttonSize="btn-small"
            type="submit"
            onClick={onChangePassword}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
