import React, { useState } from "react";
import LikedVideos from "../StudentDashboard/LikedVideos/LikedVideos";
import HistoryVideos from "../StudentDashboard/History/HistoryVideos";
import MyMaterial from "../StudentDashboard/MyMaterial/MyMaterial";
import AllUsers from "../../components/AllUsers/AllUsers";
import axios from "axios";

function AdminsDashboard() {

  const [activePage, setActivePage] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [materialname, setMaterialname] = useState<string>("")
  const [description, setDescription] = useState<string>("");

  const show = (id: number) => () => {
    setActivePage(id);
    console.log(id);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let courseId = 'BCA'
    let subjectId = 'DSA'
    let unitId = 'Unit One'
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/course/${courseId}/subject/${subjectId}/unit/${unitId}/material`, { materialname, description });
      console.log("material created", response.data);
      setIsVisible(false);
    }
    catch (err) {
      console.error("failed:", err);
      setIsVisible(false);
    }
  }
  return (
    <>
      <div className="student_profile">
        <h1>Welcome Admin</h1>
        <div className='student_avatar'>
          <img src="" alt="" />
          <div>Rishon Valentino Fernandes</div>
        </div>
        <div className="student_details">
          <div>student email : athenaeum@gmail.com</div>
          <div>college info : St. Xavier's College Mapusa</div>
        </div>
      </div>

      <div className='form-for-adding'>
        <div>update profile details</div>
        <form action="">
          <label htmlFor="first_name">Edit First Name</label>
          <input type="text" id="first_name" />
          <label htmlFor="last_name">Edit Last Name</label>
          <input type="text" id="last_name" />

          <button type='submit'>Update Info</button>
        </form>
      </div>
      <div>
        <button className='add-btn' id='btn' onClick={() => setIsVisible(true)}>Add New Material</button>
        {
          isVisible && (
            <div className="form-for-adding-new">
              <form action="" onSubmit={handleSubmit}>
                <select name="" id="">
                  <option value="">Course</option>
                  <option value="">BCA</option>
                  <option value="">BBA</option>
                  <option value="">BA</option>
                </select>
                <select name="" id="">
                  <option value="">Subject</option>
                  <option value="">PSPC</option>
                  <option value="">DSA</option>
                  <option value="">DM</option>
                </select>
                <select name="" id="">
                  <option value="">Unit</option>
                  <option value="">Unit 1</option>
                  <option value="">Unit 2</option>
                  <option value="">Unit 3</option>
                </select>
                <label htmlFor="file">ENter a Material Name</label>
                <input type="text" id='file-name' value={materialname} onChange={(e) => setMaterialname(e.target.value)} />
                <label htmlFor="file">ENter Description</label>
                <input type="text" id='file-name' value={description} onChange={(e) => setDescription(e.target.value)} />
                <label htmlFor="file">Upload a file</label>
                <input type="file" />

                <button type='submit'>Save</button>
                <button onClick={() => setIsVisible(false)}>Cancel</button>
              </form>
            </div>
          )
        }

      </div>
      <ul className='student-profile-options' id='demo'>
        <div className={`options ${activePage === 1 ? "active" : ""}`} onClick={show(1)}>Professors</div>
        <div className={`options ${activePage === 2 ? "active" : ""}`} onClick={show(2)}>Students</div>
        <div className={`options ${activePage === 3 ? "active" : ""}`} onClick={show(3)}>All Material</div>
        <div className={`options ${activePage === 4 ? "active" : ""}`} onClick={show(4)}>My Material</div>
        <div className={`options ${activePage === 5 ? "active" : ""}`} onClick={show(5)}>Analytics</div>
      </ul>
      <div className='student-profile-options-display'>
        <div id='1' className={`options-page ${activePage === 1 ? "active" : ""}`}>
          {/* list of professors */}
          <AllUsers role={"professor"} _id={0} username={""} />
        </div>
        <div id='2' className={`options-page ${activePage === 2 ? "active" : ""}`}>
          {/* list of students */}
          AllUsers students
        </div>
        <div id='3' className={`options-page ${activePage === 3 ? "active" : ""}`}>
          {/* list of all materials */}
          <HistoryVideos />
        </div>
        <div id='4' className={`options-page ${activePage === 4 ? "active" : ""}`}>
          <MyMaterial />
        </div>
        <div id='5' className={`options-page ${activePage === 5 ? "active" : ""}`}>
          <MyMaterial />
        </div>
      </div>
    </>
  );
}

export default AdminsDashboard;
