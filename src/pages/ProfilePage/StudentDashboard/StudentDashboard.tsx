import { useEffect, useState } from 'react'
import '../ProfilePage.css';
import SavedMaterials from '../../../components/SavedMaterials/SavedMaterials.tsx';
import HistoryVideos from '../../../components/History/HistoryVideos';
import MyMaterial from '../../../components/MyMaterial/MyMaterial';
import axiosInstance from '../../../utils/axios.ts';
import AddImage from '../../../assets/add.png';
import User_Light_Image from '../../../assets/light_theme/user.png';
import User_Dark_Image from '../../../assets/dark_theme/user.png';
import { useTheme } from "../../../context/ThemeContext.tsx";

// import { getAuthenticatedUser } from '../../utils/authUtils';

interface StudentDashboardProps {
    user: {
        _id: string;
        username: string;
        email: string;
        role: string;
        college: string;

    };
}
export default function StudentDashboard({ user }: StudentDashboardProps) {

    const {theme} = useTheme();
    // const { user, isAuthenticated } = getAuthenticatedUser();
    const [activePage, setActivePage] = useState<number>(1);

    const show = (id: number) => () => {
        setActivePage(id);
        console.log(id);
    }

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [materialname, setMaterialname] = useState<string>("")
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(`/material`, { materialname, description });
            console.log("material created", response.data);
        }
        catch (err) {
            console.error("failed:", err);
        }
    }
    return (
        <>
            <div className="user_profile">
                <h1>Welcome {user.role}</h1>
                <div className='user_avatar'>
                    <img src={theme === "light" ? User_Light_Image : User_Dark_Image} alt="" />
                    {/* <img src={User_Dark_Image} alt="" /> */}
                    <div>{user.username}</div>
                </div>
                <div className="user_details">
                    <div>student email : {user.email}</div>
                    <div>college info : {user.college}</div>
                </div>
            </div>

            <div className='user_profile_middle_section'>
                <button className='add_btn' id='btn' onClick={() => setIsVisible(true)}>
                    <img src={AddImage} alt="" />
                    <div>Add New Material</div>
                </button>
                {
                    isVisible && (
                        <div className="add_new_material">
                            <div className="add_new_material_form">
                                <form action="" onSubmit={handleSubmit}>
                                    <div className="add_new_material_form_header">
                                        <h2>Upload New Material</h2>
                                        <button type="button" onClick={() => { setIsVisible(false) }}>✕</button>
                                    </div>
                                    <div className="form_field">
                                        <label >Material Name</label>
                                        <input
                                            type="text"
                                            // value={materialname}
                                            // onChange={(e) => setMaterialname(e.target.value)}
                                            className=""
                                            placeholder="Enter material name"
                                        />
                                    </div>
                                    <div className="form_field">
                                        <label>Description</label>
                                        <textarea
                                            // value={description}
                                            // onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Add description..."
                                            rows={3}
                                        />
                                    </div>
                                    <div className="upload_section">
                                        <label>Upload File</label>
                                        <div className="">
                                            <label className="">
                                                <span className="text-gray-400 mb-2">
                                                    <svg
                                                        className="w-8 h-8"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        />
                                                    </svg>
                                                </span>
                                                <span>Click to upload or drag and drop</span>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                // onChange={(e) => console.log(e.target.files[0])}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form_field">
                                        <label>Keywords</label>
                                        <input
                                            type="text"
                                            // value={description}
                                            // onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Add keywords..."
                                        />
                                    </div>
                                    <div className="upload_btns">
                                        <button type="button" onClick={() => setIsVisible(false)}>Cancel</button>
                                        <button type="submit">Upload Material</button>
                                    </div>

                                    {/* <button type='submit' onClick={() => setIsVisible(false)}>Save</button>
                                <button onClick={() => setIsVisible(false)}>Cancel</button> */}
                                </form>
                            </div>
                        </div>
                    )
                }
            </div>
            <ul className='user_profile_options' id='demo'>
                <div className={`options ${activePage === 1 ? "active" : ""}`} onClick={show(1)}>Saved Material</div>
                <div className={`options ${activePage === 2 ? "active" : ""}`} onClick={show(2)}>Your History</div>
                <div className={`options ${activePage === 3 ? "active" : ""}`} onClick={show(3)}>My Material</div>
                <div className={`options ${activePage === 4 ? "active" : ""}`} onClick={show(4)}></div>
            </ul>
            <div className='user_profile_options_display'>
                <div id='1' className={`options_page ${activePage === 1 ? "active" : ""}`}>
                    <SavedMaterials />
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