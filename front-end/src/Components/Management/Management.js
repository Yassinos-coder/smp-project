import React from 'react'
import './Dashboard.css'
import '@fortawesome/fontawesome-svg-core'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'


const Management = () => {
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