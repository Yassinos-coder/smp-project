import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import PrivateRoutes from "./PrivateRoutes";
import BugReport from "./Components/BugReport/BugReport";
import Management from "./Components/Management/Management";
import HomeDashboard from "./Components/Management/HomeDashboard/HomeDashboard";
import Students from "./Components/Management/Students/Students";
import Classrooms from "./Components/Management/Classroom/Classrooms";
import Notifiyer from "./Components/Management/Notifiyer/Notifiyer";
import GraphData from "./Components/Management/GraphData/GraphData";
import Teachers from "./Components/Management/Teachers/Teachers";
import MyAccount from "./Components/Management/MyAccount/MyAccount";
import AddAccount from "./Components/Management/AddAccount/AddAccount";
import { useDispatch, useSelector } from "react-redux";
import Levels from "./Components/Management/Levels/Levels";
import { useEffect } from "react";
import { GetAllLevels } from "./redux/LevelsReducer";
import { GetClassroomGroups } from "./redux/ClassroomsReducer";
import { GetStudentsList } from "./redux/StudentsAccountsReducer";
//
import { GetUserData } from "./redux/UserReducers";
import StudentsDetails from "./Components/Management/Students/StudentsDetails";
import { getTeachers } from "./redux/TeachersReducer";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.newUserReducer.userInfo.role);


  useEffect(() => {
    if (localStorage.userID) {
      dispatch(GetUserData({ id: localStorage.userID }));
    }
    dispatch(GetAllLevels());
    dispatch(GetClassroomGroups());
    dispatch(GetStudentsList());
    dispatch(getTeachers())

  },[]);

  return (
    <>
      <div className="app">
        
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/BugReport" element={<BugReport />} />
            <Route element={<PrivateRoutes />}>
              {role === "Student" && (
                <Route path="/:userID/Dashboard" element={<Management />}>
                  <Route index element={<HomeDashboard />} />
                  {/* <Route path="AddAccount" element={<AddAccount />} /> */}
                  <Route path="Students" element={<Students />} />
                  {/* <Route path="Classrooms" element={<Classrooms />} /> */}
                  {/* <Route path="Teachers" element={<Teachers />} /> */}
                  {/* <Route path="Notifiyer" element={<Notifiyer />} /> */}
                  {/* <Route path="GraphData" element={<GraphData />} /> */}
                  <Route path="MyAccount" element={<MyAccount />} />
                </Route>
              )}
              {role === "Teacher" && (
                <Route path="/:userID/Dashboard" element={<Management />}>
                  <Route index element={<HomeDashboard />} />
                  {/* <Route path="AddAccount" element={<AddAccount />} /> */}
                  <Route path="Students" element={<Students />} />
                  <Route path="Classrooms" element={<Classrooms />} />
                  <Route path="Levels" element={<Levels />} />
                  <Route path="Teachers" element={<Teachers />} />
                  {/* <Route path="Notifiyer" element={<Notifiyer />} /> */}
                  {/* <Route path="GraphData" element={<GraphData />} /> */}
                  <Route path="MyAccount" element={<MyAccount />} />
                </Route>
              )}
              {role === "Staff" && (
                <Route path="/:userID/Dashboard" element={<Management />}>
                  <Route index element={<HomeDashboard />} />
                  <Route path="AddAccount" element={<AddAccount />} />
                  <Route path="Students" element={<Students />} />
                  <Route path="Classrooms" element={<Classrooms />} />
                  <Route path="Levels" element={<Levels />} />
                  <Route path="Teachers" element={<Teachers />} />
                  <Route path="Notifiyer" element={<Notifiyer />} />
                  <Route path="GraphData" element={<GraphData />} />
                  <Route path="MyAccount" element={<MyAccount />} />
                </Route>
              )}
              {role === "Owner" && (
                <Route path="/:userID/Dashboard" element={<Management />}>
                  <Route index element={<HomeDashboard />} />
                  <Route path="AddAccount" element={<AddAccount />} />
                  <Route path="Students" element={<Students />} >
                    <Route path="StudentDetails/:student_id" element={<StudentsDetails/>}/>
                  </Route>
                  <Route path="Classrooms" element={<Classrooms />} />
                  <Route path="Levels" element={<Levels />} />
                  <Route path="Teachers" element={<Teachers />} />
                  <Route path="Notifiyer" element={<Notifiyer />} />
                  <Route path="GraphData" element={<GraphData />} />
                  <Route path="MyAccount" element={<MyAccount />} />
                </Route>
              )}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
