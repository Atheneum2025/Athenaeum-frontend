import React, { useState, useEffect } from 'react'
import '../Subjects/Subjects.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuthenticatedUser } from '../../utils/authUtils';
// import '../Courses/Courses.css';

type UnitType = {
  _id: string;
  unitname: string;
  description: string;
};

export default function Unit() {
  const { user, isAuthenticated } = getAuthenticatedUser();

  const location = useLocation();
  const subjectName = location.state?.subjectName;
  const courseName = location.state?.courseName;

  const navigate = useNavigate();

  const { courseId, subjectId } = useParams<{ courseId: string, subjectId: string }>();

  // for making new unit
  const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
  const [unitname, setUnitname] = useState<string>("")
  const [description, setDescription] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");

  // for url params
  let courseIdParameter, subjectIdParameter;
  courseId ? courseIdParameter = courseId.toUpperCase() : courseIdParameter = courseName;
  subjectId ? subjectIdParameter = subjectId.toUpperCase() : subjectIdParameter = subjectName;

  // for displaying all units
  const [UnitDetails, setUnitDetails] = useState<UnitType[]>([]);

  // get all units from a subject and display
  useEffect(() => {

    const fetchdata = async () => {
      try {
        const unitResponse = await fetch(`http://localhost:3000/api/v1/course/${courseIdParameter}/subject/${subjectIdParameter}/unit`);
        const unitResult = await unitResponse.json();
        setUnitDetails(unitResult.units);
      }
      catch (error) {
        console.error(error);
      }
    }

    fetchdata();
  }, []);

  // function for creating a new unit in that subject
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/v1/course/${courseIdParameter}/subject/${subjectIdParameter}/unit`, { unitname, description, keywords }, {withCredentials: true});
      console.log("unit created", response.data);
      setFormIsVisible(false);
    }
    catch (err) {
      console.error("failed:", err);
      setFormIsVisible(false);
    }
  }


  const sendData = (unitname: string) => {
    navigate(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitname}/material`, { state: { courseName, subjectName, unitName: unitname } });
    // console.log(unitname)
  }
  return (
    <>

      <div>
        <div className='title'>Course Name - {courseIdParameter}</div>
        <div className='title'>Subject Name - {subjectIdParameter}</div>

        {/* form for making a new unit */}
        {
          isAuthenticated && (
            user.role === "admin" && (
              <>
                <button className='add-btn' id='btn' onClick={() => setFormIsVisible(true)}>Add New Unit</button>
                {
                  formIsVisible && (
                    <div className="form-for-adding-new">
                      <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="file">ENter a Unit Name</label>
                        <input type="text" id='file-name' value={unitname} onChange={(e) => setUnitname(e.target.value)} />
                        <label htmlFor="file">ENter Description</label>
                        <input type="text" id='file-name' value={description} onChange={(e) => setDescription(e.target.value)} />
                        <label htmlFor="keywords">Enter Keywords</label>
                        <input type="text" id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                        <button type='submit' >Save</button>
                        <button onClick={() => setFormIsVisible(false)}>Cancel</button>
                      </form>
                    </div>
                  )
                }
              </>
            )
          )
        }
        {/* Display all the units in a subject */}
        <div>Units</div>
        <div>
          {UnitDetails.map((unit: UnitType) => (
            <div key={unit._id} onClick={() => sendData(unit.unitname)}>
              <div>
                <div>{unit.unitname}</div>
              </div>
              <div className="course_details">
                <div className='course_name'>Unit Name: {unit.unitname}</div>
                <div className='course_description'>Description: {unit.description}</div>
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