import React, { useEffect, useState } from 'react'
import '../Courses/Courses.css'
import '../Subjects/Subjects.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAuthenticatedUser } from '../../utils/authUtils';
import Loader from '../../components/Loader/Loader';
import UserSidebar from '../../components/Sidebar/UserSidebar/UserSidebar';
import axiosInstance from '../../utils/axios';
import View_Light_Image from '../../assets/light_theme/viewLater.png';
import View_Dark_Image from '../../assets/dark_theme/viewLater.png';
import Document_Light_Image from '../../assets/light_theme/document.png';
import Document_Dark_Image from '../../assets/dark_theme/document.png'
import Video_Light_Image from '../../assets/light_theme/video.png';
import Video_Dark_Image from '../../assets/dark_theme/video.png'
import AddImage from '../../assets/add.png';
import EditComponent from '../../components/EditComponent/EditComponent';
import { useTheme } from "../../context/ThemeContext.tsx";

type MaterialType = {
  _id: string;
  materialname: string;
  description: string;
  isPublished: boolean;
  fileType: string;
  owner: string;
};

export default function Materials() {
  const { theme } = useTheme();
  const { user, isAuthenticated } = getAuthenticatedUser();

  const location = useLocation();
  const subjectName = location.state?.subjectName;
  const courseName = location.state?.courseName;
  const unitName = location.state?.unitName;

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false)


  const { courseId, subjectId, unitId } = useParams<{ courseId: string, subjectId: string, unitId: string }>();

  // for making new material
  const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
  const [materialname, setMaterialname] = useState<string>("")
  const [description, setDescription] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(null);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // for url params
  let courseIdParameter, subjectIdParameter, unitIdParameter;
  courseId ? courseIdParameter = courseId.toUpperCase() : courseIdParameter = courseName;
  subjectId ? subjectIdParameter = subjectId : subjectIdParameter = subjectName;
  unitId ? unitIdParameter = unitId : unitIdParameter = unitName;

  // for displaying all materials
  const [materialDetails, setMaterialDetails] = useState<MaterialType[]>([]);
  const [sidebarKey, setSidebarKey] = useState(0);

  // get all materials from a units and display
  // console.log(courseIdParameter)
  // console.log(subjectIdParameter)
  // console.log(unitIdParameter)

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("materialname");
  const [SortType, setSortType] = useState("-1");

  const fetchData = async () => {
    setLoading(true)
    try {
      const MaterialResponse = await axiosInstance.get(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitIdParameter}/material`, { params: { page, limit: 5, sortBy, SortType } });

      setMaterialDetails(MaterialResponse.data.materials);
      setTotalPages(MaterialResponse.data.totalPages);
      setLoading(false)
    }
    catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [page, sortBy, SortType]);
  // console.log(materialDetails)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]); // Store the selected file in state
    }
  };

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // function for creating a new material in that unit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("materialName", materialname);
    formData.append("description", description);
    formData.append("keywords", keywords);
    formData.append("file", file); // Append the file

    try {
      setUploading(true);
      setMessage("");
      const response = await axiosInstance.post(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitIdParameter}/material`, formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        },
        withCredentials: true
      });
      setMessage("Upload successful!");
      console.log("material created", response.data);
      setFormIsVisible(false);
      fetchData();
    }
    catch (err) {
      console.error("failed:", err);
      setFormIsVisible(false);
      setMessage("Upload failed. Please try again.");
    }
  }

  const handleUpdate = async () => {
    try {
      console.log(selectedMaterial?._id)
      const update = await axiosInstance.patch(`/course/${courseId}/subject/${subjectId}/unit/${unitId}/material/${selectedMaterial?._id}`, { materialname, description, keywords }, { withCredentials: true });
      console.log(update.data)
      alert("Unit updated successfully!");
      fetchData()
    } catch (error) {
      console.error(error);
      alert("Failed to update course.");
    }
    setMaterialname(" ");
    setDescription(" ");
    setKeywords(" ");
  };

  // Delete course
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/course/${courseId}/subject/${subjectId}/unit/${unitId}/material/${selectedMaterial?._id}`, { withCredentials: true });
        alert("Course deleted successfully!");
        fetchData();
      } catch (error) {
        console.error(error);
        alert("Failed to delete course.");
      }
    }
  };

  const sendData = (materialname: string) => {
    navigate(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitIdParameter}/material/${materialname}`, { state: { courseName, subjectName, unitName, materialName: materialname } });
    // console.log(material)
  }

  // drag feature
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, material: MaterialType) => {
    event.dataTransfer.setData('application/json', JSON.stringify(material));
  }
  const saveToViewLater = async (vLMaterialName: string) => {

    try {
      const response = await axiosInstance.post(`/viewLater/`, { vLMaterialName }, { withCredentials: true })
      setSidebarKey(prevKey => prevKey + 1);
      console.log(response)
      // setDroppedItems((prev) => [...prev, droppedItem]);
    } catch (error: any) {
      console.error(error.status)
      if (error.status === 400) {
        setIsPopup(true)
      }
    }
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('application/json');
    const droppedItem: MaterialType = JSON.parse(data);
    const vLMaterialName = droppedItem._id
    saveToViewLater(vLMaterialName);
    // console.log(droppedItems)
  }


  return (
    <>
      <div className='title' onClick={() => { navigate(`/course/`) }}>Course Name : {courseIdParameter}</div>
      <div className='title' onClick={() => { navigate(`/course/${courseIdParameter}/subject`) }}>Subject Name : {subjectIdParameter}</div>
      <div className='title' onClick={() => { navigate(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit`) }}>Unit Name : {unitIdParameter}</div>
      <div className='material_main_layout'>

        <div className='items_display_page materials_page'>
          <div className="items_display_header">
            <h1>Materials :</h1>
            {/* form for making a new material */}
            {
              isAuthenticated && (
                user.role === "admin" && (
                  <>
                    <button className='add_btn' onClick={() => setFormIsVisible(true)}>
                      <img src={AddImage} alt="" />
                      <div>Add New Material</div>
                    </button>
                    {
                      formIsVisible && (
                        <div className="add_new_material">
                          <div className="add_new_material_form">
                            <form action="" onSubmit={handleSubmit}>
                              <div className="add_new_material_form_header">
                                <h2>Add New Material</h2>
                                <button type="button" onClick={() => { setFormIsVisible(false) }}>✕</button>
                              </div>
                              <div className="form_field">
                                <label htmlFor="file">ENter a Material Name</label>
                                <input type="text" id='file-name' value={materialname} onChange={(e) => setMaterialname(e.target.value)} />
                              </div>
                              <div className="form_field">
                                <label htmlFor="file">ENter Description</label>
                                <input type="text" id='file-name' value={description} onChange={(e) => setDescription(e.target.value)} />
                              </div>
                              {/* <select name="" id="">
                                <option value="document">Document</option>
                                <option value="video">Video</option>
                              </select> */}
                              <div className="form_field">
                                <label htmlFor="keywords">Enter Keywords</label>
                                <input type="text" id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                              </div>

                              {/* <label htmlFor="file">Upload a file</label>
                              <input type="file" onChange={handleFileChange} /> */}
                              <div className="upload_section">
                                <label>Upload File</label>
                                <div className="">
                                  <label className="">
                                    <span className="text-gray-400 mb-2">
                                      <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                      </svg>
                                    </span>
                                    <span>Click to upload or drag and drop</span>
                                    <input
                                      type="file"
                                      className="hidden"
                                      onChange={handleFileChange}
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="upload_btns">
                                <button type="button" onClick={() => setFormIsVisible(false)}>Cancel</button>
                                <button type="submit">Upload Material</button>
                              </div>
                              {/* <button type='submit'>Save</button>
                              <button onClick={() => setFormIsVisible(false)}>Cancel</button> */}
                              {uploading && (
                                <div className="progress-bar-container">
                                  <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
                                    {uploadProgress}%
                                    {uploadProgress === 100 ? (
                                      <div>uploading to cloud</div>
                                    ) : (
                                      <div>please wait</div>
                                    )}
                                  </div>
                                </div>
                              )}
                              {message && <p>{message}</p>}
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
              <div onClick={() => setShowFilters(!showFilters)}>Filter  </div>
              {
                showFilters && (
                  <div className='filters'>
                    <select onChange={(e) => setSortBy(e.target.value)}>
                      <option value="createdAt">Newest First</option>
                      <option value="materialname">Material Name</option>
                      <option value="professorname">Professor's Name</option>
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
          {/* Display all the materials in a unit */}

          <div className="items_cards_list" >
            {
              loading ? <Loader /> :
                <>
                  {
                    materialDetails.length === 0 ? (
                      <div className='not_available_text'>No Materials Found</div>
                    ) : (
                      <>
                        {
                          materialDetails
                            .filter((material: MaterialType) => material.isPublished === true)
                            .map((material: MaterialType, index) => (
                              <div className='secondary_item_card tertiary_item_card' key={material._id} onClick={() => sendData(material._id)} draggable={true} onDragStart={(e) => handleDragStart(e, material)}>
                                <div className="index">{index + 1}.</div>
                                <div className='item_type'>
                                  {
                                    material.fileType === "raw" ? (
                                      <>
                                        <img src={theme === "light" ? Document_Light_Image : Document_Dark_Image} alt="" />
                                      </>
                                    ) : (
                                      <>
                                        <img src={theme === "light" ? Video_Light_Image : Video_Dark_Image} alt="" />
                                      </>
                                    )
                                  }
                                </div>
                                <div className="item_details">
                                  <div className="item_name">Material Name: {material.materialname}</div>
                                  <div className="item_description">Description: {material.description}</div>
                                  <div className="item_description">Professor: {material.owner}</div>
                                </div>
                                <div className='save_image' onClick={(e: React.MouseEvent<HTMLDivElement>) => { saveToViewLater(material._id); e.stopPropagation() }} >
                                  <img src={theme === "light" ? View_Light_Image : View_Dark_Image} alt="" />
                                </div>
                                {
                                  user.role === "admin" && (
                                    <div className='edit_image' onClick={(e: React.MouseEvent<HTMLDivElement>) => { setSelectedMaterial(material); e.stopPropagation() }} >
                                      <EditComponent />
                                    </div>
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

                  {selectedMaterial && (
                    <div className="course_form">
                      <h3>Edit Course</h3>
                      <input
                        type="text"
                        name="coursename"
                        value={materialname}
                        onChange={(e) => setMaterialname(e.target.value)}
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

        <div className='viewLaterSidebar' onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}>
          <UserSidebar key={sidebarKey} />
        </div>

        {
          isPopup && (
            <div className="popupMessage">
              Allready added
              <button onClick={() => setIsPopup(false)} >Close</button>
            </div>
          )
        }
        {/* <div>Browse More Materials</div> */}

      </div>
    </>
  )
}
