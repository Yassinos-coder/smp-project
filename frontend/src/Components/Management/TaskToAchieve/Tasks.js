import React, { useState } from "react";
import TasksModel from "../../../models/TasksModel";
import "./Tasks.css";
import { useDispatch, useSelector } from "react-redux";
import { AddTask, deleteTask, modifyTask } from "../../../redux/tasksReducer";
import "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Tasks = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState(new TasksModel());
  const userID = localStorage.userID;
  const Tasks = useSelector((state) => state.TaskReduder.task);
  const [TaskIDonUpdate, setTaskIDonUpdate] = useState()
  let updatedTask;
  //
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    dispatch(modifyTask({userID: userID, taskID:TaskIDonUpdate, updatedTask: updatedTask}))
    setOpen(false)
  }

  const selectionFunc = (event) => {
    let TaskIDonUpdate = event.target.options[event.target.selectedIndex].value;
    setTaskIDonUpdate(TaskIDonUpdate);
  };

  return (
    <>
      <div className="Container">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Update Task</DialogTitle>
          <DialogContent>
            <select style={{width:'90%'}} className="inputs-adacnt" name="task" id="task" onChange={(event) => {selectionFunc(event)}}>
            <option value="empty">Choose task from list</option>
              {
                Tasks.map((task, index) => (
                  <option key={index} value={task._id}>{task.task}</option>
                ))
              }
            </select>
          </DialogContent>
          <DialogContent>
            <DialogContentText>
              Write your new task.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="New Task"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {updatedTask= e.currentTarget.value}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogActions>
        </Dialog>

        <div className="header">
          <div className="addtodo">
            <input
              type="text"
              name="addtodo-bar"
              placeholder="Type in to add"
              onChange={(e) => {
                setNewTask({
                  ...newTask,
                  userid: userID,
                  task: e.currentTarget.value,
                });
              }}
            />
          </div>
          <div className="addbtn">
            <button
              type="submit"
              name="addtodo"
              onClick={() => {
                dispatch(AddTask({ taskData: newTask }));
              }}
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="tasks">
          {Tasks.map((task, index) => (
            <div key={index} className="task">
              <ul>
                <li>
                  <p style={{ paddingLeft: "2%" }}> {task.task} </p>
                  <div className="actions">
                    <FontAwesomeIcon
                      className="faTasks faUpdateTask"
                      icon={faPenToSquare}
                      onClick={handleClickOpen}
                    />
                    <FontAwesomeIcon
                      className="faTasks"
                      onClick={() => {
                        dispatch(
                          deleteTask({ userid: userID, taskid: task._id })
                        );
                      }}
                      icon={faTrash}
                    />
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tasks;
