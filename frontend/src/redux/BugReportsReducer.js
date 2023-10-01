import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = 'http://localhost:2003/'



export const reportBug = createAsyncThunk('System/reportBug', async(bug_data) => {
    return axios.post(`${API_URL}reportBug`, bug_data)
    .then((res) => {return res.data})
    .catch((err) =>{console.error(err.message)})
})



const BugReportsReducer = createSlice({
    name: 'BugReportsHandler',
    initialState : {
        isloginCorrect: false,
        userInfo: [],
        Status:'',
        Error:''
    },
    reducers:{
    },
    extraReducers: {
        [reportBug.fulfilled] : (state) => {
            state.Status = 'Accepted'
        },
        [reportBug.pending] : (state) => {
            state.Status = 'Pending'
        },
        [reportBug.rejected] : (state) => {
            state.Status = 'Rejected'
        }
    }
})

export default BugReportsReducer.reducer
