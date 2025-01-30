import axios from 'axios'
import React, { useEffect } from 'react'

export default function HistoryVideos() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/users/history`);
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, []);

  const deleteHistory = async () =>{
    try{
      const response = await axios.delete(`http://localhost:3000/api/v1/users/delete-history`);
      console.log('history deleted')
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <div>All User History Material</div>
      <button onClick={()=>deleteHistory} >Delete History</button>
      <div className='liked_materials'>
        <div className="liked_material_card">
          <div className="liked_material_details">
            <div className="liked_material_name">Family Pic</div>
            <div className='uploaded_by'>Rishon</div>
          </div>
        </div>
        <div className="liked_material_card">
          <div className="liked_material_details">
            <div className="liked_material_name">Family Pic</div>
            <div className='uploaded_by'>Rishon</div>
          </div>
        </div>
        <div className="liked_material_card">
          <div className="liked_material_details">
            <div className="liked_material_name">Family Pic</div>
            <div className='uploaded_by'>Rishon</div>
          </div>
        </div>
        <div className="liked_material_card">
          <div className="liked_material_details">
            <div className="liked_material_name">Family Pic</div>
            <div className='uploaded_by'>Rishon</div>
          </div>
        </div>
      </div>
    </>
  )
}
