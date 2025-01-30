import header from "./Header.module.css";
import '../../../public/globals.css';
import AuthContext from "../../context/AuthContext.tsx";
import { getAuthenticatedUser } from "../../utils/authUtils.ts";
import { useContext, useState } from "react";
import SearchBar from "../SearchComponent/SearchBar.tsx";

// type User = {
//   user: string;
// }
export default function Header() {

  const {logout} = useContext(AuthContext);
  const {user, isAuthenticated} = getAuthenticatedUser();
  // const { isAuthenticated, logout } = useContext(AuthContext);
  // console.log(isAuthenticated);
  // const authToken = localStorage.getItem("authToken");
  // let parsedToken
  // authToken ? parsedToken = JSON.parse(authToken) : parsedToken = null;
  // const user = parsedToken?.user;
  // console.log(user?.username);

  const [sidebarIsVisible, setSidebarIsVisible] = useState<boolean>(false);
  const [profileOptionsVisible, setProfileOptionsVisible] = useState<boolean>(false);
  return (

    <>
      <header className={header.navigation_header}>
        <div className={header.logo}>
          <img src="e3de8db1-a6da-45b8-8547-008b5effa859 1@2x.png" alt="" />
          {/* logo */}
        </div>
        <div className={header.middle_navigation}>

          {/* <nav className={(header.navigation_bar)} > */}
          <nav className={header.navigation_bar}  >

            <ul className={header.ul_lists}>
              <li>
                <a href="/home">Home</a>
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
          <nav className={sidebarIsVisible ? (header.navigation_bar_sidebar) : (header.hidden)}  >

            <ul className={header.ul_lists}>
              <li>
                <a href="/home">Home</a>
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

          <SearchBar />
        </div>
        <div className={header.auth_btn}>



          <div className={header.profile_avatar} onClick={() => setProfileOptionsVisible(!profileOptionsVisible)}>P</div>
          {profileOptionsVisible &&
            <div className={header.profile_avatar_options}>
              <div>Hello {user?.role}</div>
              <div>
                <a href="/profile">My Profile</a>
              </div>
              <div>
                <a href="/settings">Settings</a>
              </div>
              {!isAuthenticated ? (
                <div>
                  <button><a href="/login">LOGIN</a></button>
                </div>
              ) : (
                <>
                  <div>
                    <button onClick={logout}><a href="/login">LOGOUT</a></button>
                  </div>
                  <div>
                    <button><a href="/notifications">Notifications</a></button>
                  </div>
                </>

              )}
            </div>
          }
        </div>
        {/* <div className="auth">
          <a href="/student-dashboard">
            <img src="User.png" alt="" />
          </a>
        </div> */}
        <div id="menu" className={header.menu} onClick={() => setSidebarIsVisible(!sidebarIsVisible)}>Menu</div>
      </header>

    </>
  )


}
