import axios from 'axios'
import React, { useEffect, useState } from 'react'

type HistoryType = {
  MaterialName: string;
  course: string;
  subject: string;
  unit: string;
  user: string;
  _id: string;
}
export default function HistoryVideos() {

  const [history, setHistory] = useState<HistoryType[]>([])
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/users/history`, { withCredentials: true });
      // console.log(response.data.history)
      setHistory(response.data.history)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  console.log(history)
  const deleteHistory = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/users/delete-history`, {withCredentials: true});
      console.log('history deleted', response)
      fetchData();
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div>All User History Material</div>
      <button onClick={() => deleteHistory()} >Delete History</button>
      <div className='liked_materials'>
        {
          history.map((history: HistoryType, index) => (
            <div className="liked_material_card" key={index}>
              <div className="liked_material_details">
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
