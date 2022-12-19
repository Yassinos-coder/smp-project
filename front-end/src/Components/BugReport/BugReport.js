import React, { useState } from "react";
import { useDispatch } from "react-redux";
import BugsReportsModel from "../../models/BugsReportsModel";
import { reportBug } from "../../redux/BugReportsReducer";
import TopBar from "../Home/TopBar";
import "./BugReport.css";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";

const BugReport = () => {
  const [newBug, setNewBug] = useState(new BugsReportsModel());
  const dispatch = useDispatch();
  const [BugRprtSuccess, setBugRprtSuccess] = useState(false);
  const navigate = useNavigate()

  return (
    <>
      <div className="alerts alert-in-bug-report">
        <Collapse in={BugRprtSuccess}>
          <Alert
            variant="filled"
            elevation={8}
            severity="success"
          >
            <AlertTitle>Reclamations Envoyé avec succés.</AlertTitle>
          </Alert>
        </Collapse>
      </div>

      <div className="topbar-cmp">
        <TopBar />
      </div>
      <div className="bug-report">
        <h2>Fill in the form.</h2>
        <p>
          Thank you for helping us in making this platform a better one every
          day.
        </p>
        <div className="bug-report-form">
          <label htmlFor="fullname">Full Name :</label>
          <input
            type="text"
            name="fullname"
            placeholder="Ex: Jhon Doe"
            onChange={(e) => {
              setNewBug({ ...newBug, fullname: e.target.value });
            }}
          />
          <label htmlFor="email"> E-mail address :</label>
          <input
            type="text"
            name="email"
            placeholder="example@domain.com"
            onChange={(e) => {
              setNewBug({ ...newBug, email: e.target.value });
            }}
          />
        </div>
        <div className="sbjct-form">
          <label htmlFor="sbjct">Subject :</label>
          <input
            type="text"
            name="sbjct"
            title="sbjct"
            placeholder="Ex: Bug regarding login form"
            onChange={(e) => {
              setNewBug({ ...newBug, subject: e.target.value });
            }}
          />
        </div>
        <div className="msg">
          <label htmlFor="msg">Message :</label>
          <textarea
            type="text"
            name="msg"
            placeholder="Please state your case."
            onChange={(e) => {
              setNewBug({ ...newBug, bug: e.target.value });
            }}
          />
        </div>
        <button
          onClick={() => {
            dispatch(reportBug(newBug));
            setBugRprtSuccess(true)
            setInterval(() => {
              navigate('/Dashboard')
            }, 1000);
          }}
          className="btn-submit-bugreport"
        >
          Send Report
        </button>
      </div>
    </>
  );
};

export default BugReport;
