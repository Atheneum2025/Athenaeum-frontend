import axiosInstance from '../../utils/axios';
import { useEffect, useState } from 'react'
import Delete_Light_Image from '../../assets/light_theme/delete.png';
import Delete_Dark_Image from '../../assets/dark_theme/delete.png';
import { useTheme } from '../../context/ThemeContext';

type HistoryType = {
  MaterialName: string;
  course: string;
  subject: string;
  unit: string;
  user: string;
  _id: string;
}
export default function HistoryVideos() {
    const { theme } = useTheme();

  const [history, setHistory] = useState<HistoryType[]>([])
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/users/history`, { withCredentials: true });
      // console.log(response.data.history)
      setHistory(response.data.history)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const deleteHistory = async () => {
    try {
      const response = await axiosInstance.delete(`/users/delete-history`, { withCredentials: true });
      console.log('history deleted', response)
      fetchData();
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div style={{display: "flex", justifyContent: "space-between", color: "var(--font-color)"}}>
        <div>User History</div>
        <button onClick={() => deleteHistory()} className="delete_history_btn" >
          <img src={theme === "light" ? Delete_Light_Image : Delete_Dark_Image} alt="" />
          <div>Delete History</div>
        </button>
      </div>
      <div className="option_material_header" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        <div>Material Name</div>
        <div>Uploader</div>
      </div>
      <div className='option_materials'>
        {
          history.map((history: HistoryType, index) => (
            <div className="option_material_card" key={index}>
              <div className="option_material_details" style={{gridTemplateColumns: "repeat(2, 1fr)"}}>
                <div className="liked_material_name">{history.MaterialName}</div>
                <div className='uploaded_by'>{history.user}</div>
              </div>
            </div>
          ))
        }

      </div>
    </>
  )
}
