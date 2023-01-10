import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import { useSelector } from 'react-redux'
import {
  faHouseUser,
  faGraduationCap,
  faBuildingColumns,
  faMessage,
  faChartBar,
  faUser,
  faBug,
  faAddressCard,
  faPersonChalkboard,
  faUserPlus,
  faList
} from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const navigate = useNavigate();
  const [visibilityforOwner, setvisibilityforOwner ] = useState('none')
  const role = useSelector((state) => state.newUserReducer.userInfo.role)
  const firstname = useSelector((state) => state.newUserReducer.userInfo.firstname)
  const userData_from_redux = useSelector((state) => state.newUserReducer.userInfo)


  useEffect(() => {
    (role === 'Staff' || role === 'Owner') ? (setvisibilityforOwner({pointerEvents:'auto', opacity:'1'})) : (setvisibilityforOwner({pointerEvents:'none', opacity:'0.6'}))
  }, [role])

  const Signout = () => {
    localStorage.isStillConnected = false;
    console.clear()
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* Left Vertical Menu */}
      <div className="hr-menu">
        <div className="top-hr-menu">
          <img src={'http://localhost:2003/avatars/'+ userData_from_redux._id} alt="Profile Logo" />
          <p className="p-1st-line">
            Welcome {firstname} !
            <br />
          </p>
          <p className="p-2nd-line">Role Clearance : <strong> {role} </strong></p>
        </div>
        <hr className="hrline-hr-menu" />
        <div className="nav">
          <div className="ul-div">
            <ul className="ul-ul">
              <li>
                <Link to="">
                  <FontAwesomeIcon className="fa" icon={faHouseUser} />
                  Home
                </Link>
              </li>
              <li style={{pointerEvents: visibilityforOwner.pointerEvents, opacity: visibilityforOwner.opacity}} >
                <Link  to="AddAccount">
                  <FontAwesomeIcon className="fa" icon={faUserPlus} />
                  Add Account
                </Link>
              </li>
              <li>
                <Link to="Teachers">
                  <FontAwesomeIcon className="fa" icon={faPersonChalkboard} />
                  Teachers List
                </Link>
              </li>
              <li>
                <Link to="Students">
                  <FontAwesomeIcon className="fa" icon={faGraduationCap} />
                  Students List
                </Link>
              </li>
              <li>
                <Link to="Levels">
                  <FontAwesomeIcon className="fa" icon={faList} />
                  Levels List
                </Link>
              </li>
              <li>
                <Link to="Classrooms">
                  <FontAwesomeIcon className="fa" icon={faBuildingColumns} />
                  Classrooms List
                </Link>
              </li>
              <li style={{pointerEvents: visibilityforOwner.pointerEvents, opacity: visibilityforOwner.opacity}} >
                <Link to="Notifiyer">
                  <FontAwesomeIcon className="fa" icon={faMessage} />
                  Notifiyer
                </Link>
              </li>
              <li style={{pointerEvents: visibilityforOwner.pointerEvents, opacity: visibilityforOwner.opacity}} >
                <Link to="GraphData">
                  <FontAwesomeIcon className="fa" icon={faChartBar} />
                  Graphical Data
                </Link>
              </li>
              <li>
                <Link to="MyAccount">
                  <FontAwesomeIcon className="fa" icon={faUser} />
                  Personal Account
                </Link>
              </li>
              <li>
                <Link to="/BugReport">
                  <FontAwesomeIcon className="fa" icon={faBug} />
                  Report a bug
                </Link>
              </li>
              <li>
                <Link to="/Aboutus">
                  <FontAwesomeIcon className="fa" icon={faAddressCard} />
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="hr-footer" />
        <div className="nav-footer" style={{marginTop:'-50%'}}>
          <button type="submit" onClick={Signout} className="btn-signout-dash">
            Sign Out
          </button>
          <p className="text-menu-footer-dash">
            Castro Web Industries © 2022 All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default SideBar;
