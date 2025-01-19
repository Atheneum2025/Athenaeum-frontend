import React, { useContext, useState } from 'react'
import '../StudentDashboard/StudentDashboard.css';
import LikedVideos from '../StudentDashboard/LikedVideos/LikedVideos';
import HistoryVideos from '../StudentDashboard/History/HistoryVideos';
import MyMaterial from '../StudentDashboard/MyMaterial/MyMaterial';
import ProfessorAnalytics from '../../components/Analytics/ProfessorAnalytics';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

interface StudentDashboardProps {
    user: {
        id: string;
        username: string;
        email: string;
        role: string;
    };
}
export default function ProfessorDashboard({user}: StudentDashboardProps) {

    // const { isAuthenticated, logout } = useContext(AuthContext);
    // console.log(isAuthenticated);
    // const authToken = localStorage.getItem("authToken");
    // let parsedToken
    // authToken ? parsedToken = JSON.parse(authToken) : parsedToken = null;
    // const user = parsedToken?.user;

    const [activePage, setActivePage] = useState<number>(1);

    const show = (id: number) => () => {
        setActivePage(id);
    }

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [materialname, setMaterialname] = useState<string>("")
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let courseId = 'BCA'
        let subjectId = 'DSA'
        let unitId = 'Unit One'
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/course/${courseId}/subject/${subjectId}/unit/${unitId}/material`, { materialname, description });
            console.log("material created", response.data);
            setIsVisible(false);
        }
        catch (err) {
            console.error("failed:", err);
            setIsVisible(false);
        }
    }
    return (

        <>
            <div className="student_profile">
                <h1>Welcome Professor</h1>
                <div className='student_avatar'>
                    <img src="" alt="" />
                    <div>{user.username}</div>
                </div>
                <div className="student_details">
                    <div>student email : athenaeum@gmail.com</div>
                    <div>college info : St. Xavier's College Mapusa</div>
                </div>
            </div>

            <div className='form-for-adding'>
                <div>update profile details</div>
                <form action="">
                    <label htmlFor="first_name">Edit First Name</label>
                    <input type="text" id="first_name" />
                    <label htmlFor="last_name">Edit Last Name</label>
                    <input type="text" id="last_name" />

                    <button type='submit'>Update Info</button>
                </form>
            </div>
            <div>ProfessorDashboard</div>
            <div>
                <button className='add-btn' id='btn' onClick={() => setIsVisible(true)}>Add New Material</button>
                {
                    isVisible && (
                        <div className="form-for-adding-new">
                            <form action="" onSubmit={handleSubmit}>
                                {/* <label htmlFor="">Course</label>
                                <input type="text" />
                                <label htmlFor="">Subject</label>
                                <input type="text" />
                                <label htmlFor="">Unit</label>
                                <input type="text" /> */}
                                <label htmlFor="file">ENter a Material Name</label>
                                <input type="text" id='file-name' value={materialname} onChange={(e) => setMaterialname(e.target.value)} />
                                <label htmlFor="file">ENter Description</label>
                                <input type="text" id='file-name' value={description} onChange={(e) => setDescription(e.target.value)} />
                                <label htmlFor="file">Upload a file</label>
                                <input type="file" />

                                <button type='submit'>Save</button>
                                <button onClick={() => setIsVisible(false)}>Cancel</button>
                            </form>
                        </div>
                    )
                }
                
            </div>

            <ul className='student-profile-options' id='demo'>
                <div className={`options ${activePage === 1 ? "active" : ""}`} onClick={show(1)}>Liked Material</div>
                <div className={`options ${activePage === 2 ? "active" : ""}`} onClick={show(2)}>Saved Material</div>
                <div className={`options ${activePage === 3 ? "active" : ""}`} onClick={show(3)}>Your History</div>
                <div className={`options ${activePage === 4 ? "active" : ""}`} onClick={show(4)}>My Material</div>
                <div className={`options ${activePage === 5 ? "active" : ""}`} onClick={show(5)}>Analytics</div>
            </ul>
            <div className='student-profile-options-display'>
                <div id='1' className={`options-page ${activePage === 1 ? "active" : ""}`}>
                    <LikedVideos />
                </div>
                <div id='2' className={`options-page ${activePage === 2 ? "active" : ""}`}>
                    <LikedVideos />
                </div>
                <div id='3' className={`options-page ${activePage === 3 ? "active" : ""}`}>
                    <HistoryVideos />
                </div>
                <div id='4' className={`options-page ${activePage === 4 ? "active" : ""}`}>
                    <MyMaterial />
                </div>
                <div id='5' className={`options-page ${activePage === 5 ? "active" : ""}`}>
                    <ProfessorAnalytics />
                </div>
            </div>
        </>
    )
}
