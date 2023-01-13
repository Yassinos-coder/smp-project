import React, { useState } from "react";
import "./Teachers.css";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";

const Teachers = () => {
  const allLevels = useSelector((state) => state.LevelsReducer.LevelInfo);
  const AllGroups = useSelector(
    (state) => state.ClassroomsReducer.ClassroomsInfo
  );
  const allTeacher = useSelector((state) => state.TeachersReducer.teacherData);
  const [CheckboxState, setCheckboxState] = useState(faSquare);

  return (
    <>
      <div className="TeachersMain">
        <div className="teachersHeader">
          <div className="Filters">
            <p className="p-filters">Filters :</p>
            <div className="search_by_name">
              <input
                type="text"
                name="search_by_name"
                id="search_by_name"
                placeholder="Filter By Name"
              />
            </div>
            <hr className="hr-teacher1" />
            <div className="filter_by_level">
              <select name="filter_by_level" id="filter_by_level">
                <option value="default">Filter by level</option>
                {allLevels.map((level, index) => (
                  <option
                    style={{ cursor: "pointer" }}
                    key={index}
                    value={level.levelcode}
                  >
                    {level.levelcode}
                  </option>
                ))}
              </select>
            </div>
            <hr className="hr-teacher2" />

            <div className="filter_by_classroom">
              <select name="filter_by_classroom" id="filter_by_classroom">
                <option value="default">Filter by classroom</option>
                {AllGroups.map((group, index) => (
                  <option
                    style={{ cursor: "pointer" }}
                    key={index}
                    value={group.code}
                  >
                    {group.code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="data-table-2">
          <Table striped bordered hover width="100%">
            <thead className="thead-teachers">
              <tr>
                <th>
                  {" "}
                  <FontAwesomeIcon icon={CheckboxState} />
                </th>
                <th style={{ backgroundColor: "rgba(255, 68, 0)" }}>#</th>
                <th>Full Name</th>
                <th>Date Of Birth</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>More Details</th>
              </tr>
            </thead>
            <tbody className="tbody-teachers">
              {allTeacher.map((teacher, index) => (
                <tr>
                  <td>
                    <FontAwesomeIcon
                      style={{ paddingLeft: "5px" }}
                      icon={CheckboxState}
                    />
                  </td>
                  <td  style={{backgroundColor:'rgba(255, 68, 0)'}} key={index}> {index + 1} </td>
                  <td>{teacher.firstname} {teacher.lastname}</td>
                  <td> {teacher.dob} </td>
                  <td> {teacher.address} </td>
                  <td> {teacher.phonenumber} </td>
                  <td> {teacher.email} </td>
                  <td>More Details</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Teachers;
