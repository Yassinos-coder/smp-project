import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const TopBar = () => {
    const userID = localStorage.userID;

  return (
    <>
        {/* Header */}
        <header className="homepage-header">
          <div className="navBar">
            <div className="homepage-title">
              <p>School Managment Platform</p>
            </div>
            <div className="navBar-btn">
              <div className="ul-div-home">
                <ul className="ul">
                  <li>
                    <Link to="/">
                      <button>Home</button>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/${userID}/Dashboard`}>
                      <button>Your Dashboard</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/BugReport">
                      <button>Bug Report</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <button>About</button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

    </>
  )
}

export default TopBar