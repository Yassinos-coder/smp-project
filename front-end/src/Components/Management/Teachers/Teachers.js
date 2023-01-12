import React from "react";
import "./Teachers.css";
import { useSelector } from "react-redux";

const Teachers = () => {
  const allLevels = useSelector((state) => state.LevelsReducer.LevelInfo);
  const AllGroups = useSelector(
    (state) => state.ClassroomsReducer.ClassroomsInfo
  );
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
            <hr  className="hr-teacher1"/>
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
            <hr  className="hr-teacher2"/>

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
      </div>
    </>
  );
};

export default Teachers;
