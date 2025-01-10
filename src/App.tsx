import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home.tsx";
import RegisterUser from "./pages/Register/RegisterUser";
import Courses from "./pages/Courses/Courses";
import Login from "./pages/Login/Login.tsx";
import MainLayout from "./layouts/MainLayout/MainLayout.tsx";
import Subject from "./pages/Subjects/Subject.tsx";
import Unit from "./pages/Units/Unit.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import Dashboard from "./layouts/Dashboard/Dashboard.tsx";
import AdminsPage from "./pages/AdminsPage/AdminsPage.tsx";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard.tsx";
import SidebarLayout from "./layouts/SIdebarLayout/SidebarLayout.tsx";
import UploadsPage from "./pages/UploadsPage/UploadsPage.tsx";
import Material from "./pages/Materials/Material.tsx";
function App() {
  // const [resourseType, setResourseType] = useState('posts');
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/v1/${resourseType}`)
  //     .then(response => response.json())
  //     .then(json => setItems(json.courses));

  // }, [resourseType])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="admin" element={<AdminsPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/upload" element={<UploadsPage/>} />
            <Route element={<SidebarLayout/>}>
              <Route path="/course" element={<Courses />}/>
              <Route path="/subject" element={<Subject />} />
              <Route path="/unit" element={<Unit />} />
              <Route path="/material" element={<Material />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
