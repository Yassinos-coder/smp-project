import React, { useEffect, useState } from "react";
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
import smpLogo from '../../assets/imgs/smpLogo.png'
//Bellow Import For Material UI + AXIOS 
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const Home = () => {
  const [credentials_to_send, setCredentials_to_send] = useState()
  // below states for Alerts in materialUI
  const [LoginError, setLoginError] = useState(false);
  // other Main States
  const dispatch = useDispatch();
  const webStatus = true;
  const [backEnd, setbackEnd] = useState(false);
  const [apisServer, setapisServer] = useState(false);
  const [open, setOpen] = useState(false);
  const signin_response = useSelector((state) => state.newUserReducer.isloginCorrect);
  const uname_input = React.createRef();
  const passwd_input = React.createRef();
  const navigate = useNavigate();
  const userID = localStorage.userID;

  useEffect(() => {
    if (!localStorage.role_name) {
      setOpen(true);
    }
    axios.get('http://localhost:2003/').then((res) => {setapisServer(res.data)}).catch((err) =>{console.error(err)})
    axios.get('http://localhost:2003/DBStatus').then((res) => {setbackEnd(res.data)}).catch((err) =>{console.error(err)})
  },[]);

  const handleClose = () => {
    setOpen(false);
  };

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

  // Below send_inputs() sends login credentials to back-end onclick in login button
  const send_inputs = () => {
    // let credentials_to_send = {
    //   uname: uname_input.current.value,
    //   passwd: passwd_input.current.value,
    // };

  };
  // below we check on response from back-end onclick in login button
  const Login =  () => {
    dispatch(getUserID({ username: credentials_to_send.uname }));
    dispatch(GetUserData({ username: credentials_to_send.uname }));
    dispatch(Signin({ credentials: credentials_to_send })).then((data) => {
      if (data.payload === true) {
        navigate(`/${userID}/Dashboard`);
        localStorage.userName = credentials_to_send.uname
        localStorage.isStillConnected = "true"
      } else {
        setLoginError(true);
        setInterval(() => {
          setLoginError(false);
        }, 2000);
      }
    })
  };

  return (
    <>
      <div className="home">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Pleace specify your role at S.M.P !"}
          </DialogTitle>
          <DialogContent>
            <div className="buttons-dialog-app">
              <button
                onClick={() => {
                  localStorage.role_name = "Student";
                  handleClose();
                }}
              >
                Student
              </button>
              <button
                onClick={() => {
                  localStorage.role_name = "Teacher";
                  handleClose();
                }}
              >
                Teacher
              </button>
              <button
                onClick={() => {
                  localStorage.role_name = "Staff";
                  handleClose();
                }}
              >
                Staff
              </button>
              <button
                onClick={() => {
                  localStorage.role_name = "Owner";
                  handleClose();
                }}
              >
                Owner
              </button>
            </div>
          </DialogContent>
        </Dialog>
        <div className="alerts-login">
          <Collapse in={LoginError}>
            <Alert
              variant="filled"
              elevation={8}
              severity="error"
            >
              <AlertTitle>Accés Refusé.</AlertTitle>
              Veuillez Verifier <strong>les données entrèes</strong>
            </Alert>
          </Collapse>
        </div>
        <TopBar />
        <div className="smp-logo">
          <img src={smpLogo} alt="" />
        </div>
        {/* Signup Box / Signin Box */}
        <div className="userBox">
          {/* Signin Box */}
          <div className="Signin">
            <p
              style={{
                paddingBottom: "13px",
                color: "white",
                fontSize: "28px",
                textAlign: "center",
              }}
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
              autoComplete="username"
              placeholder="Enter your username"
              onChange={(e) => {setCredentials_to_send({...credentials_to_send, uname: e.currentTarget.value})}}
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
              onChange={(e) => {setCredentials_to_send({...credentials_to_send ,passwd: e.currentTarget.value})
            }}

            />
            <a
              target="__blank"
              rel="noopener noreferrer"
              href="http://adguardhome.local/"
              className="forgot-password"
            >
              <p>Forgot Password ?</p>
            </a>
            <button className="btn-signin" onClick={()=>{
                  Login()
               }} type="submit">
              Sign In
            </button>
            <div className="system-status">
              <p
                style={{
                  paddingLeft: "2%",
                  textDecoration: "underline",
                  fontSize: "14px",
                }}
              >
                Systems Status :
              </p>
              <p style={{ paddingLeft: "8%", fontSize: "12px" }}>
                -Web Server
                <FontAwesomeIcon
                  style={
                    webStatus === true ? { color: "green" } : { color: "red" }
                  }
                  className="facircle"
                  icon={faCircle}
                />
              </p>
              <p style={{ paddingLeft: "8%", fontSize: "12px" }}>
                -BackEnd Server
                <FontAwesomeIcon
                  style={
                    backEnd === true ? { color: "green" } : { color: "red" }
                  }
                  className="facircle"
                  icon={faCircle}
                />
              </p>
              <p style={{ paddingLeft: "8%", fontSize: "12px" }}>
                -APIs Server
                <FontAwesomeIcon
                  style={
                    apisServer === true ? { color: "green" } : { color: "red" }
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
