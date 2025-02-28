import axiosInstance from '../../utils/axios';
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useLocation, useNavigate, useParams } from 'react-router-dom';


type VideoType = {
  material: any;
  _id: string;
  materialName: string;
  url: string;
  fileType: string;
}
const MaterialDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subjectName = location.state?.subjectName;
  const courseName = location.state?.courseName;
  const unitName = location.state?.unitName;
  const materialNamel = location.state?.materialName;

  const { courseId, subjectId, unitId, materialName } = useParams<{ courseId: string, subjectId: string, unitId: string, materialName: string }>();
  console.log(materialName)
  let courseIdParameter, subjectIdParameter, unitIdParameter, materialIdParameter;
  courseId ? courseIdParameter = courseId.toUpperCase() : courseIdParameter = courseName;
  subjectId ? subjectIdParameter = subjectId.toUpperCase() : subjectIdParameter = subjectName;
  unitId ? unitIdParameter = unitId : unitIdParameter = unitName;
  materialName ? materialIdParameter = materialName : materialIdParameter = materialNamel;

  const [materialUrl, setMaterialUrl] = useState<VideoType>()

  const [isSaved, setIsSaved] = useState<boolean>(false)

  useEffect(() => {

    const fetchdata = async () => {
      try {
        const url = await axiosInstance.get<VideoType>(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitIdParameter}/material/${materialIdParameter}/`, { withCredentials: true });
        setMaterialUrl(url.data);
      }
      catch (error) {
        console.error(error);
      }
    }

    fetchdata();
  }, []);

  const saveMaterial = async () => {
    try {
      const response = await axiosInstance.post(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitIdParameter}/material/${materialIdParameter}/save/`, {}, { withCredentials: true });
      setIsSaved(response.data.isSaved);
    } catch (error) {
      console.error(error)
    }
  }


  // console.log(materialUrl)
  return (
    <>
      <div className='title' onClick={() => { navigate(`/course/`) }}>Course Name - {courseIdParameter}</div>
      <div className='title' onClick={() => { navigate(`/course/${courseIdParameter}/subject/`) }}>Subject Name - {subjectIdParameter}</div>
      <div className='title' onClick={() => { navigate(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit`) }}>Unit Name - {unitIdParameter}</div>
      <div className='title' onClick={() => { navigate(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitIdParameter}/material/`) }}>Material Name - {materialUrl?.material.materialname}</div>

      <div className="items_display_page" >
        {
          materialUrl?.material.fileType === 'raw' ? (
            <>
              <div>Material Name : {materialUrl?.material.materialname}</div>
              <div>Description : {materialUrl?.material.description}</div>
              <div>Uploaded By : {materialUrl?.material.owner}</div>
              <div>{materialUrl?.material.fileType}</div>
              {
                isSaved ? (
                  <button style={{ backgroundColor: "white" }} onClick={() => saveMaterial()} >Unsave Material</button>
                ) : (
                  <button style={{ backgroundColor: "green" }} onClick={() => saveMaterial()} >Save Material</button>
                )
              }
              <div><a href={materialUrl?.material.materialURL} download >Download Material</a></div>
              <iframe src={`${materialUrl?.material.materialURL}`} width="100%" height="600px"></iframe>

            </>

          ) : (
            <div>
              <div>video player</div>
              <div className='video-display' >
                <ReactPlayer url={`${materialUrl?.material.materialURL}`}
                  // width="1080px"
                  // height="720px"
                  width="600px"
                  height="300px"
                  controls={true}
                />
                <div>Material Name : {materialUrl?.material.materialname}</div>
                <div>{materialUrl?.material._id}</div>
                <div>Description : {materialUrl?.material.description}</div>
                <div>Uploaded By : {materialUrl?.material.owner}</div>
                <div>{materialUrl?.material.fileType}</div>

                {
                  isSaved ? (
                    <button style={{ backgroundColor: "white" }} onClick={() => saveMaterial()} >Unsave Material</button>
                  ) : (
                    <button style={{ backgroundColor: "green" }} onClick={() => saveMaterial()} >Save Material</button>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
      <div>View More Material</div>
    </>
  );
};

export default MaterialDisplay;
