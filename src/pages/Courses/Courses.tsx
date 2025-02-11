import './Courses.css'
import '../Subjects/Subjects.css'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axios.js';
import { getAuthenticatedUser } from '../../utils/authUtils';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';


type CourseType = {
    _id: string;
    coursename: string;
    description: string;
};

type CourseFormProps = {
    course: CourseType;
    onUpdate: () => void;
    onDelete: () => void;
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
    const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
    // const [upCoursename, setupCoursename] = useState<string>("");
    // const [upDescription, setupDescription] = useState<string>("");
    // const [upKeywords, setupKeywords] = useState<string>("");


    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("coursename");
    const [SortType, setSortType] = useState("-1");

    const fetchData = async () => {
        setLoading(true)
        try {
            const CourseResponse = await axiosInstance.get("/api/v1/course/", { withCredentials: true, params: { page, limit: 5, sortBy, SortType } });

            setCourseDetail(CourseResponse.data.courses);
            setLoading(false)
            setTotalPages(CourseResponse.data.totalPages);
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [page, sortBy, SortType]);
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
    const handleUpdate = async () => {
        try {
            console.log(selectedCourse?._id)
            const update = await axios.patch(`http://localhost:3000/api/v1/course/${selectedCourse?.coursename}`, { coursename, description, keywords }, { withCredentials: true });
            console.log(update.data)
            alert("Course updated successfully!");
            fetchData()
        } catch (error) {
            console.error(error);
            alert("Failed to update course.");
        }
        setCoursename(" ");
        setDescription(" ");
        setKeywords(" ");
    };

    // Delete course
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/v1/course/${selectedCourse?.coursename}`, { withCredentials: true });
                alert("Course deleted successfully!");
                fetchData();
            } catch (error) {
                console.error(error);
                alert("Failed to delete course.");
            }
        }
    };

    return (
        <>
            <div className="items_display_page">
                <div className='items_display_header'>
                    <h1>Courses :</h1>


                    {/* Get List of all Courses */}
                    {
                        isAuthenticated && (
                            user.role === "admin" && (
                                <>
                                    <button className='add-btn' id='btn' onClick={() => setFormIsVisible(true)}>
                                        <div>+</div>
                                        <div>Add New Course</div>
                                    </button>
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
                    <div className='item_filters'>
                        <div>Filter  </div>
                        <div>
                            <select onChange={(e) => setSortBy(e.target.value)}>
                                <option value="createdAt">Newest First</option>
                                <option value="coursename">Course Name</option>
                            </select>
                            <select onChange={(e) => setSortType(e.target.value)}>
                                <option value="-1">Descending</option>
                                <option value="1">Ascending</option>
                            </select>
                        </div>
                    </div>



                </div>

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

                                            </div>
                                            {
                                                user.role === "admin" && (
                                                    <div onClick={(e: React.MouseEvent<HTMLDivElement>) => { setSelectedCourse(course); e.stopPropagation() }} >Edit</div>
                                                )
                                            }

                                        </div>
                                    ))
                                )}
                                {/* Pagination */}
                                <div className='pagination'>
                                    <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                                        Prev
                                    </button>
                                    <span> Page {page} of {totalPages} </span>
                                    <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                                        Next
                                    </button>
                                </div>
                                {selectedCourse && (
                                    <div className="course_form">
                                        <h3>Edit Course</h3>
                                        <input
                                            type="text"
                                            name="coursename"
                                            value={coursename}
                                            onChange={(e) => setCoursename(e.target.value)}
                                            placeholder="Course Name"
                                        />
                                        <input
                                            name="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Course Description"
                                        ></input>
                                        <input
                                            name="keywords"
                                            value={keywords}
                                            onChange={(e) => setKeywords(e.target.value)}
                                            placeholder="Course Keywords"
                                        ></input>
                                        <button onClick={handleUpdate}>Update</button>
                                        <button onClick={handleDelete} style={{ backgroundColor: "red" }}>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </>
                    }
                </div>
            </div>

        </>
    )
}
