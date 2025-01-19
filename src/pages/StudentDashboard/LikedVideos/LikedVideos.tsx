import React from 'react'

export default function LikedVideos() {
  return (
    <>
      <div>Liked Materials</div>
      <div>
        <div className='grid_layout'>
          <div>Material Name</div>
          <div>Uploader</div>
          <div>Material Type</div>
          <div>Course</div>
        </div>
      </div>
      <div className='liked_materials'>
        <div className="liked_material_card">
          <div className="liked_material_details">
            <div className="liked_material_name">Family Pic</div>
            <div className='uploaded_by'>Rishon</div>
            <div>PDF</div>
            <div>BCA</div>
          </div>
        </div>
        <div className="liked_material_card">
          <div className="liked_material_details">
            <div className="liked_material_name">Family Pic</div>
            <div className='uploaded_by'>Rishon</div>
            <div>Video</div>
            <div>BSC</div>
          </div>
        </div>
        <div className="liked_material_card">
          <div className="liked_material_details">
            <div className="liked_material_name">Family Pic</div>
            <div className='uploaded_by'>Rishon</div>
            <div>PPT</div>
            <div>BBA</div>
          </div>
        </div>
        <div className="liked_material_card">
          <div className="liked_material_details">
            <div className="liked_material_name">Family Pic</div>
            <div className='uploaded_by'>Rishon</div>
            <div>PPT</div>
            <div>BBA</div>
          </div>
        </div>
      </div>
    </>
  )
}
