import "./Header.css"
import { useUserContext } from "../../context/UserContext.tsx";
export default function Header() {

  const { isLoggedIn, login, logout } = useUserContext();

  return (

    <>
      <header className="navigation-header">
        <div className="logo" id="menu">
          <img src="e3de8db1-a6da-45b8-8547-008b5effa859 1@2x.png" alt="" />
          {/* logo */}
        </div>
        <div className="middle-navigation">
          <nav className="navigation-bar">
            <ul className="ul-lists">
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
          <div className="search-bar">
            <input type="search" placeholder="search here.." />
            <div className="search-bar-results">
              Recents :
              Results :
              <ul>
                <div>Courses</div>
                <li>BCA</li>
                <li>BBA</li>
                <li>BSC</li>
              </ul>
              <ul>
                <div>Subjects</div>
                <li>PSPC</li>
                <li>DC</li>
                <li>MATHS</li>
              </ul>
              <ul>
                <div>Units</div>
                <li>unit one</li>
                <li>unit two</li>
              </ul>
              <ul>
                <div>Materials</div>
                <li>material one</li>
                <li>material two</li>
                <li>material two</li>
                <li>material two</li>
                <li>material two</li>
                <li>material two</li>
                <li>material two</li>
                <li>material two</li>
                <li>material two</li>
              </ul>
              <ul>
                <div>Professors</div>
                <li>p 1</li>
                <li>p 2</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="auth-btn">
          <div className="btn">
            {/* {!isLoggedIn ? (
              <a href="/login" style={{ marginRight: "1rem" }}>
                Login
              </a>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )} */}
            {isLoggedIn && (
              <button onClick={login}>Login</button>
            )}
            {isLoggedIn && (
              <button onClick={logout}>Logout</button>
            )}
          </div>
          <button className="btn">Signup</button>
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
