import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.tsx";
import NewLogin from "./pages/Login/NewLogin.tsx"
import MainLayout from "./layouts/MainLayout/MainLayout.tsx";
import Home from "./pages/Home/Home.tsx";
import Courses from "./pages/Courses/Courses";
import Subjects from "./pages/Subjects/Subjects.tsx";
import Units from "./pages/Units/Units.tsx";
import Materials from "./pages/Materials/Materials.tsx";
import MaterialDisplay from "./pages/MaterialDisplay/MaterialDisplay.tsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import Notifications from "./pages/Notifications/Notifications.tsx";
import Quiz from "./pages/Quiz/Quiz.tsx";
import Questions from "./pages/Quiz/Questions.tsx";
import Leaderboard from "./pages/Leaderboard/Leaderboard.tsx";
import Calendar from "./pages/Calendar/Calendar.tsx";
import SettingsPage from "./pages/SettingsPage/SettingsPage.tsx";
import UserDetails from "./pages/UserDetails/UserDetails.tsx";
import ContactUs from "./pages/ContactUs/ContactUs.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import RegisterUser from "./pages/Register/RegisterUser";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.tsx";
import DocsPage from "./pages/DocsPage/DocsPage.tsx";
import MyMaterial from "./components/MyMaterial/MyMaterial.tsx";
import MissedPage from "./pages/MissedPage/MissedPage.tsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<NewLogin />}></Route>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUsPage/>} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/missed" element={<MissedPage />} />
            <Route path="/user/:userId" element={<UserDetails />} />
            <Route path="/my_material" element={<MyMaterial _id={""} />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/:quizId/questions" element={<Questions />} />
            <Route path="/quiz/:quizId/leaderboard" element={<Leaderboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/course" element={<Courses />} />
            <Route path="/course/:courseId/subject" element={<Subjects />} />
            <Route path="/course/:courseId/subject/:subjectId/unit" element={<Units />} />
            <Route path="/course/:courseId/subject/:subjectId/unit/:unitId/material" element={<Materials />} />
            <Route path="/course/:courseId/subject/:subjectId/unit/:unitId/material/:materialName/" element={<MaterialDisplay />} />
          </Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
