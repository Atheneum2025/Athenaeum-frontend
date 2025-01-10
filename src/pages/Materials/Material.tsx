import React from 'react'
import '../Courses/Courses.css'
import '../Subjects/Subjects.css'
export default function Material() {
  return (
    <>
    
    <div>Material</div>
    <div>
        <div className='title'>Course Name</div>
        <div className='title'>Subject Name</div>
        <button className='add-btn' id='btn'>Add New Material</button>
            <div className="form-for-adding">
                <form action="">
                    <label htmlFor="file">ENter a Material Name</label>
                    <input type="text" id='file-name' />
                    <label htmlFor="file">Choose a file</label>
                    <input type="file" />
                </form>

                <button>Save</button>
            </div>

        <div>Units</div>
        <div className='units'>
          <div className='subject-item'>PSPC</div>
          <div className='subject-item'>DC</div>
          <div className='subject-item'>Maths</div>
          <div className='subject-item'>ksdf</div>
          <div className='subject-item'>sdfdsfsd</div>
          <div className='subject-item'>wegsdgdg</div>
        </div>
      </div>
    </>
  )
}
