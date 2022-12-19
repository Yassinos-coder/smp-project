import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const AddStudent = createAsyncThunk('students/AddStudent', async({students_info}) => {
    return axios.post('http://localhost:2003/AddStudent', students_info)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const GetStudentsList = createAsyncThunk('students/GetStudentsList', async()=> {
    return axios.get('http://localhost:2003/GetStudents')
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

const StudentsAccountsHandler = createSlice({
    name : 'studentsAccount',
    initialState : {
        studentsData: [],
        Status:'',
        Error:','
    },
    reducers : {},
    extraReducers: {
        [AddStudent.fulfilled] : (state, action) => {
            state.studentsData = action.payload
            state.Status = 'Accepted'
        },
        [AddStudent.pending] : (state, action) => {
            state.Status = 'Pending'
        },
        [AddStudent.rejected] : (state, action) => {
            state.Error = 'Rejected'
        },
        [GetStudentsList.fulfilled] : (state, action) => {
            state.studentsData = action.payload
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