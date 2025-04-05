import axios from 'axios';
import axiosInstance from '../../utils/axios';
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "./MaterialDisplay.css";
import Loader from '../../components/Loader/Loader';
import { getAuthenticatedUser } from '../../utils/authUtils';

type VideoType = {
  material: any;
  _id: string;
  materialName: string;
  url: string;
  fileType: string;
}

type MaterialType = {
  materialname: string;
  isPublished: boolean;
  owner: string;
};
const MaterialDisplay = () => {
  const { user, isAuthenticated } = getAuthenticatedUser();
  const apiKeyE = import.meta.env.VITE_APIKEY;
  const ttsUrlE = import.meta.env.VITE_TTSURL
  const navigate = useNavigate();
  const location = useLocation();
  const subjectName = location.state?.subjectName;
  const courseName = location.state?.courseName;
  const unitName = location.state?.unitName;
  const materialNamel = location.state?.materialName;
  const [loading, setLoading] = useState<boolean>(false)
  const [viewMoreMaterials, setViewMoreMaterials] = useState<MaterialType[]>([]);

  const { courseId, subjectId, unitId, materialName } = useParams<{ courseId: string, subjectId: string, unitId: string, materialName: string }>();
  console.log(materialName)
  let courseIdParameter, subjectIdParameter, unitIdParameter, materialIdParameter;
  courseId ? courseIdParameter = courseId : courseIdParameter = courseName;
  subjectId ? subjectIdParameter = subjectId : subjectIdParameter = subjectName;
  unitId ? unitIdParameter = unitId : unitIdParameter = unitName;
  materialName ? materialIdParameter = materialName : materialIdParameter = materialNamel;

  const [materialUrl, setMaterialUrl] = useState<VideoType>()

  const [isSaved, setIsSaved] = useState<boolean>(false)

  const fetchdata = async () => {
    setLoading(true)
    try {
      const url = await axiosInstance.get<VideoType>(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitIdParameter}/material/${materialIdParameter}/`, { withCredentials: true });
      setMaterialUrl(url.data);
      setLoading(false);
    }
    catch (error) {
      console.error(error);
    }
  }

  const fetchViewMoreMaterials = async () => {
    try {
      const moreMaterials = await axiosInstance.get('/material');
      setViewMoreMaterials(moreMaterials.data.materials);
      console.log(moreMaterials)
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchdata();
    fetchViewMoreMaterials();
  }, []);

  const saveMaterial = async () => {
    try {
      const response = await axiosInstance.post(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitIdParameter}/material/${materialIdParameter}/save/`, {}, { withCredentials: true });
      setIsSaved(response.data.isSaved);
    } catch (error) {
      console.error(error)
    }
  }

  const [isPaused, setIsPaused] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [textChunks, setTextChunks] = useState<string[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileUpload = async (url: string) => {
    // const file = event.target.files?.[0];
    // if (!file) return;

    // setLoading(true);

    const response = await fetch(url);
    const file = await response.blob();

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const pdfData = new Uint8Array(fileReader.result as ArrayBuffer);
      const pdf = await (window as any).pdfjsLib.getDocument(pdfData).promise;

      let text = "";
      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const textContent = await page.getTextContent();
        text += textContent.items.map((item: any) => item.str).join(" ") + " ";
      }

      const cleanedText = cleanText(text);
      const chunks = splitTextIntoChunks(cleanedText, 1000);
      setTextChunks(chunks);
      setCurrentChunkIndex(0);
      setPdfLoading(false);

      if (chunks.length > 0) {
        playChunksSequentially(chunks);
      }
    };

    fileReader.readAsArrayBuffer(file as Blob);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPaused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const cleanText = (text: string) => {
    return text.replace(/\s+/g, " ").trim();
  };

  const splitTextIntoChunks = (text: string, chunkSize: number) => {
    const words = text.split(" ");
    let chunks: string[] = [];
    let currentChunk = "";

    words.forEach((word) => {
      if (currentChunk.length + word.length + 1 > chunkSize) {
        chunks.push(currentChunk.trim());
        currentChunk = "";
      }
      currentChunk += word + " ";
    });

    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  };

  const playChunksSequentially = async (chunks: string[]) => {
    for (let i = 0; i < chunks.length; i++) {
      setCurrentChunkIndex(i);
      const audioContent = await sendToTTS(chunks[i]);
      if (audioContent) {
        await playAudio(audioContent);
      } else {
        console.error("Skipping chunk due to an error:", chunks[i]);
      }
    }
  };

  const sendToTTS = async (text: string) => {

    const apiKey = apiKeyE;
    const ttsUrl = ttsUrlE;
    const data = {
      input: { text },
      voice: {
        languageCode: "en-US",
        name: "en-US-Wavenet-A",
        ssmlGender: "NEUTRAL",
      },
      audioConfig: { audioEncoding: "MP3" },
    };

    try {
      const response = await axios.post(ttsUrl, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.audioContent) {
        return response.data.audioContent;
      } else {
        console.error("No audio content in TTS API response for chunk:", text);
        return null;
      }
    } catch (error) {
      console.error("Error with TTS API request:", error);
      return null;
    }
  };

  const playAudio = async (audioContent: string) => {
    return new Promise<void>((resolve) => {
      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
      audioRef.current = audio;
      audio.play();

      audio.onended = () => {
        resolve();
      };
    });
  };

  // console.log(materialUrl)
  return (
    <>
      <div className='title' onClick={() => { navigate(`/course/`) }}>Course Name - {courseIdParameter}</div>
      <div className='title' onClick={() => { navigate(`/course/${courseIdParameter}/subject/`) }}>Subject Name - {subjectIdParameter}</div>
      <div className='title' onClick={() => { navigate(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit`) }}>Unit Name - {unitIdParameter}</div>
      <div className='title' onClick={() => { navigate(`/course/${courseIdParameter}/subject/${subjectIdParameter}/unit/${unitIdParameter}/material/`) }}>Material Name - {materialUrl?.material.materialname}</div>

      <div className="items_display_page" >
        <div className="items_display_header">
          <h1>{materialUrl?.material.materialname}</h1>
        </div>

        <div className="items_cards_list">
          {
            loading ? <Loader width={35} height={15} top={50} color={"var(--secondary-color)"} /> :
              <>
                {
                  materialUrl?.material.fileType === 'raw' ? (
                    <>
                      <div className="video-section">
                        <div className="material_options">
                          <div className='material_info'>
                            <div>Material Title : {materialUrl?.material.materialname}</div>
                            <div>Description : {materialUrl?.material.description}</div>
                            <div>Uploaded By : {materialUrl?.material.owner}</div>
                            {/* <div>{materialUrl?.material.fileType}</div> */}
                            {
                              user && (
                                <div className="material_user_buttons">{

                                  isSaved ? (
                                    <button className="save-button" style={{ backgroundColor: "transparent", color: "white" }} onClick={() => saveMaterial()} >Unsave Material</button>
                                  ) : (
                                    <button className="save-button" style={{ backgroundColor: "gold" }} onClick={() => saveMaterial()} >Save Material</button>
                                  )
                                }
                                  <div className="download-button" ><a href={materialUrl?.material.materialURL} download >Download Material</a></div>

                                </div>
                              )
                            }
                          </div>
                          {
                            user && (
                              <div>
                                <h2>Convert Text to Speech</h2>
                                <button className="save-button" type="button" onClick={() => handleFileUpload(materialUrl?.material.materialURL)} >Convert</button>
                                {/* <input type="file" accept="application/pdf" onChange={handleFileUpload} /> */}
                                {pdfLoading && <p>Processing PDF...</p>}


                                {textChunks.length > 0 && (
                                  <div className='play_section'>
                                    <p>Playing chunk {currentChunkIndex + 1} of {textChunks.length}</p>
                                    <button className='play_n_pause_btn' onClick={toggleAudio}>{isPaused ? "Play" : "Pause"}</button>
                                  </div>
                                )}
                              </div>
                            )
                          }
                        </div>

                        <iframe className="pdf_viewer" src={`${materialUrl?.material.materialURL}`} width="100%" height="600px"></iframe>
                      </div>
                      <h2 style={{marginTop: "20px"}}>View More Material</h2>
                      <div className="more-materials" style={{display: "grid", gridTemplateColumns:"1fr 1fr", gap: "20px", marginTop: "20px"}}>
                        {
                          viewMoreMaterials.map((material: MaterialType, index) => (
                            <div className="material-box" key={index}>
                              {
                                material.isPublished == true && (
                                  <div>
                                    <p className="material-holder">{material.materialname}</p>
                                    <p className="material-holder">{material.owner}</p>
                                  </div>
                                )
                              }
                            </div>
                          ))
                        }
                      </div>
                    </>

                  ) : (
                    <div>
                      <div className="content">
                        <div className="video-section">
                          <ReactPlayer url={`${materialUrl?.material.materialURL}`}
                            // width="1080px"
                            // height="720px"
                            className="video_display"
                            width="700px"
                            height="350px"
                            controls={true}
                          />
                          <div>Material Title : {materialUrl?.material.materialname}</div>
                          <div>Description : {materialUrl?.material.description}</div>
                          <div>Uploaded By : {materialUrl?.material.owner}</div>
                          {
                            user && (
                              <div className="material_user_buttons">{

                                isSaved ? (
                                  <button className="save-button" style={{ backgroundColor: "transparent", color: "white" }} onClick={() => saveMaterial()} >Unsave Material</button>
                                ) : (
                                  <button className="save-button" style={{ backgroundColor: "gold" }} onClick={() => saveMaterial()} >Save Material</button>
                                )
                              }
                                <div className="download-button" ><a href={materialUrl?.material.materialURL} download >Download Material</a></div>

                              </div>
                            )
                          }
                        </div>
                        <div className="msidebar">
                          <h2>View More Materials</h2>
                          <div className="more-materials">
                            {
                              viewMoreMaterials.map((material: MaterialType, index) => (
                                <div className="material-box" key={index}>
                                  {
                                    material.isPublished == true && (
                                      <div>
                                        <p className="material-holder">{material.materialname}</p>
                                        <p className="material-holder">{material.owner}</p>
                                      </div>
                                    )
                                  }
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              </>
          }
        </div>
      </div >
    </>
  );
};

export default MaterialDisplay;
