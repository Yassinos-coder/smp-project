import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { GetUserData, getUserID, Signin } from "../../redux/UserReducers";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import TopBar from "./TopBar";

const Home = () => {
  // below states for Alerts in materialUI
  const [LoginError, setLoginError] = useState(false);
  // other Main States
  const dispatch = useDispatch();
  const [webStatus, setWebStatus] = useState("0");
  const [backEnd, setbackEnd] = useState("0");
  const [apisServer, setapisServer] = useState("0");
  const signin_response = useSelector(
    (state) => state.newUserReducer.isloginCorrect
  );
  const uname_input = React.createRef();
  const passwd_input = React.createRef();
  const navigate = useNavigate();
  const userID = localStorage.userID;



  // Below LocalStorage Logic for logIn & LogOut
  if (signin_response === true && localStorage.isStillConnected === "true") {
    localStorage.setItem("isStillConnected", "true");
  } else if (
    signin_response === true &&
    localStorage.isStillConnected === "false"
  ) {
    localStorage.setItem("isStillConnected", "false");
  } else {
    localStorage.setItem("isStillConnected", "false");
  }


  // Below send_inputs() sends login credentials to back-end onchange in password input
  const send_inputs = () => {
    let credentials_to_send = {
      uname: uname_input.current.value,
      passwd: passwd_input.current.value,
    };
    dispatch(Signin({ credentials: credentials_to_send }));
    dispatch(getUserID({ username: credentials_to_send.uname }));
    
  };
  // below we check on response from back-end onclick in login button
  const Login = () => {
    dispatch(GetUserData({id: localStorage.userID}))
    if (signin_response === true) {
      navigate(`/${userID}/Dashboard`);
      localStorage.userName = uname_input.current.value;
      localStorage.isStillConnected = "true";
    } else {
      setLoginError(true);
    }
  };





  return (
    <>
      <div className="home">
        <div className="alerts-login">
          <Collapse in={LoginError}>
            <Alert
              variant="filled"
              elevation={8}
              onClose={() => {
                setLoginError(false);
              }}
              severity="error"
            >
              <AlertTitle>Accés Refusé.</AlertTitle>
              Veuillez Verifier <strong>les données entrèes</strong>
            </Alert>
          </Collapse>
        </div>
        <TopBar />
        {/* Signup Box / Signin Box */}
        <div className="userBox">
          {/* Signin Box */}
          <div className="Signin">
            <p
              style={{ paddingBottom:'13px',color: "white", fontSize: "28px", textAlign: "center" }}
            >
              Log In
            </p>
            <label className="labels signin-label" htmlFor="login-username">
              Username
            </label>
            <input
              className="inputs signin-input"
              ref={uname_input}
              type="text"
              name="login-username"
              placeholder="Enter your username"
            />
            <label className="labels signin-label" htmlFor="login-password">
              Password
            </label>
            <input
              className="inputs signin-input"
              ref={passwd_input}
              autoComplete="current-password"
              type="password"
              name="login-password"
              placeholder="Enter your password"
              onChange={send_inputs}
            />
            <a
              target="__blank"
              rel="noopener noreferrer"
              href="http://adguardhome.local/"
              className="forgot-password"
            >
              <p>Forgot Password ?</p>
            </a>
            <button
              className="btn-signin"
              onClick={Login}
              type="submit"
            >
              Sign In
            </button>
            <div className="system-status">
              <p
                style={{
                  paddingLeft: "2%",
                  textDecoration: "underline",
                  fontSize: "10px",
                }}
              >
                Systems Status :
              </p>
              <p style={{ paddingLeft: "8%", fontSize: "12px" }}>
                -Web Server
                <FontAwesomeIcon
                  style={
                    webStatus === "200" ? { color: "green" } : { color: "red" }
                  }
                  className="facircle"
                  icon={faCircle}
                />
              </p>
              <p style={{ paddingLeft: "8%", fontSize: "12px" }}>
                -BackEnd Server
                <FontAwesomeIcon
                  style={
                    backEnd === "200" ? { color: "green" } : { color: "red" }
                  }
                  className="facircle"
                  icon={faCircle}
                />
              </p>
              <p style={{ paddingLeft: "8%", fontSize: "12px" }}>
                -APIs Server
                <FontAwesomeIcon
                  style={
                    apisServer === "200" ? { color: "green" } : { color: "red" }
                  }
                  className="facircle"
                  icon={faCircle}
                />
              </p>
            </div>
          </div>
          <p className="cp-p" style={{ color: "white", paddingLeft: "12%" }}>
            Castro Web Industries © 2022 All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
