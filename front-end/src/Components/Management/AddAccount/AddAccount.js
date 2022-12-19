import React, { useState } from "react";
import "./AddAccount.css";
import SignupsModel from "../../../models/SignupsModel";
import { newUserReducer } from "../../../redux/UserReducers";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import { useDispatch } from "react-redux";
import '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
 
const AddAccount = () => {
  const [SuccessNewAccount, setSuccessNewAccount] = useState(false);
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState(new SignupsModel());
  // Below Sign UP
  const Signup = () => {
    dispatch(newUserReducer(newUser));
    setSuccessNewAccount(true);
    setInterval(() => {
      setSuccessNewAccount(false);
    }, 500);
  };

  const selectionFunc = (event) => {
    let roleChoice = event.target.options[event.target.selectedIndex].text;
    setNewUser({ ...newUser, role: roleChoice });
  };

  //
  const handleSingupSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="UserAddingAccount">
        <div className="alerts">
          <Collapse in={SuccessNewAccount}>
            <Alert variant="filled" elevation={8} severity="success">
              <AlertTitle>Creation de compte avec succès</AlertTitle>
            </Alert>
          </Collapse>
        </div>
        <div className="Signup">
          <form onSubmit={(e) => {handleSingupSubmit(e);}}>
            <h1 className="addacnt-title"> 
            <FontAwesomeIcon className="fa-addacnt" icon={faArrowRight} />
            User Account Creation :</h1>
            <div className="part1">
                <label htmlFor="schoolid">School ID :</label>
                <input className="inputs-adacnt" type="text" name="schoolid" placeholder="Enter schoolid"  onChange={(e) => { setNewUser({...newUser, schoolid: e.currentTarget.value})}} />
                <label htmlFor="firstname">Firstname :</label>
                <input className="inputs-adacnt" type="text" name="firstname" placeholder="Enter Firstname"  onChange={(e) => { setNewUser({...newUser, firstname: e.currentTarget.value})}} />
                <label htmlFor="email">Email :</label>
                <input className="inputs-adacnt" type="email" name="email" placeholder="Enter E-mail Address" onChange={(e) => { setNewUser({...newUser, email: e.currentTarget.value})}} />
                <label htmlFor="password">Password :</label>
                <input className="inputs-adacnt" type="password" name="password" placeholder="Enter password" onChange={(e) => { setNewUser({...newUser, password: e.currentTarget.value})}} />                
                <label htmlFor="cin">CIN :</label>
                <input className="inputs-adacnt" type="text" name="cin" placeholder="Enter  CIN" onChange={(e) => { setNewUser({...newUser, cin: e.currentTarget.value})}} />
                <label htmlFor="pn">Phone number :</label>
                <input className="inputs-adacnt" type="text" name="pn" placeholder="06 xx xx xx xx" onChange={(e) => { setNewUser({...newUser, phonenumber: e.currentTarget.value})}} />
            </div>
            <div className="part2">
                <label htmlFor="Username">Username :</label>
                <input className="inputs-adacnt" type="text" name="Username" placeholder="Enter Username" onChange={(e) => { setNewUser({...newUser, username: e.currentTarget.value})}} />
                <label htmlFor="lastname">Lastname :</label>
                <input className="inputs-adacnt" type="text" name="lastname" placeholder="Enter Lastname" onChange={(e) => { setNewUser({...newUser, lastname: e.currentTarget.value})}} />
                <label htmlFor="Address">Address :</label>
                <input className="inputs-adacnt" type="text" name="Address" placeholder="Enter Address"  onChange={(e) => { setNewUser({...newUser, address: e.currentTarget.value})}}/>
                <label htmlFor="cm-password">Confirm Password :</label>
                <input className="inputs-adacnt" type="password" name="cm-password" placeholder="Confirm Password"  />
                <label htmlFor="dob">Date Of Birth :</label>
                <input className="inputs-adacnt" type="text" name="dob" placeholder="dd/mm/yy" onChange={(e) => { setNewUser({...newUser, dob: e.currentTarget.value})}} />
                <label htmlFor="firstname">What position are you ?</label>
                <select className="inputs-adacnt" name="roles" id="roles" onChange={(event) => {selectionFunc(event)}}>
                    <option value="">Choose From Below :</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Staff">Staff</option>
                    <option value="Owner">Owner</option>
                </select>
            </div>
            <button onClick={Signup} className="btn-signup" type="submit">Add User</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAccount;
