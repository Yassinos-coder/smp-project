import React, { useState } from "react";
import "./MyAccount.css";
import { useSelector } from "react-redux";
import "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnRight } from "@fortawesome/free-solid-svg-icons";
import { profileAvatarUploader, UpdateMail, UpdatePassword } from "../../../redux/UserReducers";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";

const MyAccount = () => {
  const dispatch = useDispatch();
  const [EmailUpdateSuccess, setEmailUpdateSuccess] = useState(false);
  const [PasswordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);

  const userData_from_redux = useSelector(
    (state) => state.newUserReducer.userInfo
  );
  let newMailAddr;
  let newPass;
  let cmPass;
  let imageUpload;

  const fileUpload = () => {
    const file = new FormData()
    file.append("image", imageUpload)
    dispatch(profileAvatarUploader({userID: userData_from_redux._id, image:file}))
  }


  return (
    <>
      <div className="MyAccount-Dash">
        <div className="alerts-myaccount">
          <Collapse in={EmailUpdateSuccess}>
            <Alert variant="filled" elevation={8} severity="success">
              <AlertTitle>E-mail changé avec succès.</AlertTitle>
            </Alert>
          </Collapse>
          <Collapse in={PasswordUpdateSuccess}>
            <Alert variant="filled" elevation={8} severity="success">
              <AlertTitle>Mot De Passe changé avec succès.</AlertTitle>
            </Alert>
          </Collapse>
        </div>
        <div className="UserData-Box">
          <div className="userProfilePic">
            <img className="prf-pic-pa" src={'http://localhost:2003/avatars/'+userData_from_redux._id} alt="Profile " />
          </div>
          <div className="user-data-below-pic">
            <p className="ps">
              {" "}
              <span
                style={{
                  marginRight: "2%",
                  paddingLeft: "1%",
                  backgroundColor: "grey",
                  height: "3vh",
                  borderRadius: "2px",
                }}
              >
                {" "}
                Full Name :{" "}
              </span>
              {userData_from_redux.firstname} {userData_from_redux.lastname}{" "}
            </p>
            <p className="ps" style={{ marginTop: "2%" }}>
              {" "}
              <span
                style={{
                  marginRight: "2%",
                  paddingLeft: "1%",
                  backgroundColor: "grey",
                  height: "3vh",
                  borderRadius: "2px",
                }}
              >
                UserName :
              </span>{" "}
              {userData_from_redux.username}{" "}
            </p>
            <p className="ps" style={{ marginTop: "2%" }}>
              {" "}
              <span
                style={{
                  marginRight: "2%",
                  paddingLeft: "1%",
                  backgroundColor: "grey",
                  height: "3vh",
                  borderRadius: "2px",
                }}
              >
                Date Of Birth :
              </span>{" "}
              {userData_from_redux.dob}{" "}
            </p>
            <p className="ps" style={{ marginTop: "2%" }}>
              {" "}
              <span
                style={{
                  marginRight: "2%",
                  paddingLeft: "1%",
                  backgroundColor: "grey",
                  height: "3vh",
                  borderRadius: "2px",
                }}
              >
                School ID :
              </span>{" "}
              {userData_from_redux.schoolid}{" "}
            </p>
            <p className="ps" style={{ marginTop: "2%" }}>
              {" "}
              <span
                style={{
                  marginRight: "2%",
                  paddingLeft: "1%",
                  backgroundColor: "grey",
                  height: "3vh",
                  borderRadius: "2px",
                }}
              >
                Position :
              </span>{" "}
              {userData_from_redux.role}{" "}
            </p>
            <p className="ps" style={{ marginTop: "2%" }}>
              {" "}
              <span
                style={{
                  marginRight: "2%",
                  paddingLeft: "1%",
                  backgroundColor: "grey",
                  height: "3vh",
                  borderRadius: "2px",
                }}
              >
                Email Address :
              </span>{" "}
              {userData_from_redux.email}{" "}
            </p>
            <p className="ps" style={{ marginTop: "2%" }}>
              {" "}
              <span
                style={{
                  marginRight: "2%",
                  paddingLeft: "1%",
                  backgroundColor: "grey",
                  height: "3vh",
                  borderRadius: "2px",
                }}
              >
                CIN :
              </span>{" "}
              {userData_from_redux.cin}{" "}
            </p>
            <p className="ps" style={{ marginTop: "2%" }}>
              {" "}
              <span
                style={{
                  marginRight: "2%",
                  paddingLeft: "1%",
                  backgroundColor: "grey",
                  height: "3vh",
                  borderRadius: "2px",
                }}
              >
                Phone Number :
              </span>{" "}
              {userData_from_redux.phonenumber}{" "}
            </p>
            <p className="ps" style={{ marginTop: "2%" }}>
              {" "}
              <span
                style={{
                  marginRight: "2%",
                  paddingLeft: "1%",
                  backgroundColor: "grey",
                  height: "3vh",
                  borderRadius: "2px",
                }}
              >
                Address :
              </span>{" "}
              {userData_from_redux.address}{" "}
            </p>
          </div>
          <hr className="hr-pa" />
          <div className="new-email">
            <h2>Change your Information</h2>
            <div className="newemail-addr">
              <p className="current-email">
                Your Current Email is : {userData_from_redux.email}
              </p>
              <label htmlFor="newmail">
                {" "}
                <FontAwesomeIcon
                  className="fa-pa"
                  icon={faArrowTurnRight}
                />{" "}
                Enter a new email :{" "}
              </label>
              <input
                type="email"
                name="newmail"
                placeholder="Enter your new email address"
                onChange={(e) => (newMailAddr = e.currentTarget.value)}
              />
              <button
                type="submit"
                onClick={() => {
                  dispatch(
                    UpdateMail({
                      id: userData_from_redux._id,
                      newMail: newMailAddr,
                    })
                  );
                  setEmailUpdateSuccess(true)
                }}
              >
                Update Email
              </button>
            </div>
            <hr className="hr-update-info-section" />
            <div className="change-password">
              <p className="newpass">
                <FontAwesomeIcon className="fa-pa" icon={faArrowTurnRight} />
                Change Password :
              </p>
              <label htmlFor="new-password"> Enter new password :</label>
              <input
                type="password"
                placeholder="Enter a password (Check Tips ->)"
                onChange={(e) => (newPass = e.currentTarget.value)}
                autoComplete="new-password"
              />
              <label htmlFor="new-password"> Confirm password :</label>
              <input
                type="password"
                placeholder="Re-Enter your password"
                autoComplete="new-password"
                onChange={(e) => {
                  cmPass = e.currentTarget.value;
                }}
              />
              <p
                style={{
                  position: "absolute",
                  marginTop: "-24.5%",
                  marginLeft: "49%",
                  fontSize: "18px",
                }}
              >
                Some Password Tips :
              </p>
              <ul className="ul-pass-tips">
                <li>Password length must be between 8 & 16 characters.</li>
                <li>
                  Your password should begin with an <strong>UpperCase</strong>
                </li>
                <li>
                  Your password must be <strong>composed</strong> of at least 2
                  or 5 random numbers{" "}
                </li>
                <li>
                  Last but not least, your password must contain symbols such as
                  : /@\$*-!?
                </li>
              </ul>
              <button
                onClick={() => {
                  if (newPass === cmPass) {
                    dispatch(
                      UpdatePassword({
                        id: userData_from_redux._id,
                        newPassword: newPass,
                      })
                    );
                    setPasswordUpdateSuccess(true)
                  } else {
                    alert("Passwords Do Not Match !");
                  }
                }}
                type="submit"
              >
                {" "}
                Change Password{" "}
              </button>
            </div>
            <hr className="hr-update-info-section2"/>
            <div className="upload-pic-changer">
                <div className="uploadSection">
                  <input type="file" name="profile-pic-upload" onChange={(e) =>{ imageUpload = e.target.files[0]}}/>
                  <button type="submit" onClick={fileUpload} >Upload</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
