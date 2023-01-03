import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = 'http://localhost:2003'

export const AddStudent = createAsyncThunk('students/AddStudent', async({students_info}) => {
    return axios.post(`${API_URL}/AddStudent`, students_info)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const GetStudentsList = createAsyncThunk('students/GetStudentsList', async()=> {
    return axios.get(`${API_URL}/GetStudents`)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

const StudentsAccountsHandler = createSlice({
    name : 'studentsAccount',
    initialState : {
        studentsData: [],
        Status:'',
        Error:''
    },
    reducers : {},
    extraReducers: {
        [AddStudent.fulfilled] : (state) => {
            state.Status = 'Accepted'
        },
        [AddStudent.pending] : (state) => {
            state.Status = 'Pending'
        },
        [AddStudent.rejected] : (state) => {
            state.Error = 'Rejected'
        },
        [GetStudentsList.fulfilled] : (state, action) => {
            state.studentsData = action.payload
            console.log(state.studentsData)
            state.Status = 'Accepted'
        },
        [GetStudentsList.pending] : (state) => {
            state.Status = 'Pending'
        },
        [GetStudentsList.rejected] : (state, action) => {
            state.studentsData = action.payload
            state.Error = 'Rejected'
        },
    },
})


export default StudentsAccountsHandler.reducer