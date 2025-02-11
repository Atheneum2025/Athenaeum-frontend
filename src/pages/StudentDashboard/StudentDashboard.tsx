import { useState } from 'react'
import './StudentDashboard.css';
import LikedVideos from './LikedVideos/LikedVideos';
import HistoryVideos from './History/HistoryVideos';
import MyMaterial from './MyMaterial/MyMaterial';
import axios from 'axios';
import VideoDisplay from '../VideoDisplay/VideoDisplay';
import PdfViewer from '../PdfViewer/PdfViewer';
import { getAuthenticatedUser } from '../../utils/authUtils';

interface StudentDashboardProps {
    user: {
        _id: string;
        id: string;
        username: string;
        email: string;
        role: string;
    };
}
export default function StudentDashboard({ user }: StudentDashboardProps) {

    // const { user, isAuthenticated } = getAuthenticatedUser();
    const [activePage, setActivePage] = useState<number>(1);

    const show = (id: number) => () => {
        setActivePage(id);
        console.log(id);
    }

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [materialname, setMaterialname] = useState<string>("")
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3000/api/v1/material`, { materialname, description });
            console.log("material created", response.data);
        }
        catch (err) {
            console.error("failed:", err);
        }
    }
    return (
        <>
            <div className="user_profile">
                <h1>Welcome Student</h1>
                <div className='user_avatar'>
                    <img src="" alt="" />
                    <div>{user.username}</div>
                </div>
                <div className="user_details">
                    <div>student email : {user.email}</div>
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

            <div>
                <button className='add-btn' id='btn' onClick={() => setIsVisible(true)}>Add New Material</button>
                {
                    isVisible && (
                        <div className="form-for-adding-new">
                            <form action="" onSubmit={handleSubmit}>
                                <label htmlFor="file">ENter a Material Name</label>
                                <input type="text" id='file-name' value={materialname} onChange={(e) => setMaterialname(e.target.value)} />
                                <label htmlFor="file">ENter Description</label>
                                <input type="text" id='file-name' value={description} onChange={(e) => setDescription(e.target.value)} />
                                <label htmlFor="file">Upload a file</label>
                                <input type="file" />

                                <button type='submit' onClick={() => setIsVisible(false)}>Save</button>
                                <button onClick={() => setIsVisible(false)}>Cancel</button>
                            </form>
                        </div>
                    )
                }
            </div>
            <ul className='user_profile_options' id='demo'>
                <div className={`options ${activePage === 1 ? "active" : ""}`} onClick={show(1)}>Saved Material</div>
                <div className={`options ${activePage === 2 ? "active" : ""}`} onClick={show(2)}>Your History</div>
                <div className={`options ${activePage === 3 ? "active" : ""}`} onClick={show(3)}>My Material</div>
                <div className={`options ${activePage === 4 ? "active" : ""}`} onClick={show(4)}>Analytics</div>
            </ul>
            <div className='user_profile_options_display'>
                <div id='1' className={`options_page ${activePage === 1 ? "active" : ""}`}>
                    <LikedVideos/>
                </div>
                <div id='2' className={`options_page ${activePage === 2 ? "active" : ""}`}>
                    <HistoryVideos />
                </div>
                <div id='3' className={`options_page ${activePage === 3 ? "active" : ""}`}>
                    <MyMaterial _id={user._id} />
                </div>
                <div id='4' className={`options_page ${activePage === 4 ? "active" : ""}`}>
                    {/* <MyMaterial /> */}
                </div>
            </div>

        </>
    )
}