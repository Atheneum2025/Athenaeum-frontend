import React, { useState } from "react";
import LikedVideos from "../../../components/LikedVideos/LikedVideos";
import HistoryVideos from "../../../components/History/HistoryVideos";
import MyMaterial from "../../../components/MyMaterial/MyMaterial.tsx"
import AllUsers from "../../../components/AllUsers/AllUsers";
import AdminAnalytics from "../../../components/Analytics/AdminAnalytics";
import axiosInstance from "../../../utils/axios.ts";
import '../ProfilePage.css'

interface AdmintDashboardProps {
  user: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };
}
function AdminsDashboard({user}: AdmintDashboardProps) {

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
      const response = await axiosInstance.post(`/course/${courseId}/subject/${subjectId}/unit/${unitId}/material`, { materialname, description });
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
      <div className="user_profile">
        <h1>Welcome {user.role}</h1>
        <div className='user_avatar'>
          <img src="" alt="" />
          <div>{user.username}</div>
        </div>
        <div className="user_details">
          <div>Email : {user.email}</div>
          <div>Id : {user._id}</div>
        </div>
      </div>

      <div className='form_for_adding'>
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
      <ul className='user_profile_options'>
        <div className={`options ${activePage === 1 ? "active" : ""}`} onClick={show(1)}>Professors</div>
        <div className={`options ${activePage === 2 ? "active" : ""}`} onClick={show(2)}>Students</div>
        <div className={`options ${activePage === 3 ? "active" : ""}`} onClick={show(3)}>My History</div>
        <div className={`options ${activePage === 4 ? "active" : ""}`} onClick={show(4)}>My Material</div>
        <div className={`options ${activePage === 5 ? "active" : ""}`} onClick={show(5)}>Analytics</div>
      </ul>
      <div className='user_profile_options_display'>
        <div id='1' className={`options_page ${activePage === 1 ? "active" : ""}`}>
          {/* list of professors */}
          <AllUsers role={"professors"} />
        </div>
        <div id='2' className={`options_page ${activePage === 2 ? "active" : ""}`}>
          {/* list of students */}
          <AllUsers role={"students"} />

        </div>
        <div id='3' className={`options_page ${activePage === 3 ? "active" : ""}`}>
          {/* list of all materials */}
          <HistoryVideos />
        </div>
        <div id='4' className={`options_page ${activePage === 4 ? "active" : ""}`}>
          <MyMaterial _id={user._id} />
        </div>
        <div id='5' className={`options_page ${activePage === 5 ? "active" : ""}`}>
          {/* <MyMaterial /> */}
          <AdminAnalytics/>
        </div>
      </div>
    </>
  );
}

export default AdminsDashboard;
