import header from "./Header.module.css";
import AuthContext from "../../context/AuthContext.tsx";
import { getAuthenticatedUser } from "../../utils/authUtils.ts";
import { useContext, useRef, useState } from "react";
import SearchBar from "../SearchComponent/SearchBar.tsx";
import { Link } from "react-router-dom";
import User_Dark_Image from "../../assets/dark_theme/user.png"
import User_Light_Image from "../../assets/light_theme/user.png"
import Logo_Light_Image from "../../assets/light_theme/logo_with_text.png"
import Logo_Dark_Image from "../../assets/dark_theme/logo_with_text.png";
import { ThemeContext } from "../../context/ThemeContext.tsx";
import { useTheme } from "../../context/ThemeContext.tsx";

// type User = {
//   user: string;
// }
export default function Header() {

  const { theme, toggleTheme } = useTheme();
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = getAuthenticatedUser();

  const [sidebarIsVisible, setSidebarIsVisible] = useState<boolean>(false);
  const [profileOptionsVisible, setProfileOptionsVisible] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const show = (id: number) => () => {
    setActivePage(id);
    console.log(id);
  }
  const profileButtonRef = useRef<HTMLDivElement>(null)

  // document.addEventListener("mousedown", (event: MouseEvent) => {
  //   if (profileButtonRef.current && !profileButtonRef.current.contains(event.target as Node)) {
  //     setProfileOptionsVisible(!profileOptionsVisible);
  //   }
  // })
  return (

    <>
      <header className={header.navigation_header}>
        <div className={header.logo}>
          {/* <img src={Logo_Light_Image} alt="" /> */}
          <img src={theme === "light" ? Logo_Light_Image : Logo_Dark_Image} alt="" />
          {/* logo */}
        </div>
        <div className={header.middle_navigation}>
          <nav className={header.navigation_bar}>
            <ul className={header.ul_lists}>
              <li>
                <Link to={'/home'} className={`${activePage === 1 ? "active" : ""}`} onClick={show(1)}>Home</Link>
              </li>
              <li>
                <Link to={'/course'} className={`${activePage === 1 ? "active" : ""}`} onClick={show(4)}>Courses</Link>
              </li>
              <li>
                <Link to={'/quiz'} className={`${activePage === 1 ? "active" : ""}`} onClick={show(3)}>Quiz</Link>
              </li>
              <li>
                <Link to={'/docs'} className={`${activePage === 1 ? "active" : ""}`} onClick={show(2)}>Docs</Link>
              </li>
              <li>
                <Link to={'/about'} className={`${activePage === 1 ? "active" : ""}`} onClick={show(5)}>About Us</Link>
              </li>
            </ul>
          </nav>
          <nav className={sidebarIsVisible ? (header.navigation_bar_sidebar) : (header.hidden)}  >
            <ul className={header.ul_lists}>
              <li>
                <Link to={'/home'} onClick={()=>setSidebarIsVisible(false)}>Home</Link>
              </li>
              <li>
                <Link to={'/course'} onClick={()=>setSidebarIsVisible(false)}>Courses</Link>
              </li>
              <li>
                <Link to={'/quiz'} onClick={()=>setSidebarIsVisible(false)}>Quiz</Link>
              </li>
              <li>
                <Link to={'/docs'} onClick={()=>setSidebarIsVisible(false)}>Docs</Link>
              </li>
              <li>
                <Link to={'/about'} onClick={()=>setSidebarIsVisible(false)}>About Us</Link>
              </li>
            </ul>
          </nav>

          <SearchBar />
        </div>
        {/* {
          user?.username === "Rishon Fernandes" && (
            <div className="toggle_theme_btn">
              <button onClick={toggleTheme} >T</button>
            </div>
          )
        } */}
        <div className={header.auth_btn}>
          {/* <div  className="profileSide"> */}

          {/* <div className={header.profile_avatar} onClick={() => setProfileOptionsVisible(!profileOptionsVisible)} ref={profileButtonRef}> */}
          <div className={header.profile_avatar} onClick={() => setProfileOptionsVisible(!profileOptionsVisible)} >
            <img src={theme === "light" ? User_Light_Image : User_Dark_Image} alt="user_avatar" />
            {/* <img src={User_Dark_Image} alt="" /> */}
          </div>
          {profileOptionsVisible &&
            <div className={header.profile_avatar_options} >
              <div>HELLO {user?.role.toUpperCase()}</div>
              <div>
                <Link to={'/profile'} onClick={() => setProfileOptionsVisible(false)}>Profile</Link>
              </div>
              <div>
                <Link to={'/settings'} onClick={() => setProfileOptionsVisible(false)}>Settings</Link>

              </div>
              {!isAuthenticated ? (
                <div>
                  <Link to={'/login'} onClick={() => setProfileOptionsVisible(false)}>Login</Link>
                </div>
              ) : (
                <>
                  <div>
                    <Link to={'/notifications'} onClick={()=>setProfileOptionsVisible(false)}>Notifications</Link>
                  </div>
                  <div>
                    <Link to={'/calendar'} onClick={()=>setProfileOptionsVisible(false)}>Calendar</Link>
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
        <div id="menu" className={header.menu} onClick={() => setSidebarIsVisible(!sidebarIsVisible)}>Menu</div>
      </header>

    </>
  )


}
