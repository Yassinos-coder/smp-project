import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = 'http://localhost:2003'

export const GetAllLevels = createAsyncThunk('levels/GetAllLevels', async() => {
    return axios.get(`${API_URL}/GetLevels`)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})


export const AddLevel = createAsyncThunk('levels/AddLevel', async({levelData}) => {
    return axios.post(`${API_URL}/AddLevel`, levelData)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const deleteLevel = createAsyncThunk('levels/deleteLevel', async({deleteLevel}) => {
    return axios.post(`${API_URL}/DeleteLevel/${deleteLevel}`)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const editLevel = createAsyncThunk('levels/editLevel', async({levelToEdit, newLevelData}) => {
    return axios.post(`${API_URL}/EditLevel/${levelToEdit}`, newLevelData)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

const LevelsHandlerReducer = createSlice({
    name: 'LevelsHandler',
    initialState : {
        LevelInfo:[],
        iSAddedLevel:'',
        Status: '',
        Error: '',
    }, 
    reducers: {},  
    extraReducers: {
        [GetAllLevels.fulfilled] : (state, action) => {
            state.LevelInfo = action.payload
            state.Status = 'Accepted'
        },
        [GetAllLevels.pending] : (state) => {
            state.Status = 'Pending'
        },
        [GetAllLevels.rejected] : (state, action) => {
            state.LevelInfo = action.payload
            state.Status = 'Rejected'
        },
        [AddLevel.fulfilled] : (state, action) => {
            state.iSAddedLevel = action.payload
            state.Status = 'Accepted'
        },
        [AddLevel.pending] : (state) => {
            state.Status = 'Pending'
        },
        [AddLevel.rejected] : (state, action) => {
            state.iSAddedLevel = action.payload
            state.Status = 'Rejected'
        },
        [deleteLevel.fulfilled] : (state, action) => {
            state.LevelInfo = action.payload
            state.Status = 'Accepted'
        },
        [deleteLevel.pending] : (state) => {
            state.Status = 'Pending'
        },
        [deleteLevel.rejected] : (state, action) => {
            state.LevelInfo = action.payload
            state.Status = 'Rejected'
        }
    }
})

export default LevelsHandlerReducer.reducer