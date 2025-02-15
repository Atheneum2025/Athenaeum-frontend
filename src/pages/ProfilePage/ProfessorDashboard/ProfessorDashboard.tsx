import { useEffect, useState } from 'react'
import LikedVideos from '../../../components/LikedVideos/LikedVideos.tsx';
import HistoryVideos from '../../../components/History/HistoryVideos.tsx';
import MyMaterial from '../../../components/MyMaterial/MyMaterial.tsx';
import ProfessorAnalytics from '../../../components/Analytics/ProfessorAnalytics';
import axiosInstance from '../../../utils/axios.ts';
import '../ProfilePage.css'

interface StudentDashboardProps {
    user: {
        _id: string;
        username: string;
        email: string;
        role: string;
        college: string;
    };
}

type CourseType = {
    coursename: string;
}
type SubjectType = {
    subjectname: string;
}
type UnitType = {
    unitname: string;
}
export default function ProfessorDashboard({ user }: StudentDashboardProps) {

    const [activePage, setActivePage] = useState<number>(1);
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const show = (id: number) => () => {
        setActivePage(id);
    }

    const [courses, setCourses] = useState<CourseType[]>([])
    const [subjects, setSubjects] = useState<SubjectType[]>([])
    const [units, setUnits] = useState<UnitType[]>([])

    const [selectedCourse, setSelectedCourse] = useState<string>("")
    const [selectedSubject, setSelectedSubject] = useState<string>("")
    const [selectedUnit, setSelectedUnit] = useState<string>("")

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.get("/course/c", { withCredentials: true });
                setCourses(response.data.courses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        if (!selectedCourse) return;

        const fetchSubjects = async () => {
            try {
                const response = await axiosInstance.get(`/course/${selectedCourse}/subject`);
                setSubjects(response.data.subjects);
                setUnits([]); // Clear units when selecting a new course
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        };

        fetchSubjects();
    }, [selectedCourse]);

    useEffect(() => {
        if (!selectedSubject) return;

        const fetchUnits = async () => {
            try {
                const response = await axiosInstance.get(`/course/${selectedCourse}/subject/${selectedSubject}/unit`);
                setUnits(response.data.units);
            } catch (error) {
                console.error("Error fetching units:", error);
            }
        };

        fetchUnits();
    }, [selectedSubject]);

    return (

        <>
            <div className="user_profile">
                <h1>Welcome {user.role}</h1>
                <div className='user_avatar'>
                    <img src="" alt="" />
                    <div>{user.username}</div>
                </div>
                <div className="user_details">
                    <div>student email : {user.email}</div>
                    <div>college info : {user.college}</div>
                </div>
            </div>

            <div className='form_for_adding'>
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
                        <>
                            <div className="add_new_material">
                                <div className="add_new_material_form">
                                    <form className="">
                                        <div className="add_new_material_form_header">
                                            <h2>
                                                Upload New Material
                                            </h2>
                                            <button
                                                type="button"
                                                // onClick={() => setIsVisible(false)}
                                                onClick={() => { setIsVisible(false) }}
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        <div className="form_field">
                                            <label >
                                                Course
                                            </label>
                                            <select
                                                value={selectedCourse}
                                                onChange={(e) => setSelectedCourse(e.target.value)}
                                            >
                                                <option value="">Select Course</option>
                                                {
                                                    courses.map((course, index) => (
                                                        <option value={course.coursename} key={index} >{course.coursename}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="form_field">
                                            <label >
                                                Subject
                                            </label>
                                            <select
                                            value={selectedSubject}
                                            onChange={(e) => setSelectedSubject(e.target.value)}
                                            >
                                                <option value="">Select Subject</option>
                                                {
                                                    subjects.map((subject, index) => (
                                                        <option value={subject.subjectname} key={index}>{subject.subjectname}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="form_field">
                                            <label>Unit</label>
                                            <select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)} >
                                                <option value="">Select Unit</option>
                                                {
                                                    units.map((unit, index) => (
                                                        <option value={unit.unitname} key={index}>{unit.unitname}</option>
                                                    ))
                                                }
                                            </select>
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

                                        <div className="upload_btns">
                                            <button type="button" onClick={() => setIsVisible(false)}>Cancel</button>
                                            <button type="submit">Upload Material</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
            <ul className='user_profile_options' id='demo'>
                <div className={`options ${activePage === 1 ? "active" : ""}`} onClick={show(1)}>Analytics</div>
                <div className={`options ${activePage === 2 ? "active" : ""}`} onClick={show(2)}>Saved Material</div>
                <div className={`options ${activePage === 3 ? "active" : ""}`} onClick={show(3)}>Your History</div>
                <div className={`options ${activePage === 4 ? "active" : ""}`} onClick={show(4)}>My Material</div>
            </ul>
            <div className='user_profile_options_display'>
                <div id='1' className={`options_page ${activePage === 1 ? "active" : ""}`}>
                    <ProfessorAnalytics />
                </div>
                <div id='2' className={`options_page ${activePage === 2 ? "active" : ""}`}>
                    <LikedVideos />
                </div>
                <div id='3' className={`options_page ${activePage === 3 ? "active" : ""}`}>
                    <HistoryVideos />
                </div>
                <div id='4' className={`options_page ${activePage === 4 ? "active" : ""}`}>
                    <MyMaterial _id={user._id} />
                </div>
            </div>
        </>
    )
}
