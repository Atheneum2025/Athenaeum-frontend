import React from 'react'
import '../Subjects/Subjects.css'

function Unit() {
  return (
    <>
    
    <div>
        <div className='title'>Course Name</div>
        <div className='title'>Subject Name</div>
        <button className='add-btn' id='btn'>Add New Unit</button>
            <div className="form-for-adding">
                <form action="">
                    <label htmlFor="file">ENter a Unit Name</label>
                    <input type="text" id='file-name' />
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

export default Unit