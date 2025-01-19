import './Subjects.css'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

type SubjectType = {
  _id: string;
  subjectname: string;
  description: string;
};

export default function Subject() {
  const authToken = localStorage.getItem("authToken");
  let parsedToken
  authToken ? parsedToken = JSON.parse(authToken) : parsedToken = null;
  const user = parsedToken?.user;

  const location = useLocation();
  const courseName = location.state?.courseName;

  const navigate = useNavigate();

  const { courseId } = useParams<{ courseId: string }>();


  // for making new subject
  const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
  const [subjectname, setSubjectname] = useState<string>("")
  const [description, setDescription] = useState<string>("");

  // for url params
  let courseIdParameter;
  courseId ? courseIdParameter = courseId.toUpperCase() : courseIdParameter = courseName;

  // for displaying all subjects
  const [subjectDetails, setSubjectDetails] = useState<SubjectType[]>([]);

  // get all subjects from a course and display
  useEffect(() => {

    const fetchdata = async () => {
      try {
        const subjectResponse = await fetch(`http://localhost:3000/api/v1/course/${courseIdParameter}/subject`);
        const subjectResult = await subjectResponse.json();
        setSubjectDetails(subjectResult.subjects);
      }
      catch (error) {
        console.error(error);
      }
    }

    fetchdata();
  }, []);
  console.log(subjectDetails)

  // function for creating a new subject in that course
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/v1/course/${courseIdParameter}/subject`, { subjectname, description });
      console.log("subject created", response.data);
      setFormIsVisible(false)
    }
    catch (err) {
      console.error("failed:", err);
      setFormIsVisible(false)
    }
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
                      <button type='submit'>Save</button>
                      <button onClick={() => setFormIsVisible(false)}>Cancel</button>
                    </form>
                  </div>
                )
              }
            </>
          )
        }
        {/* Display all the subjects in a course */}
        <div>Subjects</div>
        <div>Filters -_-</div>
        <div>
          {subjectDetails.map((subject: SubjectType) => (
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
          ))}
        </div>
      </div>
    </>
  )
}
