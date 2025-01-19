import './Courses.css'
import '../Subjects/Subjects.css'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";


type CourseType = {
    _id: string;
    coursename: string;
    description: string;
};

export default function Courses() {

    const navigate = useNavigate();
    const [courseDetail, setCourseDetail] = useState<CourseType[]>([]);

    useEffect(() => {

        const fetchdata = async () => {
            try {
                const Courseresponse = await fetch("http://localhost:3000/api/v1/course/");
                const Courseresult = await Courseresponse.json();
                setCourseDetail(Courseresult.courses);
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

    return (
        <>
            <div className="course_page">
                    
                <h1>Courses :</h1>

                <div className="course_cards_list">
                    {courseDetail.map((course: CourseType) => (
                        <div key={course._id} className="course_card" onClick={()=>sendData(course.coursename)}>
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
                </div>
            </div>

        </>
    )
}
