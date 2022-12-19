import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const GetClassroomGroups = createAsyncThunk('classrooms/GetClassroomGroups', async() => {
    return axios.get('http://localhost:2003/GetClassrooms')
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const AddClassroomGroup = createAsyncThunk('classrooms/AddClassroomGroup', async({newClass}) => {
    return axios.post('http://localhost:2003/AddClassroom', newClass)
    .then((res) => {return res.data})
    .chatch((err) => {console.error(err)})
})

export const deleteClassroom = createAsyncThunk('classrooms/deleteClassroom', async({classroomcode, levelcode}) => {
    console.log(classroomcode, levelcode)
    return axios.post(`http://localhost:2003/DeleteClassroom/${classroomcode}/${levelcode}`)
    .then((res) => {return res.data})
    .catch((err) => console.error(err))
}) 

export const updateClassroom = createAsyncThunk('classrooms/updateClassroom', async({classroomcode, levelcode, updatedClassroom}) => {
    return axios.post(`http://localhost:2003/EditClassroom/${classroomcode}/${levelcode}`, updatedClassroom)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

const ClassroomsHandlerReducer = createSlice({
    name: 'ClassroomsHandler',
    initialState : {
        ClassroomsInfo:[],
        iSAddedLevel:'',
        Status: '',
        Error: '',
    }, 
    reducers: {},  
    extraReducers: {
        [GetClassroomGroups.fulfilled] : (state, action) => {
            state.ClassroomsInfo = action.payload
            state.Status = "Accepted"
        },
        [GetClassroomGroups.pending] : (state) => {
            state.Status = "Pending"
        },
        [GetClassroomGroups.rejected] : (state, action) => {
            state.ClassroomsInfo = action.payload
            state.Status = "Rejected"
        },
        [deleteClassroom.fulfilled] : (state, action) => {
            state.ClassroomsInfo = action.payload
            state.Status = "Accepted"
        },
        [deleteClassroom.pending] : (state) => {
            state.Status = "Pending"
        },
        [deleteClassroom.rejected] : (state, action) => {
            state.ClassroomsInfo = action.payload
            state.Status = "Rejected"
        },
        [updateClassroom.fulfilled] : (state, action) => {
            state.ClassroomsInfo = action.payload
            state.Status = "Accepted"
        },
        [updateClassroom.pending] : (state) => {
            state.Status = "Pending"
        },
        [updateClassroom.rejected] : (state, action) => {
            state.ClassroomsInfo = action.payload
            state.Status = "Rejected"
        },
    }
})

export default ClassroomsHandlerReducer.reducer