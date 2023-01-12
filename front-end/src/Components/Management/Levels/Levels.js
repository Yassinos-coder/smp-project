import React, { useEffect, useState } from "react";
import "./Levels.css";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";

// Bellow Material UI Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Input } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import {
  AddLevel,
  deleteLevel,
  editLevel,
  GetAllLevels,
} from "../../../redux/LevelsReducer";
import LevelCreationModel from "../../../models/LevelCreationModel";

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

const Levels = () => {
  const dispatch = useDispatch();
  const [levelData, setLevelData] = useState(new LevelCreationModel());
  const [open, setOpen] = useState(false);
  const [openDeleter, setOpenDeleter] = useState(false);
  const [openEditer, setOpenEditer] = useState(false);
  const [levelToDelete, setLevelToDelete] = useState();
  const [leveltoEdit, setLevelToEdit] = useState()
  const allLevels = useSelector((state) => state.LevelsReducer.LevelInfo);
  const allStudents = useSelector((state) => state.StudentsAccountsHandler.studentsData)
  useEffect(() => {
    dispatch(GetAllLevels());
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenDeleter = () => {
    setOpenDeleter(true);
  };

  const handleClickOpenEditer = () => {
    setOpenEditer(true);
  };

  const selectionFunc = (event) => {
    let LevelChoice = event.target.options[event.target.selectedIndex].text;
    setLevelData({ ...levelData, leveltype: LevelChoice });
  };

  const selectionFuncDeleteLevel = (event) => {
    setLevelToDelete(event.target.options[event.target.selectedIndex].text);
  };

  const selectionFuncEditLevel = (event) => {
    setLevelToEdit(event.target.options[event.target.selectedIndex].text);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDeleter = () => {
    setOpenDeleter(false);
  };

  const handleCloseEditer = () => {
    setOpenEditer(false);
  };

  return (
    <>
      <div className="MainLevels">
        <div className="title">
          <h2> Levels List : Add, Modify or Remove a <strong>Level Grade</strong> From The System.</h2>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Add Level
          </DialogTitle>
          <DialogContent sx={{ fontSize: "18px" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Level Name
            </InputLabel>
            <Input
              sx={{ paddingLeft: "5px", fontSize: "18px" }}
              type="text"
              name="Level-name"
              placeholder="Ex: 1 Année Primaire"
              onChange={(e) => {
                setLevelData({
                  ...levelData,
                  levelname: e.currentTarget.value,
                });
              }}
            />
          </DialogContent>
          <Divider />
          <DialogContent sx={{ fontSize: "18px" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Level Code
            </InputLabel>
            <Input
              sx={{ paddingLeft: "5px", fontSize: "18px" }}
              type="text"
              name="Level-code"
              placeholder="Ex: CE1"
              onChange={(e) => {
                setLevelData({
                  ...levelData,
                  levelcode: e.currentTarget.value,
                });
              }}
            />
          </DialogContent>
          <Divider />
          <DialogContent sx={{ fontSize: "18px" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Level
            </InputLabel>
            <select
              className="inputs-adacnt"
              name="LevelType"
              id="LevelType"
              onChange={(event) => {
                selectionFunc(event);
              }}
            >
              <option value="">Choose From Below :</option>
              <option value="Primaire">Primaire</option>
              <option value="Collège">Collège</option>
              <option value="Lycèe">Lycèe</option>
            </select>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(AddLevel({ levelData: levelData }));
                handleClose();
              }}
            >
              Add Level
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Levels */}
        <Dialog
          open={openEditer}
          onClose={handleCloseEditer}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Edit Level
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ fontSize: "18px" }}>
            Level you wish to modify :
            <select
              className="inputs-adacnt"
              name="ClassroomAdd"
              id="ClassroomAdd"
              onChange={(event) => {
                selectionFuncEditLevel(event);
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
          </DialogContent>
          <DialogContent sx={{ fontSize: "18px" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Level Name
            </InputLabel>
            <Input
              sx={{ paddingLeft: "5px", fontSize: "18px" }}
              type="text"
              name="Level-name"
              placeholder="Ex: 1 Année Primaire"
              onChange={(e) => {
                e.currentTarget.value === ""
                  ? alert("Level Name can't be empty")
                  : setLevelData({
                      ...levelData,
                      levelname: e.currentTarget.value,
                    });
              }}
            />
          </DialogContent>
          <Divider />
          <DialogContent sx={{ fontSize: "18px" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Level Code
            </InputLabel>
            <Input
              sx={{ paddingLeft: "5px", fontSize: "18px" }}
              type="text"
              name="Level-code"
              placeholder="Ex: CE1"
              onChange={(e) => {
                e.currentTarget.value === ""
                  ? alert("Level Code can't be empty")
                  : setLevelData({
                      ...levelData,
                      levelcode: e.currentTarget.value,
                    });
              }}
            />
          </DialogContent>
          <Divider />
          <DialogContent sx={{ fontSize: "18px" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Level
            </InputLabel>
            <select
              className="inputs-adacnt"
              name="LevelType"
              id="LevelType"
              onChange={(event) => {
                selectionFunc(event);
              }}
            >
              <option value="">Choose From Below :</option>
              <option value="Primaire">Primaire</option>
              <option value="Collège">Collège</option>
              <option value="Lycèe">Lycèe</option>
            </select>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseEditer}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(
                  editLevel({
                    levelToEdit: leveltoEdit,
                    newLevelData: levelData,
                  })
                );
                handleCloseEditer();
              }}
            >
              Add Level
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Dialog */}

        <Dialog
          open={openDeleter}
          onClose={handleCloseDeleter}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Delete Level
          </DialogTitle>
          <DialogContent sx={{ fontSize: "18px" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Level 
            </InputLabel>
            <select
              className="inputs-adacnt"
              name="LevelType"
              id="LevelType"
              onChange={(event) => {
                selectionFuncDeleteLevel(event);
              }}
            >
              <option value="">Choose From Below :</option>
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
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseDeleter}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(deleteLevel({ deleteLevel: levelToDelete }));
                handleCloseDeleter();
              }}
            >
              Delete Level
            </Button>
          </DialogActions>
        </Dialog>

        <div className="buttons">
          <button onClick={handleClickOpen}>Add Level</button>
          <button onClick={handleClickOpenEditer}>Edit Level</button>
          <button onClick={handleClickOpenDeleter}>Delete Level</button>
        </div>
        <div className="MainTable">
          <Table width="100%" style={{ fontSize: "19px" }}>
            <thead>
              <tr>
                <th style={{backgroundColor:'rgba(255, 68, 0)'}}>#</th>
                <th style={{backgroundColor:'rgba(0, 128, 0, 0.6)'}}>Level Name</th>
                <th style={{backgroundColor:'rgba(0, 128, 0, 0.6)'}}>Level Type</th>
                <th style={{backgroundColor:'rgba(0, 128, 0, 0.6)'}}>Level Code</th>
                <th style={{backgroundColor:'rgba(0, 128, 0, 0.6)'}}>Student Numbers</th>
              </tr>
            </thead>
            <tbody>
              {allLevels.map((level, index) => (
                <tr key={index}>
                  <td style={{backgroundColor:'red'}}>{index + 1}</td>
                  <td style={{backgroundColor:'rgba(0, 128, 0, 0.6)'}}>{level.levelname}</td>
                  <td style={{backgroundColor:'rgba(0, 128, 0, 0.6)'}}>{level.leveltype}</td>
                  <td style={{backgroundColor:'rgba(0, 128, 0, 0.6)'}}>{level.levelcode}</td>
                  <td style={{backgroundColor:'rgba(0, 128, 0, 0.6)'}}>{}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Levels;