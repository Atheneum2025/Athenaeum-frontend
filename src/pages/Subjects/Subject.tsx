import './Subjects.css'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { getAuthenticatedUser } from '../../utils/authUtils';
import Loader from '../../components/Loader/Loader';

type SubjectType = {
  _id: string;
  subjectname: string;
  description: string;
};

export default function Subject() {
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

  const [confirmIsVisible, setconfirmIsVisible] = useState<boolean>(false);


  // for url params
  let courseIdParameter;
  courseId ? courseIdParameter = courseId.toUpperCase() : courseIdParameter = courseName;

  // for displaying all subjects
  const [subjectDetails, setSubjectDetails] = useState<SubjectType[]>([]);

  // get all subjects from a course and display
  const fetchData = async () => {
    setLoading(true)
    try {
      const subjectResponse = await fetch(`http://localhost:3000/api/v1/course/${courseIdParameter}/subject`);
      const subjectResult = await subjectResponse.json();
      setSubjectDetails(subjectResult.subjects);
      setLoading(false)
    }
    catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log(subjectDetails)

  // function for creating a new subject in that course
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/v1/course/${courseIdParameter}/subject`, { subjectname, description, keywords }, { withCredentials: true });
      console.log("subject created", response.data);
      setFormIsVisible(false)
      fetchData();
    }
    catch (err) {
      console.error("failed:", err);
      setFormIsVisible(false)
    }
  }

  const deleteCourse = async (_id: string) => {
    try {
      setconfirmIsVisible(true);
      // const response = await axiosInstance.delete(`/api/v1/course/${_id}`, { withCredentials: true });
      // console.log(response);
      // setconfirmIsVisible(false)
      fetchData();
    } catch (error) {
      console.error(error);
      setconfirmIsVisible(false)
    }
  }

  const updateCourse = async (_id: string) => {

  }

  // sending subjectName to unit component
  const sendData = (subjectname: string) => {
    navigate(`/course/${courseIdParameter}/subject/${subjectname}/unit`, { state: { courseName, subjectName: subjectname } });
    // console.log(subjectname)
  }
  return (

    <>
      <div>
        <div className='title'>Course Name : {courseIdParameter}</div>

        {/* form for making a new subject */}
        {
          isAuthenticated && (
            user.role === "admin" && (
              <>
                <button className='add-btn' id='btn' onClick={() => setFormIsVisible(true)}>Add New Subject</button>
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
        {/* Display all the subjects in a course */}
        <div>Subjects</div>
        <select name="" id=""> 
          <option value="">Filter By</option>
          <option value="">A - Z</option>
          <option value="">Z - A</option>
          <option value="">Newest</option>
        </select>
        

        {
          confirmIsVisible && (
            user.role === "admin" && (
              <>
                <div className='form_for_adding_new'>
                  <div>Do you wanna delete this course</div>
                  <button>yes</button>
                  <button>cancel</button>
                </div>
              </>
            )
          )
        }
        {/* <button onClick={() => deleteCourse(course._id)} >Delete</button>
        <button onClick={() => updateCourse(course._id)} >Edit</button> */}
        <div>
          {
            loading ? <Loader /> :
              <>
                {
                  subjectDetails.length === 0 ? (
                    <div>No Subjects Found</div>
                  ) : (
                    subjectDetails.map((subject: SubjectType) => (
                      <div key={subject._id} onClick={() => sendData(subject.subjectname)}>
                        <div>
                          <div>{subject.subjectname}</div>
                        </div>
                        <div className="course_details">
                          <div className='course_name'>Subject Name: {subject.subjectname}</div>
                          <div className='course_description'>Description: {subject.description}</div>
                          <div className='course_ratings'>star star star star star</div>
                          <div>Subjects no.: 45</div>
                        </div>
                      </div>
                    )
                    ))
                }
              </>
          }
        </div>
      </div>
    </>
  )
}
