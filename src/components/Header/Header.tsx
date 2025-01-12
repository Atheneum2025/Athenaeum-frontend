import header from "./Header.module.css";
import { useUserContext } from "../../context/UserContext.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../SearchComponent/SearchBar.tsx";




export default function Header() {

  // const { isLoggedIn, login, logout } = useUserContext();

  

  return (

    <>
      <header className={header.navigation_header}>
        <div className={header.logo} id="menu">
          <img src="e3de8db1-a6da-45b8-8547-008b5effa859 1@2x.png" alt="" />
          {/* logo */}
        </div>
        <div className={header.middle_navigation}>
          <nav className={header.navigation_bar}>
            <ul className={header.ul_lists}>
              <li>
                <a href="/landing">Home</a>
              </li>
              <li>
                <a href="/">Landing</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
              <li>
                <a href="/course">Course</a>
              </li>
            </ul>
          </nav>
          <SearchBar/>
        </div>
        <div className={header.auth_btn}>

          {/* {!isLoggedIn ? (
              <a href="/login" style={{ marginRight: "1rem" }}>
                Login
              </a>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )} */}
          {/* {!isLoggedIn && (
              <button className={header.btn} onClick={login} >Login</button>
            )}
            {isLoggedIn && (
              <button className={header.btn} onClick={logout}>Logout</button>
            )} */}
          <button className={header.btn}>Signup</button>

        </div>
        {/* <div className="auth">
          <a href="/student-dashboard">
            <img src="User.png" alt="" />
          </a>
        </div> */}
      </header>

    </>
  )


}
