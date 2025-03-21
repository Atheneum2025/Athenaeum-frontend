import './Courses.css'
import '../Subjects/Subjects.css'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axios.js';
import { getAuthenticatedUser } from '../../utils/authUtils';
import { useTheme } from "../../context/ThemeContext.tsx";
import Loader from '../../components/Loader/Loader';
import AddImage from '../../assets/add.png';
import RateStar_Light_Image from '../../assets/light_theme/star.png';
import RateStar_Dark_Image from '../../assets/dark_theme/star.png';
import EmptyStar_Image from '../../assets/star.png';
import FilledStar_Image from '../../assets/star_filled.png';
import EditComponent from '../../components/EditComponent/EditComponent.js';
import Bottom_Line_Image from "../../assets/bottom_line_cropped.png"
import RatingComponent from '../../components/RatingComponent/RatingComponent.tsx';

type CourseType = {
    _id: string;
    coursename: string;
    description: string;
    keywords: string;
    ratings: number;
};

export default function Courses() {

    const {theme} = useTheme();
    const { user, isAuthenticated } = getAuthenticatedUser();
    const navigate = useNavigate();
    const [courseDetail, setCourseDetail] = useState<CourseType[]>([]);
    const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [coursename, setCoursename] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [keywords, setKeywords] = useState<string>("");
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
    let editCoursename = selectedCourse?.coursename;
    let editCoursedescription = selectedCourse?.description;
    let editCoursekeywords = selectedCourse?.keywords;
    const [rateCourse, setRateCourse] = useState<boolean>(false);
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
            const CourseResponse = await axiosInstance.get("/course/", { withCredentials: true, params: { page, limit: 8, sortBy, SortType } });

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
            const response = await axiosInstance.post('/course/', { coursename, description, keywords }, { withCredentials: true });
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
            const update = await axiosInstance.patch(`/course/${selectedCourse?.coursename}`, { coursename, description, keywords }, { withCredentials: true });
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
                await axiosInstance.delete(`/course/${selectedCourse?.coursename}`, { withCredentials: true });
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
            <div className="items_display_page courses_page">
                <div className='items_display_header'>
                    <h1>Courses :</h1>


                    {/* Get List of all Courses */}
                    {
                        isAuthenticated && (
                            user?.role === "admin" && (
                                <>
                                    <button className='add_btn' onClick={() => setFormIsVisible(true)}>
                                        <img src={AddImage} alt="" />
                                        <div>Add New Course</div>
                                    </button>
                                    {
                                        formIsVisible && (
                                            <div className="add_new_material">
                                                <div className='add_new_material_form'>
                                                    <form action="" onSubmit={handleSubmit}>
                                                        <div className="add_new_material_form_header">
                                                            <h2>Create New Course</h2>
                                                            <button type="button" onClick={() => { setFormIsVisible(false) }}>✕</button>
                                                        </div>
                                                        <div className="form_field">
                                                            <label htmlFor="file">Enter a Course Name</label>
                                                            <input type="text" id='file-name' value={coursename} onChange={(e) => setCoursename(e.target.value)} />
                                                        </div>
                                                        <div className="form_field">
                                                            <label htmlFor="file">ENter Description</label>
                                                            <input type="text" id='file-name' value={description} onChange={(e) => setDescription(e.target.value)} />
                                                        </div>
                                                        <div className="form_field">
                                                            <label htmlFor="keywords">Enter Keywords</label>
                                                            <input type="text" id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                                                        </div>
                                                        <div className="upload_btns">
                                                            <button type="button" onClick={() => setFormIsVisible(false)}>Cancel</button>
                                                            <button type="submit">Create Course</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                            )
                        )
                    }
                    <div className='item_filters'>
                        <div onClick={() => setShowFilters(!showFilters)} >Filter  </div>
                        {
                            showFilters && (
                                <div className='filters'>
                                    <select onChange={(e) => setSortBy(e.target.value)}>
                                        <option value="createdAt">Newest First</option>
                                        <option value="coursename">Course Name</option>
                                    </select>
                                    <select onChange={(e) => setSortType(e.target.value)}>
                                        <option value="-1">Descending</option>
                                        <option value="1">Ascending</option>
                                    </select>
                                </div>
                            )
                        }
                    </div>



                </div>

                <div className="items_cards_list">
                    {
                        loading ? <Loader /> :
                            <>

                                {courseDetail.length === 0 ? (
                                    <div className='not_available_text'>No Courses Available</div>
                                ) : (
                                    <>
                                        <div className="course_layout">

                                            {
                                                courseDetail.map((course: CourseType, index) => (

                                                    <div key={index} className="item_card">
                                                        {/* <div className="item_avatar" style={{ background: `linear-gradient(to right,  hsl(${index * 40}, 80%, 60%), hsl(${(index * 60) % 360}, 70%, 50%))` }}> */}
                                                        <div className="item_avatar">
                                                            <div>{course.coursename}</div>
                                                        </div>
                                                        <div className="item_details" onClick={() => sendData(course.coursename)} >
                                                            <div className='item_name'>Course Name: {course.coursename}</div>
                                                            <div className='item_description'>Description: {course.description}</div>
                                                        </div>
                                                        <div className="item_options">
                                                            {
                                                                user?.role === "admin" && (
                                                                    <div className="edit_image" onClick={(e: React.MouseEvent<HTMLDivElement>) => { setSelectedCourse(course); e.stopPropagation() }} >
                                                                        <EditComponent />
                                                                    </div>
                                                                )
                                                            }
                                                            <div className="edit_image" onClick={() => { setRateCourse(!rateCourse) }} >
                                                                <img src={theme === "light" ? RateStar_Light_Image : RateStar_Dark_Image} alt="" />
                                                            </div>
                                                        </div>

                                                    </div>


                                                ))
                                            }
                                        </div>
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
                                    </>
                                )}

                                <div className="bottom_line">
                                    <img src={Bottom_Line_Image} alt="" />
                                </div>
                                {selectedCourse && (
                                    <div className="add_new_material">
                                        <div className="add_new_material_form">
                                            <form action="">

                                                <div className="add_new_material_form_header">
                                                    <h2>Edit Course Details</h2>
                                                    <button type="button" onClick={() => { setSelectedCourse(null) }}>✕</button>
                                                </div>
                                                <div className="form_field">
                                                    <label htmlFor="coursename">Enter a Course Name</label>
                                                    <input
                                                        id="coursename"
                                                        type="text"
                                                        name="coursename"
                                                        value={editCoursename}
                                                        contentEditable="true"
                                                        onChange={(e) => setCoursename(e.target.value)}
                                                        placeholder="Course Name"
                                                    />
                                                </div>
                                                <div className="form_field">
                                                    <label htmlFor="description">Enter a Course Name</label>
                                                    <input
                                                        id="description"
                                                        name="description"
                                                        value={editCoursedescription}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        placeholder="Course Description"
                                                    />
                                                </div>
                                                <div className="form_field">
                                                    <label htmlFor="keywords">Enter a Course Name</label>
                                                    <input
                                                        id="keywords"
                                                        name="keywords"
                                                        value={editCoursekeywords}
                                                        onChange={(e) => setKeywords(e.target.value)}
                                                        placeholder="Course Keywords"
                                                    />
                                                </div>
                                                <button onClick={handleUpdate}>Update</button>
                                                <button onClick={handleDelete} style={{ backgroundColor: "red" }}>
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </div>

                                )}
                                {rateCourse && (
                                    <div className="add_new_material">
                                        <div className="add_new_material_form">
                                            <div className="add_new_material_form_header">
                                                <h2>Rate Course</h2>
                                                <button type="button" onClick={() => { setRateCourse(false) }}>✕</button>
                                            </div>
                                            <RatingComponent/>
                                        </div>
                                    </div>
                                )}
                            </>
                    }
                </div>
            </div>

        </>
    )
}
