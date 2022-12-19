import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const reportBug = createAsyncThunk('System/reportBug', async(bug_data) => {
    return axios.post('http://localhost:2003/reportBug', bug_data)
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
