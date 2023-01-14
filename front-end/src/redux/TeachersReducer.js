import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:2003";

export const getTeachers = createAsyncThunk(
  "teachers/getTeachers",
  async () => {
    return axios
      .get(`${API_URL}/GetTeacher`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }
);

export const getTeachingLevel = createAsyncThunk(
  "teachers/getTeachingLevel",
  async ({ teacher_id }) => {
    return axios
      .get(`${API_URL}/LevelsOfTeaching/${teacher_id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }
);
export const getTeachingClass = createAsyncThunk(
  "teachers/getTeachingClass",
  async ({ teacher_id }) => {
    return axios
      .get(`${API_URL}/ClassroomsOfTeaching/${teacher_id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }
);

export const assignClass = createAsyncThunk(
  "teachers/assignClass",
  async ({ teacher_id, level, classroomGroup }) => {
    return axios
      .post(`${API_URL}/assignClass/${teacher_id}/${level}/${classroomGroup}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }
);

const TeacherReducer = createSlice({
  name: "TeacherHandler",
  initialState: {
    teacherData: [],
    TeacherClassData: [],
    TeacherLevelData: [],
    TeacherLevelDataUnfiltered: [],
    TeacherClassDataUnfiltered: [],
    Status: "",
    Pending: "",
  },
  reducers: {},
  extraReducers: {
    [getTeachers.fulfilled]: (state, action) => {
      state.teacherData = action.payload;
      state.teacherDataUnfiltered = action.payload;
      state.Status = "Accepted";
    },
    [getTeachers.pending]: (state, action) => {
      state.Status = "Pending";
    },
    [getTeachers.rejected]: (state, action) => {
      state.teacherData = action.payload;
      state.teacherDataUnfiltered = action.payload;
      state.Status = "Rejected";
    },
    [assignClass.fulfilled]: (state, action) => {
      state.TeacherClassData = action.payload;
      state.TeacherClassDataUnfiltered = action.payload;
      state.Status = "Accepted";
    },
    [assignClass.pending]: (state, action) => {
      state.Status = "Pending";
    },
    [assignClass.rejected]: (state, action) => {
      state.TeacherClassData = action.payload;
      state.TeacherClassDataUnfiltered = action.payload;
      state.Status = "Rejected";
    },
    [getTeachingClass.fulfilled]: (state, action) => {
      state.TeacherClassData = action.payload;
      state.TeacherClassDataUnfiltered = action.payload;
      state.Status = "Accepted";
    },
    [getTeachingClass.pending]: (state, action) => {
      state.Status = "Pending";
    },
    [getTeachingClass.rejected]: (state, action) => {
      state.TeacherClassData = action.payload;
      state.TeacherClassDataUnfiltered = action.payload;
      state.Status = "Rejected";
    },
    [getTeachingLevel.fulfilled]: (state, action) => {
      state.TeacherLevelData = action.payload;
      state.TeacherLevelDataUnfiltered = action.payload;
      state.Status = "Accepted";
    },
    [getTeachingLevel.pending]: (state, action) => {
      state.Status = "Pending";
    },
    [getTeachingLevel.rejected]: (state, action) => {
      state.TeacherLevelData = action.payload;
      state.TeacherLevelDataUnfiltered = action.payload;
      state.Status = "Rejected";
    },
  },
});

export default TeacherReducer.reducer;
