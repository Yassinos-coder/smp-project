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

export const DeleteStudent = createAsyncThunk('students/DeleteStudent', async({student_id}) => {
    return axios.post(`${API_URL}/DeleteStudent/${student_id}`)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const uploadStudentImage = createAsyncThunk('students/uploadStudentImage', async({studentid,image})=> {
    return axios.post(`${API_URL}/profilePictureUpload/${studentid}`, image)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

const StudentsAccountsHandler = createSlice({
    name : 'studentsAccount',
    initialState : {
        studentsData: [],
        unfilteredList:[],
        Status:'',
        Error:''
    },
    reducers : {
        filterBylevel : (state, action) => {
            if (action.payload === 'Filter By Level') {
                state.studentsData = state.unfilteredList 
            } else {
                let filteredList = [...state.studentsData.filter((student) => 
                    student.level === action.payload
                )] 
                state.studentsData = filteredList
            }
        },
        filterBygroup : (state, action) => {
            if (action.payload ==='Filter By Classroom Group') {
                state.studentsData = state.unfilteredList 
            } else {
                let filteredList = [...state.studentsData.filter((student) => 
                    student.classroom_group === action.payload
                )] 
    
                state.studentsData = filteredList
            }
        },
        filterByname : (state, action) => {
            if (action.payload ==='') {
                state.studentsData = state.unfilteredList 
            } else {
                let filteredList = [...state.studentsData.filter((student) => 
                    student.firstname.includes(action.payload) ||
                    student.lastname.includes(action.payload)

                )]     
                state.studentsData = filteredList    
            } 
        },

    },
    extraReducers: {
        [AddStudent.fulfilled] : (state, action) => {
            state.studentsData = [...state.studentsData, action.payload]
            state.unfilteredList = [...state.unfilteredList, action.payload]
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
            state.unfilteredList = action.payload
            state.Status = 'Accepted'
        },
        [GetStudentsList.pending] : (state) => {
            state.Status = 'Pending'
        },
        [GetStudentsList.rejected] : (state, action) => {
            state.studentsData = action.payload
            state.Error = 'Rejected'
        },
        [DeleteStudent.fulfilled] : (state, action) => {
            state.unfilteredList = action.payload
            state.studentsData = action.payload
            state.Status = 'Accepted'
        },
        [DeleteStudent.pending] : (state) => {
            state.Status = 'Pending'
        },
        [DeleteStudent.rejected] : (state, action) => {
            state.studentsData = action.payload
            state.Error = 'Rejected'
        },
    },
})


export default StudentsAccountsHandler.reducer
export const {filterBylevel, filterBygroup, filterByname} = StudentsAccountsHandler.actions
