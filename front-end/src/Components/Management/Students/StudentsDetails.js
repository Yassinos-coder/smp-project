import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DeleteStudent, uploadStudentImage
} from "../../../redux/StudentsAccountsReducer";

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

const StudentsDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // studentsDataFromCmp stands for students data from component Student whice is passed via locationstate
  const studentsDataFromCmp = location.state;

  const [openDetails, setOpenDetails] = useState(true);

  const handleCloseDetails = () => {
    setOpenDetails(false);
    navigate(-1);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  let imageUpload;

  const fileUpload = () => {
    const file = new FormData()
    file.append("image", imageUpload)
    dispatch(uploadStudentImage({studentid: studentsDataFromCmp._id, image:file}))
  }

  const handlePasswordChange = () => {
    axios.post(`http://localhost:2003/genNewPass/${studentsDataFromCmp._id}/${studentsDataFromCmp.email}`).then((res)=> {return res.data})
    .catch((err) =>{console.error(err)})
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={openDetails}
        onClose={handleCloseDetails}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "grey" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDetails}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, fontSize: "25px" }}
              variant="h1"
              component="div"
            >
              {studentsDataFromCmp.firstname} {studentsDataFromCmp.lastname}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="MainBody-Dialog">
          <div className="StudentPic">
            <img src={'http://localhost:2003/Students/'+ studentsDataFromCmp._id} alt="Profile Avatar Unavailable" />
          </div>
          <div className="studentData1Display">
            <div className="part1-data">
              <p>
                Full Name: {studentsDataFromCmp.firstname}{" "}
                {studentsDataFromCmp.lastname}
              </p>
              <p>Dob: {studentsDataFromCmp.dob}</p>
              <p>Email Address : {studentsDataFromCmp.email}</p>
              <p>Living Address: {studentsDataFromCmp.address}</p>
              <p>Grade / Level Code : {studentsDataFromCmp.level}</p>
              <hr className="hr-part1-data" />
              <div className="part1-data-2">
                <p>Classroom Group : {studentsDataFromCmp.classroom_group} </p>
                <p>Father'S Name : {studentsDataFromCmp.father_name} </p>
                <p>Father'S CIN : {studentsDataFromCmp.father_cin} </p>
                <p>Mother'S Name : {studentsDataFromCmp.mother_name} </p>
                <p>Mother'S CIN : {studentsDataFromCmp.mother_cin} </p>
              </div>
              <hr className="hr-part1-data-2" />
              <div className="part1-data-3">
                <h3>Actions: </h3>
                <div className="div-upload">
                  <input type="file" name="profile-pic-upload" onChange={(e) =>{ imageUpload = e.target.files[0]}}/>
                  <button type="submit" onClick={fileUpload} >Upload</button>
                </div>
                <button className="detailsBtn btn-action2"
                  onClick={handlePasswordChange}
                >
                  Change Password
                </button>
                <button
                  className="detailsBtn btn-action3"
                  onClick={() => {
                    dispatch(
                      DeleteStudent({ student_id: studentsDataFromCmp._id })
                    );
                    navigate(-1);
                  }}
                >
                  Delete Student
                </button>
              </div>
            </div>
          </div>
          <div className="studentData2Display">
            <div className="part2">Data 2</div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default StudentsDetails;
