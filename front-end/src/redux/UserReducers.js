import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = 'http://localhost:2003'

export const getAllUsersList = createAsyncThunk('account/getAllUsersList', async() => {
    return axios.get(`${API_URL}/GetAllUsersList`)
    .then((res) => {return res.data})
    .catch((err) => {console.log(err)})
})

export const newUserReducer = createAsyncThunk('accounts/newUserReducer', async (newUser) => {
    return axios.post(`${API_URL}/AddAccount`, newUser)
    .then((res) => {return res.data})
    .catch((err) =>{console.error(err.message)})
})

export const Signin = createAsyncThunk('accounts/Signin', async({credentials}) => {
    return axios.post(`${API_URL}/Signin`, credentials)
    .then((res) => {return res.data})
    .catch((err) =>{console.error(err.message)})
})

export const getUserID = createAsyncThunk('accounts/getUserID', async({username}) => {
    return axios.get(`${API_URL}/GetUserID/${username}`)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const GetUserData = createAsyncThunk('accounts/GetUserData', async({id})=> {
    return axios.get(`${API_URL}/GetUserData/${id}`)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const UpdateMail = createAsyncThunk('accounts/UpdateMail', async({id, newMail}) => {
    return axios.post(`${API_URL}/updateMail/${id}`, {newMail})
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const UpdatePassword = createAsyncThunk('accounts/UpdatePassword', async({id, newPassword}) => {
    return axios.post(`${API_URL}/updatePassword/${id}`, {newPassword})
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

export const profileAvatarUploader = createAsyncThunk('accounts/profileAvatarUploader', async({userID,image}) =>{
    return axios.post(`${API_URL}/avatarUploader/${userID}`, image)
    .then((res) => {return res.data})
    .catch((err) => {console.error(err)})
})

const newUserHandler = createSlice({
    name: 'userDataHandler',
    initialState : {
        isloginCorrect: false,
        allUsersList: [],
        userInfo: [],
        Status:'',
        Error:'',
        EmailUpdated:'',
        UpdatePassword: '',
    },
    reducers:{
    },
    extraReducers: {
        [getAllUsersList.fulfilled]: (state,action) => {
            state.allUsersList = action.payload
            state.Status = 'Accepted'
        },
        [getAllUsersList.pending]: (state) => {
            state.Status = 'Pending'
        },
        [getAllUsersList.rejected]: (state, action) => {
            state.allUsersList = action.payload
            state.Error = 'Rejected'
        },
        [newUserReducer.fulfilled]: (state) => {
            state.Status = 'Accepted'
        },
        [newUserReducer.pending]: (state) => {
            state.Status = 'Pending'
        },
        [newUserReducer.rejected]: (state) => {
            state.Error = 'Rejected'
        },
        [GetUserData.fulfilled]: (state,action) => {
            state.userInfo = action.payload
            state.Status = 'Accepted'
        },
        [GetUserData.pending]: (state) => {
            state.Status = 'Pending'
        },
        [GetUserData.rejected]: (state, action) => {
            state.userInfo = action.payload
            state.Error = 'Rejected'
        },
        [Signin.fulfilled]: (state, action) => {
            state.isloginCorrect = action.payload
            state.Status = 'Accepted'
        },
        [Signin.pending]: (state) => {
            state.Status = 'Pending'
        },
        [Signin.rejected]: (state, action) => {
            state.isloginCorrect = action.payload
            state.Error = 'Rejected'
        },
        [getUserID.fulfilled]: (state, action) => {
            localStorage.setItem('userID', action.payload._id)
            state.Status = 'Accepted'
        },
        [getUserID.pending]: (state) => {
            state.Status = 'Pending'
        },
        [getUserID.rejected]: (state) => {
            state.Error = 'Rejected'
        },
        [UpdateMail.fulfilled]: (state, action) => {
            state.EmailUpdated = action.payload
            state.Status = 'Accepted'
        },
        [UpdateMail.pending]: (state) => {
            state.Status = 'Pending'
        },
        [UpdateMail.rejected]: (state, action) => {
            state.EmailUpdated = action.payload
            state.Error = 'Rejected'
        },
        [UpdatePassword.fulfilled]: (state, action) => {
            state.UpdatePassword = action.payload
            state.Status = 'Accepted'
        },
        [UpdatePassword.pending]: (state) => {
            state.Status = 'Pending'
        },
        [UpdatePassword.rejected]: (state, action) => {
            state.UpdatePassword = action.payload
            state.Error = 'Rejected'
        },
    }
})

export default newUserHandler.reducer
