import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { data, useLocation, useParams } from 'react-router-dom';

// interface VideoDisplayProps {
//     url: string;
// }
type VideoType = {
  material: any;
  _id: string;
  materialName: string;
  url: string;
  fileType: string;
}
const VideoPlayer = () => {
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

  useEffect(() => {

    const fetchdata = async () => {
      try {
        const url = await axios.get<VideoType>(`http://localhost:3000/api/v1/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitIdParameter}/material/${materialIdParameter}/`, { withCredentials: true });

        setMaterialUrl(url.data);
        console.log(url.data.material._id)
      }
      catch (error) {
        console.error(error);
      }
    }

    fetchdata();
  }, []);

  const saveMaterial = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitIdParameter}/material/${materialIdParameter}/save/`, {}, { withCredentials: true });
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  
  // console.log(materialUrl)
  return (
    <>
      {
        materialUrl?.material.fileType === 'raw' ? (
          <>
            <div>Material Name : {materialUrl?.material.materialname}</div>
            <div>{materialUrl?.material._id}</div>
            <div>Description : {materialUrl?.material.description}</div>
            <div>Uploaded By : {materialUrl?.material.owner}</div>
            <div>{materialUrl?.material.fileType}</div>
            <button onClick={() => saveMaterial()} >Save Material</button>

            <iframe src={`${materialUrl?.material.materialURL}`} width="100%" height="600px"></iframe>
            {/* <iframe src={`${materialUrl?.material.materialURL}`} width="100%" height="600px"></iframe> */}

          </>

        ) : (
          <div>
            <div>video player</div>
            <div className='video-display' >
              {/* <img src={`${materialUrl?.material.materialURL}`} alt="" width="200px" height="200px" /> */}
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

              <button onClick={() => saveMaterial()} >Save Material</button>
            </div>
          </div>
        )
      }
      <div>View More Material</div>
    </>
  );
};

export default VideoPlayer;
