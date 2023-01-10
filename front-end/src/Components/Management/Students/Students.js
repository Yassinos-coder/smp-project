import React, { useState } from "react";
import "./Students.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import StudentsAccounts from "../../../models/StudentsAccounts";
import { Link, Outlet } from "react-router-dom";
import Table from "react-bootstrap/Table";

// Below Imports For Add Student Magical Canvas
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
  AddStudent, filterBygroup, filterBylevel, filterByname,
} from "../../../redux/StudentsAccountsReducer";
import { Input } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Students = () => {
  const dispatch = useDispatch();
  const [newStudent, setNewStudent] = useState(new StudentsAccounts());
  const [CheckboxState, setCheckboxState] = useState(faSquare);
  const [open, setOpen] = useState(false);
  const studentsList = useSelector(
    (state) => state.StudentsAccountsHandler.studentsData
  );
  const allLevels = useSelector((state) => state.LevelsReducer.LevelInfo);
  const AllGroups = useSelector(
    (state) => state.ClassroomsReducer.ClassroomsInfo
  );

  const selectionFuncGroup = (event) => {
    let GroupChoice = event.target.options[event.target.selectedIndex].text;
    setNewStudent({ ...newStudent, classroom_group: GroupChoice });
  };

  const selectionFuncLevel = (event) => {
    let LevelChoice = event.target.options[event.target.selectedIndex].text;
    setNewStudent({ ...newStudent, level: LevelChoice });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selecLevelFilter = (event) =>{
    let levelFilter = event.target.options[event.target.selectedIndex].text
    dispatch(filterBylevel(levelFilter))

  }

  const selecGroupFilter = (event) => {
    let groupFilter = event.target.options[event.target.selectedIndex].text
    dispatch(filterBygroup(groupFilter))
  }


  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "grey",
            fontFamily: "Cairo, sans-serif",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Student To Database
            </Typography>
            <Button
              sx={{
                fontFamily: "Cairo, sans-serif",
                fontSize: "18px",
                backgroundColor: "black",
              }}
              color="inherit"
              autoFocus
              onClick={() => {
                dispatch(AddStudent({ students_info: newStudent }));
                setInterval(handleClose(), 500);
              }}
            >
              Add Student
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText>
              First name :
              <Input
                sx={{ fontSize: "20px" }}
                type="text"
                name="firstname"
                onChange={(e) => {
                  setNewStudent({
                    ...newStudent,
                    firstname: e.currentTarget.value,
                  });
                }}
              />
            </ListItemText>
            <ListItemText>
              Last name :
              <Input
                sx={{ fontSize: "20px" }}
                type="text"
                name="lastname"
                onChange={(e) => {
                  setNewStudent({
                    ...newStudent,
                    lastname: e.currentTarget.value,
                  });
                }}
              />
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              Date Of Birth :
              <Input
                sx={{ fontSize: "20px" }}
                type="text"
                name="dob"
                onChange={(e) => {
                  setNewStudent({ ...newStudent, dob: e.currentTarget.value });
                }}
              />
            </ListItemText>
            <ListItemText>
              Address :
              <Input
                sx={{ fontSize: "20px" }}
                type="text"
                name="address"
                onChange={(e) => {
                  setNewStudent({
                    ...newStudent,
                    address: e.currentTarget.value,
                  });
                }}
              />
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              Phone Number :
              <Input
                sx={{ fontSize: "20px" }}
                type="text"
                name="phonenumber"
                onChange={(e) => {
                  setNewStudent({
                    ...newStudent,
                    phonenumber: e.currentTarget.value,
                  });
                }}
              />
            </ListItemText>
            <ListItemText>
              Student'S Email :
              <Input
                sx={{ fontSize: "20px" }}
                type="email"
                name="email"
                onChange={(e) => {
                  setNewStudent({
                    ...newStudent,
                    email: e.currentTarget.value,
                  });
                }}
              />
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              Password :
              <Input
                sx={{ fontSize: "20px" }}
                type="password"
                name="password"
                onChange={(e) => {
                  setNewStudent({
                    ...newStudent,
                    password: e.currentTarget.value,
                  });
                }}
              />
            </ListItemText>
            <ListItemText>
              Confirm Password :
              <Input
                sx={{ fontSize: "20px" }}
                type="password"
                name="password"
                autoComplete="cm-password"
              />
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              Level Of Student:
              <select
                className="inputs-adacnt"
                name="LevelAdd"
                id="LevelADD"
                onChange={(event) => {
                  selectionFuncLevel(event);
                }}
              >
                <option>Choose a level</option>
                {allLevels.map((level, index) => (
                  <option
                    style={{ cursor: "pointer" }}
                    key={index}
                    value={level.levelcode}
                  >
                    {level.levelcode}
                  </option>
                ))}
              </select>
            </ListItemText>
            <ListItemText>
              Classroom Group :
              <select
                className="inputs-adacnt"
                name="ClassroomAdd"
                id="ClassroomAdd"
                onChange={(event) => {
                  selectionFuncGroup(event);
                }}
              >
                <option>Choose a Groupe</option>
                {AllGroups.map((group, index) => (
                  <option
                    style={{ cursor: "pointer" }}
                    key={index}
                    value={group.code}
                  >
                    {group.code}
                  </option>
                ))}
              </select>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              Father'S Name :
              <Input
                sx={{ fontSize: "20px" }}
                type="text"
                name="father-name"
                onChange={(e) => {
                  setNewStudent({
                    ...newStudent,
                    father_name: e.currentTarget.value,
                  });
                }}
              />
            </ListItemText>
            <ListItemText>
              Father'S CIN :
              <Input
                sx={{ fontSize: "20px" }}
                type="text"
                name="father-cin"
                onChange={(e) => {
                  setNewStudent({
                    ...newStudent,
                    father_cin: e.currentTarget.value,
                  });
                }}
              />
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              Mother'S Name :
              <Input
                sx={{ fontSize: "20px" }}
                type="text"
                name="mother-name"
                onChange={(e) => {
                  setNewStudent({
                    ...newStudent,
                    mother_name: e.currentTarget.value,
                  });
                }}
              />
            </ListItemText>
            <ListItemText>
              Mother'S CIN :
              <Input
                sx={{ fontSize: "20px" }}
                type="text"
                name="mother-cin"
                onChange={(e) => {
                  setNewStudent({
                    ...newStudent,
                    mother_cin: e.currentTarget.value,
                  });
                }}
              />
            </ListItemText>
          </ListItem>
        </List>
      </Dialog>

      <div className="students-dash">
        <div className="top-box">
          <div className="search-box">
            <p>Filters :</p>
            <input
              className="srch-input"
              type="text"
              placeholder="Filter By Firstname"
            onChange={(e) =>{dispatch(filterByname(e.currentTarget.value))}}/>
          </div>
          <hr className="hr-students" />
          <div className="filter-by-level">
            <select name="studentLevel" id="studentLevel" onChange={(e) =>selecLevelFilter(e)}>
              <option value="Filter By Level" >Filter By Level</option>
              {allLevels.map((level, index) => (
                <option
                  style={{ cursor: "pointer" }}
                  key={index}
                  value={level.levelcode}
                >
                  {level.levelcode}
                </option>
              ))}
            </select>
          </div>
          <hr className="hr-students-2" />
          <div className="filter-by-group">
            <select name="studentGroup" id="studentGroup" onChange={(e) =>selecGroupFilter(e)}>
              <option value="Filter By Group">Filter By Classroom Group</option>
              {AllGroups.map((group, index) => (
                <option
                  style={{ cursor: "pointer" }}
                  key={index}
                  value={group.code}
                >
                  {group.code}
                </option>
              ))}
            </select>
          </div>
          <hr className="hr-students-3" />
          <div className="AddStudent">
            <button
              type="submit"
              onClick={handleClickOpen}
              className="btn-add-student"
            >
              <FontAwesomeIcon className="fa-add-student" icon={faUserPlus} />
              Add Student
            </button>
          </div>
        </div>
        <div className="data-table">
          <Table striped bordered hover width="100%">
            <thead>
              <tr>
                <th>
                  {" "}
                  <FontAwesomeIcon icon={CheckboxState} />
                </th>
                <th>#</th>
                <th>Full Name</th>
                <th>Classroom</th>
                <th>Level</th>
                <th>Date Of Birth</th>
                <th>Phone Number</th>
                <th>Adresse</th>
                <th>More Details</th>
              </tr>
            </thead>
            <tbody>
              {studentsList.map((student, index) => (
                <tr>
                  <td>
                    <FontAwesomeIcon
                      style={{ paddingLeft: "5px" }}
                      icon={CheckboxState}
                    />
                  </td>
                  <td key={index}> {index + 1} </td>
                  <td>
                    {" "}
                    {student.firstname} {student.lastname}{" "}
                  </td>
                  <td align="center"> {student.classroom_group} </td>
                  <td> {student.level} </td>
                  <td> {student.dob} </td>
                  <td align="center"> {student.phonenumber} </td>
                  <td> {student.address} </td>
                  <td>
                    <Link to={`StudentDetails/${student._id}`} state={student}>
                      {" "}
                      <p
                        style={{ fontSize: "16px" }}
                      >
                        More Details
                      </p>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Students;
