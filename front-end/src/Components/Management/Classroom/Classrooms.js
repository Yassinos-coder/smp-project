import React, { useEffect, useState } from "react";
import "./Classrooms.css";
import Table from "react-bootstrap/Table";
//

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Input } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import ClassroomModel from "../../../models/ClassroomsModel";
import {
  AddClassroomGroup,
  deleteClassroom,
  GetClassroomGroups,
} from "../../../redux/ClassroomsReducer";

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

const Classrooms = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDeleter, setOpenDeleter] = useState(false);
  const [newClass, setNewClass] = useState(new ClassroomModel());
  const AllLevels = useSelector((state) => state.LevelsReducer.LevelInfo);
  useEffect(() => {
    dispatch(GetClassroomGroups());
  });
  const AllGroups = useSelector(
    (state) => state.ClassroomsReducer.ClassroomsInfo
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenDeleter = () => {
    setOpenDeleter(true);
  };


  const selectionFunc = (event) => {
    let LevelChoice = event.target.options[event.target.selectedIndex].text;
    setNewClass({ ...newClass, level: LevelChoice });
  };

  const handleClose = () => {
    console.log(newClass);
    dispatch(AddClassroomGroup({ newClass: newClass }));
    setOpen(false);
  };

  const [LevelGroupChoice, setLevelGroupChoice] = useState();
  const selectionFuncDeleterGroupCode = (event) => {
    setLevelGroupChoice(event.target.options[event.target.selectedIndex].text);
  };
  const [LevelCodeChoice, setLevelCodeChoice] = useState();
  const selectionFuncDeleterLevelCode = (event) => {
    setLevelCodeChoice(event.target.options[event.target.selectedIndex].text);
  };

  const handleCloseDeleter = () => {
    setOpenDeleter(false);
  };

  const deleteClassrommGroup = () => {
    console.log(LevelCodeChoice, LevelGroupChoice);
    dispatch(
      deleteClassroom({
        classroomcode: LevelGroupChoice,
        levelcode: LevelCodeChoice,
      })
    );
    setOpenDeleter(false);
  };



  return (
    <>
      <div className="main">
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Add Classroom Group
          </DialogTitle>
          <DialogContent sx={{ fontSize: "18px" }}>
            Classroom Group Name :
            <Input
              sx={{ paddingLeft: "5px", fontSize: "18px" }}
              type="text"
              name="classroom-name"
              placeholder="Ex: Groupe A1"
              onChange={(e) => {
                setNewClass({ ...newClass, name: e.currentTarget.value });
              }}
            />
          </DialogContent>
          <Divider />
          <DialogContent sx={{ fontSize: "18px" }}>
            Classroom Group Code :
            <Input
              sx={{ paddingLeft: "5px", fontSize: "18px" }}
              type="text"
              name="classroom-name"
              placeholder="Ex: A1"
              onChange={(e) => {
                setNewClass({ ...newClass, code: e.currentTarget.value });
              }}
            />
          </DialogContent>
          <Divider />
          <DialogContent sx={{ fontSize: "18px" }}>
            Classroom Group level :
            <select
              className="inputs-adacnt"
              name="ClassroomAdd"
              id="ClassroomAdd"
              onChange={(event) => {
                selectionFunc(event);
              }}
            >
              <option>Choose a level</option>
              {AllLevels.map((level, index) => (
                <option
                  style={{ cursor: "pointer" }}
                  key={index}
                  value={level.levelcode}
                >
                  {level.levelcode}
                </option>
              ))}
            </select>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleClose}>Add Groupe</Button>
          </DialogActions>
        </Dialog>

        {/* Below Deleter Dialog for classrooms */}

        <Dialog
          open={openDeleter}
          onClose={handleCloseDeleter}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Delete Classroom Group
          </DialogTitle>
          <DialogContent sx={{ fontSize: "18px" }}>
            Classroom Group Code :
            <select
              className="inputs-adacnt"
              name="ClassroomAdd"
              id="ClassroomAdd"
              onChange={(event) => {
                selectionFuncDeleterGroupCode(event);
              }}
            >
              <option>Choose a level</option>
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
          </DialogContent>
          <Divider />
          <DialogContent sx={{ fontSize: "18px" }}>
            Classroom Group level :
            <select
              className="inputs-adacnt"
              name="ClassroomAdd"
              id="ClassroomAdd"
              onChange={(event) => {
                selectionFuncDeleterLevelCode(event);
              }}
            >
              <option>Choose a level</option>
              {AllLevels.map((level, index) => (
                <option
                  style={{ cursor: "pointer" }}
                  key={index}
                  value={level.levelcode}
                >
                  {level.levelcode}
                </option>
              ))}
            </select>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseDeleter}>
              Cancel
            </Button>
            <Button onClick={deleteClassrommGroup}>Delete Groupe</Button>
          </DialogActions>
        </Dialog>
        <div className="UpBar">
          <div className="addClass">
            <button onClick={handleClickOpen}>Add Classroom Group</button>
          </div>
          <div className="DeleteClass">
            <button onClick={handleClickOpenDeleter}>
              Delete Classroom Group
            </button>
          </div>
        </div>
        <div className="data-table-classroom">
          <Table striped bordered hover width="100%">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Code</th>
                <th>Level</th>
                <th>Effectifs</th>
              </tr>
            </thead>
            <tbody>
              {AllGroups.map((group, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{group.name}</td>
                  <td> {group.code} </td>
                  <td> {group.level} </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Classrooms;
