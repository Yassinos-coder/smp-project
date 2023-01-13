import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = 'http://localhost:2003'

export const getTeachers = createAsyncThunk('teachers/getTeachers', async() => {
    return axios.get(`${API_URL}/GetTeacher`)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})


const TeacherReducer = createSlice({
    name:'TeacherHandler',
    initialState: {
        teacherData : [],
        moreTeacherData :[],
        teacherDataUnfiltered :[],
        Status:'',
        Pending:'',
    },
    reducers:{},
    extraReducers:{
        [getTeachers.fulfilled] : (state, action ) => {
            state.teacherData = action.payload
            state.teacherDataUnfiltered = action.payload
            state.Status = 'Accepted'
        },
        [getTeachers.pending] : (state, action ) => {
            state.Status = 'Pending'
        },
        [getTeachers.rejected] : (state, action ) => {
            state.teacherData = action.payload
            state.teacherDataUnfiltered = action.payload
            state.Status = 'Rejected'
        },
    },
})

export default TeacherReducer.reducer