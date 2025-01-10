import React from 'react'
import './Subjects.css'
export default function Subject() {
  return (
    <>
      <div>
        <div className='title'>Course Name - BCA</div>
        <button className='add-btn' id='btn'>Add New Subject</button>
            <div className="form-for-adding">
                <form action="">
                    <label htmlFor="file">ENter a Subject Name</label>
                    <input type="text" id='file-name' />
                </form>

                <button>Save</button>
            </div>

        <div>Subjects</div>
        <div className='subjects'>
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
