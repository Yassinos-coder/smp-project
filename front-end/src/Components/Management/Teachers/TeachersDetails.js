import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Teachers.css";

// Below Imports For Add Student Magical Canvas
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { assignClass, getTeachingClass, getTeachingLevel } from "../../../redux/TeachersReducer";

const TeachersDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [classData, setClassData] = useState();
  // TeacherDataFromCmp stands for students data from component Student whice is passed via locationstate
  const TeacherDataFromCmp = location.state;
  const levelOfTeaching = useSelector((state) => state.TeachersReducer.TeacherLevelData)
  const classlOfTeaching = useSelector((state) => state.TeachersReducer.TeacherClassData)
  useEffect(() => {
    dispatch(getTeachingClass({teacher_id:TeacherDataFromCmp._id}))
    dispatch(getTeachingLevel({teacher_id:TeacherDataFromCmp._id}))
    console.log('1', classlOfTeaching)
    console.log(levelOfTeaching)
  },[])

  const [openTeacherDetails, setOpenTeacherDetails] = useState(true);

  const handleCloseTeacherDetails = () => {
    setOpenTeacherDetails(false);
    navigate(-1);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  let imageUpload;

  const fileUpload = () => {
    const file = new FormData();
    file.append("image", imageUpload);
    dispatch();
  };

  const handlePasswordChange = () => {
    axios
      .post(
        `http://localhost:2003/genNewPass/${TeacherDataFromCmp._id}/${TeacherDataFromCmp.email}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };
  let level;
  let classgroup ;

  const handleClassAssign = () => {
    console.log(level)
    console.log(classgroup)
    dispatch(
      assignClass({teacher_id: TeacherDataFromCmp._id, level:level, classroomGroup: classgroup})
    );
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={openTeacherDetails}
        onClose={handleCloseTeacherDetails}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "rgba(255, 68, 0, 0.7)",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseTeacherDetails}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, fontSize: "25px" }}
              variant="h1"
              component="div"
            >
              {TeacherDataFromCmp.firstname} {TeacherDataFromCmp.lastname}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="MainBody-Dialog">
          <div className="TeacherPIC">
            <img
              src={"http://localhost:2003/avatars/" + TeacherDataFromCmp._id}
              alt="Profile Avatar Unavailable"
            />
          </div>
          <div className="TeacherData1Display">
            <div className="part1-data">
              <p>
                Full Name: {TeacherDataFromCmp.firstname}{" "}
                {TeacherDataFromCmp.lastname}
              </p>
              <p>Dob: {TeacherDataFromCmp.dob}</p>
              <p>Email Address : {TeacherDataFromCmp.email}</p>
              <p>Living Address: {TeacherDataFromCmp.address}</p>
              <p>Grade / Level Codes : {levelOfTeaching.map((level, index) => (<span key={index} style={{display:'inline'}}>{level.level} /</span>))}</p>
              <hr className="hr-part1-data" />
              <div className="part1-data-2">
                <p>Classroom Groups :{classlOfTeaching.map((classroom, index) => (<span key={index} style={{display:'inline'}}>{classroom.classroomGroup} /</span>))}</p>
                <p>Subjects Of Teaching</p>
                <p>Years Of Experience</p>
              </div>
              <hr className="hr-part1-data-2" />
              <div className="part1-data-3">
                <h3>Actions: </h3>
                <div className="div-upload">
                  <input
                    type="file"
                    name="profile-pic-upload"
                    onChange={(e) => {
                      imageUpload = e.target.files[0];
                    }}
                  />
                  <button type="submit" onClick={fileUpload}>
                    Upload
                  </button>
                </div>
                <button
                  className="detailsBtn btn-action2"
                  onClick={handlePasswordChange}
                >
                  Change Password
                </button>
                <button
                  className="detailsBtn btn-action3"
                  onClick={() => {
                    dispatch();
                    navigate(-1);
                  }}
                >
                  Delete Student
                </button>
              </div>
            </div>
          </div>
          <div className="TeacherData2Display">
            <div className="part2-data">
              <div className="absence">
                <table
                  className="absense-table"
                  style={{ border: "1px solid black", margin: "auto 1%" }}
                >
                  <thead className="tbody-absense">
                    <tr>
                      <td width="50%">Day When Absent :</td>
                      <td width="50%">Reason :</td>
                    </tr>
                  </thead>
                  <tbody className="tbody-absense"></tbody>
                </table>
              </div>
            </div>
            <hr className="hr-part2-data-1" />
            <div className="part2-data-2">
              <input type="text" name="level" onChange={(e) =>{level = e.currentTarget.value}} placeholder="Enter level EX: CE1"/>
              <input type="text" onChange={(e) =>{classgroup = e.currentTarget.value}} name="group" placeholder="Enter Classroom Group EX: A1"/>
              <button
                className="detailsBtn btn-action4"
                onClick={handleClassAssign}
              >
                Assign Classroom Group & Level
              </button>
            </div>
            <hr className="hr-part2-data-2" />
            <div className="part2-data-3">
              <h3 style={{ textAlign: "center" }}>Something Else Goes Here.</h3>
            </div>
          </div>
          <h1 style={{ textAlign: "center" }}>Other Data Will Go Here Soon.</h1>
        </div>
      </Dialog>
    </div>
  );
};

export default TeachersDetails;
