import React, { useEffect } from 'react'
import './Dashboard.css'
import '@fortawesome/fontawesome-svg-core'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Management = () => {
  const role_from_redux = useSelector((state) => state.newUserReducer.userInfo.role)

  useEffect(() => {
    const role_from_ls = localStorage.role_name 
    if (role_from_redux === localStorage.role_name) {
      localStorage.role_name = role_from_ls
    } else {
      localStorage.role_name = role_from_redux

    }
  })

  return (
    <>
        <div className="MainDash">
            {/* Left Vertical Menu */}
                <SideBar/>
            {/* Now Middile Main Data */}
            <div className="middle-main">
                 <Outlet/> 
            </div>
        </div>
    </>
  )
}

export default Management