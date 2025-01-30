import './Courses.css'
import '../Subjects/Subjects.css'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { getAuthenticatedUser } from '../../utils/authUtils';
import Loader from '../../components/Loader/Loader';
import Cookies from 'js-cookie'


type CourseType = {
    _id: string;
    coursename: string;
    description: string;
};

export default function Courses() {

    const { user, parsedToken, isAuthenticated } = getAuthenticatedUser();
    const navigate = useNavigate();
    const [courseDetail, setCourseDetail] = useState<CourseType[]>([]);
    const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [coursename, setCoursename] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [keywords, setKeywords] = useState<string>("");

    useEffect(() => {

        const fetchdata = async () => {
            setLoading(true)
            try {
                const CourseResponse = await axios.get("http://localhost:3000/api/v1/course/" , {withCredentials: true});
                
                setCourseDetail(CourseResponse.data.courses);
                setLoading(false)
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchdata();
    }, []);
    console.log(courseDetail)

    const sendData = (coursename: string) => {
        navigate(`/course/${coursename}/subject`, { state: { courseName: coursename } });
        console.log(coursename)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/v1/course/', { coursename, description, keywords }, {withCredentials: true});
            console.log("course created", response.data);
            setFormIsVisible(false)
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

                                {courseDetail.map((course: CourseType) => (
                                    <div key={course._id} className="course_card" onClick={() => sendData(course.coursename)} draggable={true}>
                                        <div className="course_avatar">
                                            <div>{course.coursename}</div>
                                        </div>
                                        <div className="course_details">
                                            <div className='course_name'>Course Name: {course.coursename}</div>
                                            <div className='course_description'>Description: {course.description}</div>
                                            <div className='course_ratings'>star star star star star</div>
                                            <div>Subjects no.: 45</div>
                                        </div>
                                    </div>
                                ))}
                            </>
                    }
                </div>
            </div>

        </>
    )
}
