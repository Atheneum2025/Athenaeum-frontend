import './Courses.css'
import '../Subjects/Subjects.css'
import React from 'react'
import { Outlet } from 'react-router-dom'
export default function Courses() {

    // const [data, setData] = useState({});
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     fetch("http://localhost:3000/api/v1/courses")
    //       .then((res) => res.json())
    //       .then((data) => setData(data));

    // const fetchdata = async () => {
    //     try {
    //         const Courseresponse = await fetch("http://localhost:3000/api/v1/courses/");
    //         const Courseresult = await Courseresponse.json();
    //         setData(Courseresult.courses);
    //     }
    //     catch (error) {
    //         console.error(error);    
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // }

    // fetchdata();
    // }, []);
    // console.log(data)


    return (
        <>
            <div className="course_page">
                <div>Courses</div>

                {/* <div>
{loading ? (
    <p>Loading...</p>
) : (
    <ul>
        {data.map((item, index) => (
            <>
                <li key={index}>{item.coursename}
                    <p>{item.description}</p>
                </li>

            </>
        ))}

    </ul>
)}
</div> */}
                <div className="course_cards_list">
                    <div className="course_card">
                        <div className="course_avatar">
                            <div>BCA</div>
                        </div>
                        <div className="course_details">
                            <div className='course_name'>Course Name: BCA</div>
                            <div className='course_description'>Description: Bachelor of computer application</div>
                            <div className='course_ratings'>star star star star star</div>
                            <div>Subjects no.: 78</div>
                        </div>
                    </div>

                    <div className="course_card">
                        <div className="course_avatar">
                            <div>BCA</div>
                        </div>
                        <div className="course_details">
                            <div className='course_name'>BCA</div>
                            <div className='course_description'>Bachelor of computer application</div>
                            <div className='course_ratings'>star star star star star</div>
                        </div>
                    </div>

                    <div className="course_card">
                        <div className="course_avatar">
                            <div>BCA</div>
                        </div>
                        <div className="course_details">
                            <div className='course_name'>BCA</div>
                            <div className='course_description'>Bachelor of computer application</div>
                        </div>
                    </div>
                    <div className="course-card">BSC</div>
                    <div className="course-card"></div>
                    <div className="course-card"></div>
                    <div className="course-card"></div>
                    <div className="course-card"></div>
                    <div className="course-card"></div>
                </div>
            </div>

        </>
    )
}
