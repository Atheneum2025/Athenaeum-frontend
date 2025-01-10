import React from 'react'
import './StudentDashboard.css';
function StudentDashboard() {

    const options = document.getElementsByClassName("options");
    
    const show = (id: number) => (event: React.MouseEvent<HTMLDivElement>) => {
        console.log('done', id)
        const page = document.getElementById(`${id}`);
        console.log(page)
        page?.classList.add('active');
    }
    
    return (
        <>
            <div>Student Dashboard</div>
            <div>Student name</div>
            <ul className='student-profile-options' id='demo'>
                <div className='options' onClick={show(1)}>Liked Material</div>
                <div className='options' onClick={show(2)}>Saved Material</div>
                <div className='options' onClick={show(3)}>History</div>
                <div className='options' onClick={show(4)}>My Material</div>
            </ul>
            <div className='student-profile-options-display'>
                <div id='1'className='options-page active'>Liked Materials</div>
                <div id='2'className='options-page'>Saved materials</div>
                <div id='3'className='options-page'>history</div>
                <div id='4'className='options-page'>my material</div>
            </div>
            <div></div>
        </>
    )
}

export default StudentDashboard