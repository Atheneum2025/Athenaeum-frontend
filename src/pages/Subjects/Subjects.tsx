import './Subjects.css'
import '../Courses/Courses.css'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from '../../utils/axios';
import { getAuthenticatedUser } from '../../utils/authUtils';
import Loader from '../../components/Loader/Loader';

type SubjectType = {
  _id: string;
  subjectname: string;
  description: string;
};

export default function Subjects() {
  const { user, isAuthenticated } = getAuthenticatedUser();


  const location = useLocation();
  const courseName = location.state?.courseName;

  const navigate = useNavigate();

  const { courseId } = useParams<{ courseId: string }>();

  const [loading, setLoading] = useState<boolean>(false)

  // for making new subject
  const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
  const [subjectname, setSubjectname] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | null>(null);

  const [confirmIsVisible, setconfirmIsVisible] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("subjectname");
  const [SortType, setSortType] = useState("-1");

  // for url params
  let courseIdParameter;
  courseId ? courseIdParameter = courseId.toUpperCase() : courseIdParameter = courseName;

  // for displaying all subjects
  const [subjectDetails, setSubjectDetails] = useState<SubjectType[]>([]);

  // get all subjects from a course and display
  const fetchData = async () => {
    setLoading(true)
    try {
      const subjectResponse = await axiosInstance(`/course/${courseIdParameter}/subject`, { params: { page, limit: 5, sortBy, SortType } });

      setSubjectDetails(subjectResponse.data.subjects);
      setLoading(false)
      setTotalPages(subjectResponse.data.totalPages);
      console.log(totalPages)
      console.log(sortBy)
    }
    catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [page, sortBy, SortType]);
  console.log(subjectDetails)

  // function for creating a new subject in that course
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(`/course/${courseIdParameter}/subject`, { subjectname, description, keywords }, { withCredentials: true });
      console.log("subject created", response.data);
      setFormIsVisible(false)
      fetchData();
    }
    catch (err) {
      console.error("failed:", err);
      setFormIsVisible(false)
    }
  }


  const handleUpdate = async () => {
    try {
      console.log(selectedSubject?._id)
      const update = await axiosInstance.patch(`/course/${courseId}/subject/${selectedSubject?.subjectname}`, { subjectname, description, keywords }, { withCredentials: true });
      console.log(update.data)
      alert("Subject updated successfully!");
      fetchData()
    } catch (error) {
      console.error(error);
      alert("Failed to update course.");
    }
    setSubjectname(" ");
    setDescription(" ");
    setKeywords(" ");
  };

  // Delete course
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/course/${courseId}/subject/${selectedSubject?.subjectname}`, { withCredentials: true });
        alert("Course deleted successfully!");
        fetchData();
      } catch (error) {
        console.error(error);
        alert("Failed to delete course.");
      }
    }
  };

  // sending subjectName to unit component
  const sendData = (subjectname: string) => {
    navigate(`/course/${courseIdParameter}/subject/${subjectname}/unit`, { state: { courseName, subjectName: subjectname } });
    // console.log(subjectname)
  }
  return (

    <>
      <div className='title'>Course : {courseIdParameter}</div>
      <div className='items_display_page'>
        <div className="items_display_header">
          <h1>Subjects :</h1>
          {/* form for making a new subject */}
          {
            isAuthenticated && (
              user.role === "admin" && (
                <>
                  <button className='add-btn' id='btn' onClick={() => setFormIsVisible(true)}>
                    <div>+</div>
                    <div>Add New Subject</div>
                  </button>
                  {
                    formIsVisible && (
                      <div className="form-for-adding-new">
                        <form action="" onSubmit={handleSubmit}>
                          <label htmlFor="file">Enter a Subject Name</label>
                          <input type="text" id='file-name' value={subjectname} onChange={(e) => setSubjectname(e.target.value)} />
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
                <option value="subjectname">Subject Name</option>
              </select>
              <select onChange={(e) => setSortType(e.target.value)}>
                <option value="-1">Descending</option>
                <option value="1">Ascending</option>
              </select>
            </div>
          </div>
          {/* Display all the subjects in a course */}
        </div>




        {/* <button onClick={() => deleteCourse(course._id)} >Delete</button>
        <button onClick={() => updateCourse(course._id)} >Edit</button> */}
        <div className='items_cards_list'>
          {
            loading ? <Loader /> :
              <>
                {
                  subjectDetails.length === 0 ? (
                    <div className='not_available_text'>No Subjects Found</div>
                  ) : (
                    <>
                      {
                        subjectDetails.map((subject: SubjectType) => (

                          <div className='secondary_item_card' key={subject._id} onClick={() => sendData(subject.subjectname)}>

                            <div className="item_details">
                              <div className='item_name'>Subject Name: {subject.subjectname}</div>
                              <div className='item_description'>Description: {subject.description}</div>
                            </div>
                            {
                              user.role === "admin" && (
                                <div onClick={(e: React.MouseEvent<HTMLDivElement>) => { setSelectedSubject(subject); e.stopPropagation() }} >Edit</div>
                              )
                            }
                          </div>

                        ))
                      }
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
                  )
                }
                {selectedSubject && (
                  <div className="course_form">
                    <h3>Edit Course</h3>
                    <input
                      type="text"
                      name="subjectname"
                      value={subjectname}
                      onChange={(e) => setSubjectname(e.target.value)}
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
                <div>hello</div>
              </>
          }
        </div>
      </div>
    </>
  )
}
