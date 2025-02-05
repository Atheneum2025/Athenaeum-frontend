import './Courses.css'
import '../Subjects/Subjects.css'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axios.js';
import { getAuthenticatedUser } from '../../utils/authUtils';
import Loader from '../../components/Loader/Loader';


type CourseType = {
    _id: string;
    coursename: string;
    description: string;
};

export default function Courses() {

    const { user, isAuthenticated } = getAuthenticatedUser();
    const navigate = useNavigate();
    const [courseDetail, setCourseDetail] = useState<CourseType[]>([]);
    const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [coursename, setCoursename] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [keywords, setKeywords] = useState<string>("");

    const fetchData = async () => {
        setLoading(true)
        try {
            const CourseResponse = await axiosInstance.get("/api/v1/course/", { withCredentials: true });

            setCourseDetail(CourseResponse.data.courses);
            setLoading(false)
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {


        fetchData();
    }, []);
    console.log(courseDetail)

    const sendData = (coursename: string) => {
        navigate(`/course/${coursename}/subject`, { state: { courseName: coursename } });
        console.log(coursename)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/api/v1/course/', { coursename, description, keywords }, { withCredentials: true });
            console.log("course created", response.data);
            setFormIsVisible(false);
            fetchData();
        }
        catch (err) {
            console.error("failed:", err);
            setFormIsVisible(false)
        }
    }

    return (
        <>
            <div className="course_page">

                <h1>Courses :</h1>
                {
                    isAuthenticated && (
                        user.role === "admin" && (
                            <>
                                <button className='add-btn' id='btn' onClick={() => setFormIsVisible(true)}>Add New Course</button>
                                {
                                    formIsVisible && (
                                        <div className="form-for-adding-new">
                                            <form action="" onSubmit={handleSubmit}>
                                                <label htmlFor="file">Enter a Course Name</label>
                                                <input type="text" id='file-name' value={coursename} onChange={(e) => setCoursename(e.target.value)} />
                                                <label htmlFor="file">ENter Description</label>
                                                <input type="text" id='file-name' value={description} onChange={(e) => setDescription(e.target.value)} />
                                                <label htmlFor="keywords">Enter Keywords</label>
                                                <input type="text" id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                                                <button type='submit'>Save</button>
                                                <button onClick={() => setFormIsVisible(false)}>Cancel</button>
                                            </form>
                                        </div>
                                    )
                                }
                            </>
                        )
                    )
                }

                <div className="course_cards_list">
                    {
                        loading ? <Loader /> :
                            <>

                                {courseDetail.length === 0 ? (
                                    <div>No Courses Available</div>
                                ) : (
                                    courseDetail.map((course: CourseType) => (
                                        <div key={course._id} className="course_card" draggable={true}>
                                            <div className="course_avatar">
                                                <div>{course.coursename}</div>
                                            </div>
                                            <div className="course_details" onClick={() => sendData(course.coursename)} >
                                                <div className='course_name'>Course Name: {course.coursename}</div>
                                                <div className='course_description'>Description: {course.description}</div>
                                                <div className='course_ratings'>star star star star star</div>
                                                <div>Subjects no.: 45</div>
                                            </div>
                                            
                                        </div>
                                    ))
                                )}

                            </>
                    }
                </div>
            </div>

        </>
    )
}
