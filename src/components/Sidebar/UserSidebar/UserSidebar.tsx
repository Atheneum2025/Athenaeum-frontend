import { useEffect, useState } from 'react';
import './UserSidebar.css'
import { useNavigate } from 'react-router-dom';
type CourseType = {
    _id: string;
    coursename: string;
};
export default function UserSidebar() {

    // const [courseDetail, setCourseDetail] = useState<CourseType[]>([]);
    // const navigate = useNavigate();


    // useEffect(() => {

    //     const fetchdata = async () => {
    //         try {
    //             const Courseresponse = await fetch("http://localhost:3000/api/v1/course/");
    //             const Courseresult = await Courseresponse.json();
    //             setCourseDetail(Courseresult.courses);
    //         }
    //         catch (error) {
    //             console.error(error);
    //         }
    //     }

    //     fetchdata();
    // }, []);
    // console.log(courseDetail)

    // const sendData = (coursename: string) => {
    //     navigate(`/course/${coursename}/subject`, { state: { courseName: coursename } });
    //     console.log(coursename)
    // }
    return (

        <>
            <div id='sidebar' className="sidebar">
                <div>View Later</div>
                
            </div>

        </>
    )
}
