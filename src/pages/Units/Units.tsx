import React, { useState, useEffect } from 'react'
import '../Subjects/Subjects.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { getAuthenticatedUser } from '../../utils/authUtils';
import Loader from '../../components/Loader/Loader';
import AddImage from '../../assets/add.png';
import EditComponent from '../../components/EditComponent/EditComponent';

type UnitType = {
  _id: string;
  unitname: string;
  description: string;
};

export default function Units() {
  const { user, isAuthenticated } = getAuthenticatedUser();

  const location = useLocation();
  const subjectName = location.state?.subjectName;
  const courseName = location.state?.courseName;

  const navigate = useNavigate();

  const { courseId, subjectId } = useParams<{ courseId: string, subjectId: string }>();

  const [loading, setLoading] = useState<boolean>(false)
  // for making new unit
  const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
  const [unitname, setUnitname] = useState<string>("")
  const [description, setDescription] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<UnitType | null>(null);


  // for url params
  let courseIdParameter, subjectIdParameter;
  courseId ? courseIdParameter = courseId.toUpperCase() : courseIdParameter = courseName;
  subjectId ? subjectIdParameter = subjectId : subjectIdParameter = subjectName;

  // for displaying all units
  const [UnitDetails, setUnitDetails] = useState<UnitType[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("unitname");
  const [SortType, setSortType] = useState("-1");
  // get all units from a subject and display
  const fetchData = async () => {
    setLoading(true)
    try {
      const unitResponse = await axiosInstance.get(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit`, { params: { page, limit: 5, sortBy, SortType } });
      setUnitDetails(unitResponse.data.units);
      setTotalPages(unitResponse.data.totalPages)
      setLoading(false)
    }
    catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [page, sortBy, SortType]);

  // function for creating a new unit in that subject
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit`, { unitname, description, keywords }, { withCredentials: true });
      console.log("unit created", response.data);
      setFormIsVisible(false);
      fetchData();
    }
    catch (err) {
      console.error("failed:", err);
      setFormIsVisible(false);
    }
  }

  const handleUpdate = async () => {
    try {
      console.log(selectedUnit?._id)
      const update = await axiosInstance.patch(`/course/${courseId}/subject/${subjectId}/unit/${selectedUnit?.unitname}`, { unitname, description, keywords }, { withCredentials: true });
      console.log(update.data)
      alert("Unit updated successfully!");
      fetchData()
    } catch (error) {
      console.error(error);
      alert("Failed to update course.");
    }
    setUnitname(" ");
    setDescription(" ");
    setKeywords(" ");
  };

  // Delete course
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/course/${courseId}/subject/${subjectId}/unit/${selectedUnit?.unitname}`, { withCredentials: true });
        alert("Course deleted successfully!");
        fetchData();
      } catch (error) {
        console.error(error);
        alert("Failed to delete course.");
      }
    }
  };

  const sendData = (unitname: string) => {
    navigate(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitname}/material`, { state: { courseName, subjectName, unitName: unitname } });
    // console.log(unitname)
  }
  return (
    <>

      <div className='title' onClick={() => { navigate(`/course/`) }}>Course Name : {courseIdParameter}</div>
      <div className='title' onClick={() => { navigate(`/course/${courseIdParameter}/subject`) }}>Subject Name : {subjectIdParameter}</div>
      <div className='items_display_page'>
        <div className='items_display_header'>

          <h1>Units :</h1>
          {/* form for making a new unit */}
          {
            isAuthenticated && (
              user.role === "admin" && (
                <>
                  <button className='add_btn' onClick={() => setFormIsVisible(true)}>
                    <img src={AddImage} alt="" />
                    <div>Add New Unit</div>
                  </button>
                  {
                    formIsVisible && (
                      <div className="add_new_material">
                        <div className='add_new_material_form'>

                          <form action="" onSubmit={handleSubmit}>
                            <div className="add_new_material_form_header">
                              <h2>Create New Unit</h2>
                              <button type="button" onClick={() => { setFormIsVisible(false) }}>✕</button>
                            </div>
                            <div className="form_field">
                              <label htmlFor="file">ENter a Unit Name</label>
                              <input type="text" id='file-name' value={unitname} onChange={(e) => setUnitname(e.target.value)} />
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
                            {/* <button type='submit' >Save</button>
                          <button onClick={() => setFormIsVisible(false)}>Cancel</button> */}
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
            <div>Filter  </div>
            {/* <div>
              <select onChange={(e) => setSortBy(e.target.value)}>
                <option value="createdAt">Newest First</option>
                <option value="unitname">Unit Name</option>
              </select>
              <select onChange={(e) => setSortType(e.target.value)}>
                <option value="-1">Descending</option>
                <option value="1">Ascending</option>
              </select>
            </div> */}
          </div>
        </div>
        {/* Display all the units in a subject */}
        <div className="items_cards_list">
          {
            loading ? <Loader /> :
              <>
                {
                  UnitDetails.length === 0 ? (
                    <div className='not_available_text'>No Units Found</div>
                  ) : (
                    <>
                      {
                        UnitDetails.map((unit: UnitType, index) => (
                          <>
                            <div className="secondary_item_card" key={index} onClick={() => sendData(unit.unitname)}>
                              <div className="index">{index+1}.</div>
                              <div className="item_details">
                                <div className="item_name">Unit Name: {unit.unitname}</div>
                                <div className="item_description">Description: {unit.description}</div>
                              </div>
                              {
                                user.role === "admin" && (
                                  <div className="edit_image" onClick={(e: React.MouseEvent<HTMLDivElement>) => { setSelectedUnit(unit); e.stopPropagation() }} >
                                    <EditComponent/>
                                  </div>
                                )
                              }
                              {/* Pagination */}
                            </div>

                          </>
                        ))
                      }
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

                {selectedUnit && (
                  <div className="course_form">
                    <h3>Edit Course</h3>
                    <input
                      type="text"
                      name="coursename"
                      value={unitname}
                      onChange={(e) => setUnitname(e.target.value)}
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