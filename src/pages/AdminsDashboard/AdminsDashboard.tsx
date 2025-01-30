import React, { useState } from "react";
import LikedVideos from "../StudentDashboard/LikedVideos/LikedVideos";
import HistoryVideos from "../StudentDashboard/History/HistoryVideos";
import MyMaterial from "../StudentDashboard/MyMaterial/MyMaterial";
import AllUsers from "../../components/AllUsers/AllUsers";

function AdminsDashboard() {

  const [activePage, setActivePage] = useState<number>(1);

  const show = (id: number) => () => {
    setActivePage(id);
    console.log(id);
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
          {/* <AllUsers users={undefined} /> */}
        </div>
        <div id='2' className={`options-page ${activePage === 2 ? "active" : ""}`}>
          {/* list of students */}
          {/* AllUsers students */}
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
