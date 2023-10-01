import {  createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = 'http://localhost:2003'

export const getTasks = createAsyncThunk('tasks/getTasks', async({userid}) => {
    return axios.get(`${API_URL}/getTasks/${userid}`)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const AddTask = createAsyncThunk('tasks/AddTask', async({taskData}) => {
    return axios.post(`${API_URL}/AddTask`, taskData)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async({userid, taskid}) => {
    return axios.post(`${API_URL}/deleteTask/${userid}/${taskid}`)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const modifyTask = createAsyncThunk('tasks/modifyTask', async({userID, taskID, updatedTask}) => {
    return axios.post(`${API_URL}/modifyTask/${userID}/${taskID}`, {updatedTask})
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

const TaskReduder = createSlice({
    name: 'TasksHandlereducer',
    initialState : {
        task: [],
        Status:'',
        Error:'',
    },
    reducers: {},
    extraReducers:{
        [getTasks.fulfilled] : (state, action) => {
            state.task = action.payload
            state.Status = 'Accepted'
        },
        [getTasks.pending] : (state) => {
            state.Status = 'Pending'
        },
        [getTasks.rejected] : (state, action) => {
            state.task = action.payload
            state.Status = 'Rejected'
        },
        [AddTask.fulfilled] : (state, action) => {
            state.task = action.payload
            state.Status = 'Accepted'
        },
        [AddTask.pending] : (state) => {
            state.Status = 'Pending'
        },
        [AddTask.rejected] : (state, action) => {
            state.task = action.payload
            state.Status = 'Rejected'
        },
        [deleteTask.fulfilled] : (state, action) => {
            state.task = action.payload
            state.Status = 'Accepted'
        },
        [deleteTask.pending] : (state) => {
            state.Status = 'Pending'
        },
        [deleteTask.rejected] : (state, action) => {
            state.task = action.payload
            state.Status = 'Rejected'
        },
        [modifyTask.fulfilled] : (state, action) => {
            state.task = action.payload
            state.Status = 'Accepted'
        },
        [modifyTask.pending] : (state) => {
            state.Status = 'Pending'
        },
        [modifyTask.rejected] : (state, action) => {
            state.task = action.payload
            state.Status = 'Rejected'
        },
    },
})


export default TaskReduder.reducer