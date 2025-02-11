import header from "./Header.module.css";
import '../../../public/globals.css';
import AuthContext from "../../context/AuthContext.tsx";
import { getAuthenticatedUser } from "../../utils/authUtils.ts";
import { useContext, useRef, useState } from "react";
import SearchBar from "../SearchComponent/SearchBar.tsx";
import { Link } from "react-router-dom";

// type User = {
//   user: string;
// }
export default function Header() {

  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = getAuthenticatedUser();
  // const { isAuthenticated, logout } = useContext(AuthContext);
  // console.log(isAuthenticated);
  // const authToken = localStorage.getItem("authToken");
  // let parsedToken
  // authToken ? parsedToken = JSON.parse(authToken) : parsedToken = null;
  // const user = parsedToken?.user;
  // console.log(user?.username);

  const [sidebarIsVisible, setSidebarIsVisible] = useState<boolean>(false);
  const [profileOptionsVisible, setProfileOptionsVisible] = useState<boolean>(false);
  const profileButtonRef = useRef<HTMLDivElement>(null)

  // document.addEventListener("mousedown", (event: MouseEvent) => {
  //   if (profileButtonRef.current && !profileButtonRef.current.contains(event.target as Node)) {
  //     setProfileOptionsVisible(!profileOptionsVisible);
  //   }
  // })
  return (

    <>
      <header className={header.navigation_header} >
        <div className={header.logo}>
          <img src="e3de8db1-a6da-45b8-8547-008b5effa859 1@2x.png" alt="" />
          {/* logo */}
        </div>
        <div className={header.middle_navigation}>
          <nav className={header.navigation_bar}  >
            <ul className={header.ul_lists}>
              <li>
                <Link to={'/home'}>Home</Link>
              </li>
              <li>
                <Link to={'/'}>Landing</Link>
              </li>
              <li>
                <Link to={'/contact'}>Contact</Link>
              </li>
              <li>
                <Link to={'/register'}>Register</Link>
              </li>
              <li>
                <Link to={'/course'}>Course</Link>
              </li>
            </ul>
          </nav>
          <nav className={sidebarIsVisible ? (header.navigation_bar_sidebar) : (header.hidden)}  >
            <ul className={header.ul_lists}>
              <li>
                <Link to={'/home'}>Home</Link>
              </li>
              <li>
                <Link to={'/'}>Landing</Link>
              </li>
              <li>
                <Link to={'/contact'}>Contact</Link>
              </li>
              <li>
                <Link to={'/register'}>Register</Link>
              </li>
              <li>
                <Link to={'/course'}>Course</Link>
              </li>
            </ul>
          </nav>

          <SearchBar />
        </div>
        <div className={header.auth_btn}>
          {/* <div  className="profileSide"> */}

          {/* <div className={header.profile_avatar} onClick={() => setProfileOptionsVisible(!profileOptionsVisible)} ref={profileButtonRef}> */}
          <div className={header.profile_avatar} onClick={() => setProfileOptionsVisible(!profileOptionsVisible)} >
            <img src="User.png" alt="" />
          </div>
          {profileOptionsVisible &&
            <div className={header.profile_avatar_options} >
              <div>HELLO {user?.role.toUpperCase()}</div>
              <div>
                <Link to={'/profile'}>Profile</Link>
              </div>
              <div>
                <Link to={'/settings'}>Settings</Link>

              </div>
              {!isAuthenticated ? (
                <Link to={'/login'}>Login</Link>
              ) : (
                <>
                  <div>
                    <Link to={'/notifications'}>Notifications</Link>
                  </div>
                  <div>
                    <Link onClick={logout} to={'/login'}>Logout</Link>
                  </div>
                </>

              )}
            </div>
          }

          {/* </div> */}
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
