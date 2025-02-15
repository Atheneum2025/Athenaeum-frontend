import axiosInstance from '../../utils/axios';
import { useEffect, useState } from 'react'

type SavedMaterialType = {
  _id: string;
  materialId: string;
}
export default function LikedVideos() {

  const [savedMaterials, setSavedMaterials] = useState<SavedMaterialType[]>([]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axiosInstance.get(`/users/save`, {withCredentials: true})
        setSavedMaterials(response.data.savedMaterials);
      }
      catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])
  return (
    <>
      <div>All User Saved Materials</div>
      <div>
        <div className='grid_layout'>
          <div>Material Name</div>
          <div>Uploader</div>
          <div>Material Type</div>
          <div>Course</div>
        </div>
      </div>
      <div className='liked_materials'>
        {
          savedMaterials.map((material: SavedMaterialType, index) => (
            <div className="liked_material_card" key={index}>
              <div className="liked_material_details">
                <div className="liked_material_name">{material.materialId}</div>
              </div>
            </div>

          ))
        }
        
      </div>
    </>
  )
}
