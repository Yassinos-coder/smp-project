import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = 'http://localhost:2003'

export const getNotify = createAsyncThunk('notif/getNotify', async({username}) => {
    return axios.get(`${API_URL}/GetNotif/${username}`)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const sendNotif = createAsyncThunk('notif/sendNotif', async(newNotif) => {
    return axios.post(`${API_URL}/SendNotif`, newNotif)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})


export const deleteAllNotif = createAsyncThunk('notif/deleteAllNotif', async({username}) => {
    return axios.post(`${API_URL}/deleteAllNotif/${username}`)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const markRead = createAsyncThunk('notif/markRead', async({username, notifid, readUpdate}) => {
    return axios.post(`${API_URL}/markRead/${username}/${notifid}`, {readUpdate})
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})



const NotificationsHandler = createSlice({
    name: 'NotificationsHandlerReducer',
    initialState: {
        AllNotif : [],
        Status : '', 
        Error :''
    },
    reducers: {},
    extraReducers: {
        [getNotify.fulfilled] : (state, action) => {
            state.AllNotif = action.payload
            state.Status = 'Accepted'
        },
        [getNotify.pending] : (state) => {
            state.Status = 'Pending'
        },
        [getNotify.rejected] : (state, action) => {
            state.AllNotif = action.payload
            state.Status = 'Rejected'
        },
        [sendNotif.fulfilled] : (state, action) => {
            state.AllNotif = [...state.AllNotif, action.payload]
            state.Status = 'Accepted'
        },
        [sendNotif.pending] : (state) => {
            state.Status = 'Pending'
        },
        [sendNotif.rejected] : (state, action) => {
            state.AllNotif = action.payload
            state.Status = 'Rejected'
        },
        [deleteAllNotif.fulfilled] : (state, action) => {
            state.AllNotif = action.payload
            state.Status = 'Accepted'
        },
        [deleteAllNotif.pending] : (state) => {
            state.Status = 'Pending'
        },
        [deleteAllNotif.rejected] : (state, action) => {
            state.AllNotif = action.payload
            state.Status = 'Rejected'
        },
        [markRead.fulfilled] : (state, action) => {
            state.AllNotif = action.payload
            state.Status = 'Accepted'
        },
        [markRead.pending] : (state) => {
            state.Status = 'Pending'
        },
        [markRead.rejected] : (state, action) => {
            state.AllNotif = action.payload
            state.Status = 'Rejected'
        },
    }
})

export default NotificationsHandler.reducer