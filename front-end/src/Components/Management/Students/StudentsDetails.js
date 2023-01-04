import React, { useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core'
import {faFileImport} from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'


// Below Imports For Add Student Magical Canvas
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useLocation, useNavigate } from "react-router-dom";
//Below Impor for upload profile picture 
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { profilePictureUpload } from "../../../redux/StudentsAccountsReducer";

// Below function for Profile Picture Uploader
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const StudentsDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // studentsDataFromCmp stands for students data from component Student whice is passed via locationstate
  const studentsDataFromCmp = location.state

  const [openDetails, setOpenDetails] = useState(true);
  const [openPPictureUploader, setOpenPPictureUploader] = useState(false)

  const handleCloseDetails = () => {
    setOpenDetails(false);
    navigate(-1)
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClosePPU = () =>  {
    setOpenPPictureUploader(false)
  }
  const handleOpenPPU = () => {
    setOpenPPictureUploader(true)
  }

  const getImageToUpload = (event) => {
    let imageToUpload = event.target.files[0]
    dispatch(profilePictureUpload({imageProfile: imageToUpload}))
    console.log(imageToUpload)
  }

  return (
    <div>
      <Dialog
          open={openPPictureUploader}
          onClose={handleClosePPU}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Delete Classroom Group
          </DialogTitle>
          <DialogContent sx={{ fontSize: "18px" }}>
            <div className="upload">
              <input type='file' name="upload-picture" onInput={(event) => {getImageToUpload(event)}}/>
              <FontAwesomeIcon icon={faFileImport}/>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClosePPU}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      <Dialog
        fullScreen
        open={openDetails}
        onClose={handleCloseDetails}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor:'grey'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDetails}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, fontSize :'25px'}} variant="h1" component="div">
                {studentsDataFromCmp.firstname} {studentsDataFromCmp.lastname}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="MainBody-Dialog">
                <div className="StudentPic">
                    <h2>Pic</h2>
                </div>
                <div className="studentData1Display">
                    <div className="part1-data">
                        <p>Full Name: {studentsDataFromCmp.firstname} {studentsDataFromCmp.lastname}</p>
                        <p>Dob: {studentsDataFromCmp.dob}</p>
                        <p>Email Address : {studentsDataFromCmp.email}</p>
                        <p>Living Address: {studentsDataFromCmp.address}</p>
                        <p>Grade / Level Code : { studentsDataFromCmp.level }</p>
                        <hr className="hr-part1-data"/>
                        <div className="part1-data-2">
                            <p>Classroom Group : {studentsDataFromCmp.classroom_group} </p>
                            <p>Father'S Name : {studentsDataFromCmp.father_name} </p>
                            <p>Father'S CIN : {studentsDataFromCmp.father_cin} </p>
                            <p>Mother'S Name : {studentsDataFromCmp.mother_name} </p>
                            <p>Mother'S CIN : {studentsDataFromCmp.mother_cin} </p>
                        </div>
                        <hr className="hr-part1-data-2"/>
                        <div className="part1-data-3">
                            <h3>Actions: </h3>
                            <button onClick={handleOpenPPU} className="detailsBtn btn-action1">Upload Student Picture</button>
                            <button className="detailsBtn btn-action2">Change Password</button>
                            <button className="detailsBtn btn-action3">Delete Student</button>
                        </div>
                    </div>
                </div>
                <div className="studentData2Display">
                    <div className="part2">
                        Data 2
                    </div>
                </div>
          </div>
      </Dialog>
    </div>
  );
};

export default StudentsDetails;
