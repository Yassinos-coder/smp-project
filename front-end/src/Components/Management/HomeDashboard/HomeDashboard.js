/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../Dashboard.css";
import "./HomeDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../redux/tasksReducer";
import Tasks from "../TaskToAchieve/Tasks";
import "@fortawesome/free-solid-svg-icons";
import {
  faEnvelopeCircleCheck,
  faArrowRightLong,
  faEnvelopeOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deleteAllNotif,
  getNotify,
  markRead,
} from "../../../redux/NotifyerReducer";
import {
  deleteAllRoleNotif,
  getAllNotifRole,
} from "../../../redux/NotifRoleReducer";

const HomeDashboard = () => {
  const dispatch = useDispatch();
  const userID = localStorage.userID;
  const role = localStorage.role_name;
  const username = localStorage.getItem("userName");
  const NotifByUsr = useSelector((state) => state.NotifyerReducer.AllNotif);
  const NotifToRole = useSelector(
    (state) => state.NotifyerByRoleReducer.allNotifRole
  );
  const pending_status = useSelector((state) => state.newUserReducer.Status);
  const [faNotif, setFaNotif] = useState(faEnvelopeCircleCheck);

  useEffect(() => {
    dispatch(getTasks({ userid: userID }));
    dispatch(getNotify({ username: username }));
    dispatch(getAllNotifRole({ role: role }));
    NotifByUsr.map((notif) => {
      if (notif.read === false) {
        setFaNotif(faEnvelopeCircleCheck);
      } else {
        setFaNotif(faEnvelopeOpen);
      }
    });
  },[]);

  const markReadHandler = (i) => {
    NotifByUsr.map((notif) => {
      if (notif === i) {
        if (notif.read === false) {
          dispatch(
            markRead({ notifid: i._id, username: username, readUpdate: true })
          );
          setFaNotif(faEnvelopeOpen);
        } else {
          dispatch(
            markRead({ notifid: i._id, username: username, readUpdate: false })
          );
          setFaNotif(faEnvelopeCircleCheck);
        }
      }
    });
  };

  const handleClearAll = () => {
    dispatch(deleteAllNotif({ username: username }));
    dispatch(deleteAllRoleNotif({ role: role }));
  };

  return (
    <>
      <div
        className="spinner-div"
        style={
          pending_status === "Pending"
            ? { visibility: "visible" }
            : { visibility: "hidden" }
        }
      >
        <div className="spinner"></div>
      </div>
      <div className="HD-Boxes">
        <div className="box1">
          {" "}
          {/*    School Data */}
          <h3
            style={{
              fontSize: "20px",
              marginLeft: "2%",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            School Data :
          </h3>
          <table className="box1-table">
            <thead>
              <tr>
                <td width="40%">School Name : </td>

                <td align="left">
                  <p>The International School</p>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td>School ID :</td>
                <td>
                  <p>21545614DEB</p>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td>Total Staff Number :</td>
                <td>
                  <p>20 Staff</p>
                </td>
              </tr>
            </thead>
            <thead></thead>
            <thead>
              <tr>
                <td>Total Teachers Number :</td>
                <td>50 Teacher</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td>Total Students Number :</td>
                <td>
                  <p>4500 Student</p>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td>Website :</td>
                <td>
                  <a
                    target="_blank"
                    href="https://google.com"
                    rel="noreferrer noopener"
                  >
                    www.example.com
                  </a>
                </td>
              </tr>
            </thead>
          </table>
        </div>
        <div className="box2">
          {" "}
          {/*   Calendar */}
          <h3
            style={{
              fontSize: "20px",
              marginLeft: "2%",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Calendar :
          </h3>
          <div className="calendar">
            <h2 style={{textAlign:'center'}}>Calendar is to be set here.</h2>
          </div>
        </div>
        <div className="box3">
          {" "}
          {/*   Notifications */}
          <h3
            style={{
              fontSize: "20px",
              marginLeft: "2%",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Notifications :
          </h3>
          <div className="clr-all">
            <p onClick={handleClearAll}>Clear All</p>
          </div>
          <div className="display-notif">
            <div
              className="empty-box"
              style={
                NotifByUsr.length === 0 && NotifToRole.length === 0
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              <FontAwesomeIcon className="fa-empty-box" icon={faEnvelopeOpen} />
              <p>Empty Mail Box</p>
            </div>
            {NotifToRole.map((notif, index) => (
              <div className="notif">
                <FontAwesomeIcon
                  onClick={() => {
                    markReadHandler(notif);
                  }}
                  className="faNotif"
                  icon={faNotif}
                />
                <p className="notfi_from_usr">
                  from {notif.notif_from_user} <strong>To All {role}</strong>:
                </p>
                <p className="notif_sbjct"> {notif.notif_subject} </p>
                <p className="notif_msg">
                  <FontAwesomeIcon
                    className="faNotif2"
                    icon={faArrowRightLong}
                  />
                  {notif.notif_msg}
                </p>
              </div>
            ))}
            {NotifByUsr.map((notif, index) => (
              <div className="notif">
                <FontAwesomeIcon
                  onClick={() => {
                    markReadHandler(notif);
                  }}
                  className="faNotif"
                  icon={faNotif}
                />
                <p className="notfi_from_usr">from {notif.notif_from_user}:</p>
                <p className="notif_sbjct"> {notif.notif_subject} </p>
                <p className="notif_msg">
                  <FontAwesomeIcon
                    className="faNotif2"
                    icon={faArrowRightLong}
                  />
                  {notif.notif_msg}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="box4">
          {" "}
          {/*    Task To Achieve */}
          <h3
            style={{
              fontSize: "20px",
              marginLeft: "2%",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Task To Achieve :
          </h3>
          <div className="tasktodo">
            <Tasks />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeDashboard;
