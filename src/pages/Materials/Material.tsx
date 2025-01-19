import React, { useEffect, useState } from 'react'
import '../Courses/Courses.css'
import '../Subjects/Subjects.css'
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type MaterialType = {
  _id: string;
  materialname: string;
  description: string;
  isPublished: boolean;
};

export default function Material() {

  const location = useLocation();
  const subjectName = location.state?.subjectName;
  const courseName = location.state?.courseName;
  const unitName = location.state?.unitName;

  const navigate = useNavigate();

  const {courseId, subjectId, unitId} = useParams<{courseId: string, subjectId: string, unitId: string}>();

// for making new material
  const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
  const [materialname, setMaterialname] = useState<string>("")
  const [description, setDescription] = useState<string>("");

  // for url params
  let courseIdParameter, subjectIdParameter, unitIdParameter;
  courseId ? courseIdParameter = courseId.toUpperCase() : courseIdParameter = courseName;
  subjectId ? subjectIdParameter = subjectId.toUpperCase() : subjectIdParameter = subjectName;
  unitId ?unitIdParameter = unitId : unitIdParameter = unitName;

  // for displaying all materials
  const [materialDetails, setMaterialDetails] = useState<MaterialType[]>([]);

// get all materials from a units and display
console.log(courseIdParameter)
console.log(subjectIdParameter)
console.log(unitIdParameter)

useEffect(() => {
  
  const fetchdata = async () => {
      try {
          const materialResponse = await fetch(`http://localhost:3000/api/v1/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitIdParameter}/material`);
          const materialResult = await materialResponse.json();
          setMaterialDetails(materialResult.materials);
      }
      catch (error) {
          console.error(error);
      }
  }

  fetchdata();
}, []);
console.log(materialDetails)

// function for creating a new material in that unit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/v1/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitIdParameter}/material`, { materialname, description });
      console.log("material created", response.data);
      setFormIsVisible(false);
    }
    catch (err) {
      console.error("failed:", err);
      setFormIsVisible(false);
    }
  }

  

  
      

      const sendData = (materialname: string) => {
        navigate(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitIdParameter}/material/${materialname}`, { state: {courseName, subjectName, unitName, materialName: materialname } });
        // console.log(material)
      }

  return (
    <>
    
    <div>
        <div className='title'>Course Name - {courseIdParameter}</div>
        <div className='title'>Subject Name - {subjectIdParameter}</div>
        <div className='title'>Unit Name - {unitIdParameter}</div>

{/* form for making a new material */}
        <button className='add-btn' id='btn' onClick={() => setFormIsVisible(true)}>Add New Material</button>
        {
          formIsVisible && (
            <div className="form-for-adding-new">
              <form action="" onSubmit={handleSubmit}>
                <label htmlFor="file">ENter a Material Name</label>
                <input type="text" id='file-name' value={materialname} onChange={(e) => setMaterialname(e.target.value)} />
                <label htmlFor="file">ENter Description</label>
                <input type="text" id='file-name' value={description} onChange={(e) => setDescription(e.target.value)} />
                <label htmlFor="file">Upload a file</label>
                <input type="file" />

                <button type='submit'>Save</button>
                <button onClick={() => setFormIsVisible(false)}>Cancel</button>
              </form>
            </div>
          )
        }
        <button className='add-btn' id='btn' onClick={() => setFormIsVisible(true)}>Add New Material</button>
{/* Display all the materials in a unit */}
        <div>Materials</div>
        <div>
                    {materialDetails
                      .filter((material: MaterialType) => material.isPublished === true)
                      .map((material:MaterialType) => (
                        <div key={material._id}  onClick={() => sendData(material.materialname)}>
                            <div>
                                <div>{material.materialname}</div>
                            </div>
                            <div className="course_details">
                                <div className='course_name'>Material Name: {material.materialname}</div>
                                <div className='course_description'>Description: {material.description}</div>
                                <div className='course_ratings'>star star star star star</div>
                                <div className="course_like">Liked</div>
                                <div>Subjects no.: 45</div>
                            </div>
                        </div>
                    ))}                
                </div>
      </div>
    </>
  )
}
