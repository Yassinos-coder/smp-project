import {  createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = 'http://localhost:2003'

export const getAllNotifRole = createAsyncThunk('notif/getAllNotifRole', async({role})=> {
    return axios.get(`${API_URL}/getRoleNotif/${role}`)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const sendNotifByRole = createAsyncThunk('notif/sendNotifByRole', async(newNotifRole) => {
    console.log(newNotifRole)
    return axios.post(`${API_URL}/sendNotifRole`, newNotifRole)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const markReadRole = createAsyncThunk('notif/markReadByRole', async({notifid, role}) => {
    return axios.post(`${API_URL}/markReadByRole/${role}/${notifid}`)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const deleteAllRoleNotif = createAsyncThunk('notif/deleteAllRoleNotif', async({role}) => {
    return axios.post(`${API_URL}/deleteAllRoleNotif/${role}`)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

const NotifByRole = createSlice({
    name:'NotifByRoleHandler', 
    initialState: {
        allNotif: [], 
        Status:'',
        Error:'',
    },
    reducers:{},
    extraReducers: {
        [getAllNotifRole.fulfilled]: (state, action) =>{
            state.allNotif= action.payload
            state.Status = 'Accepted'
        },
        [getAllNotifRole.pending]: (state, action) =>{
            state.Status = 'Pending'
        },
        [getAllNotifRole.rejected]: (state, action) =>{
            state.allNotif= action.payload
            state.Status = 'Rejected'
        },
        [sendNotifByRole.fulfilled]: (state, action) =>{
            state.allNotif= action.payload
            state.Status = 'Accepted'
        },
        [sendNotifByRole.pending]: (state, action) =>{
            state.Status = 'Pending'
        },
        [sendNotifByRole.rejected]: (state, action) =>{
            state.allNotif= action.payload
            state.Status = 'Rejected'
        },
        [markReadRole.fulfilled]: (state, action) =>{
            state.allNotif= action.payload
            state.Status = 'Accepted'
        },
        [markReadRole.pending]: (state, action) =>{
            state.Status = 'Pending'
        },
        [markReadRole.rejected]: (state, action) =>{
            state.allNotif= action.payload
            state.Status = 'Rejected'
        },
        [deleteAllRoleNotif.fulfilled]: (state, action) =>{
            state.allNotif= action.payload
            state.Status = 'Accepted'
        },
        [deleteAllRoleNotif.pending]: (state, action) =>{
            state.Status = 'Pending'
        },
        [deleteAllRoleNotif.rejected]: (state, action) =>{
            state.allNotif= action.payload
            state.Status = 'Rejected'
        },
    }
})


export default NotifByRole.reducer