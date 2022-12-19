import React, { useEffect } from "react";
import "../Dashboard.css";
import "./HomeDashboard.css";
import { useDispatch } from "react-redux";
import { getTasks } from "../../../redux/tasksReducer";
import Tasks from "../TaskToAchieve/Tasks";

const HomeDashboard = () => {
  const dispatch = useDispatch();
  const userID = localStorage.userID;
  useEffect(() => {
    dispatch(getTasks({ userid: userID }));
  });

  return (
    <>
      <div className="HD-Boxes">
        <div className="box1">
          <h3
            style={{
              fontSize: "20px",
              marginLeft: "2%",
              textDecoration: "underline",
              textUnderlineOffset:'3px'
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
                <td>
                  Website :
                </td>
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
          <h3
            style={{
              fontSize: "20px",
              marginLeft: "2%",
              textDecoration: "underline",
              textUnderlineOffset:'3px'
            }}
          >
            Calendar :
          </h3>
          <div className="calendar"></div>
        </div>
        <div className="box3">
          <h3
            style={{
              fontSize: "20px",
              marginLeft: "2%",
              textDecoration: "underline",
              textUnderlineOffset:'3px'
            }}
          >
            Notifications :
          </h3>
        </div>
        <div className="box4">
          <h3
            style={{
              fontSize: "20px",
              marginLeft: "2%",
              textDecoration: "underline",
              textUnderlineOffset:'3px'
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
