import { useState } from 'react'
import './StudentDashboard.css';
function StudentDashboard() {

    const [activePage, setActivePage] = useState<number>(1);

    const show = (id: number) => () => {
        setActivePage(id);
        console.log(id);
    }
    
    return (
        <>
            <div>Student Dashboard</div>
            <div>Student name</div>
            <ul className='student-profile-options' id='demo'>
                <div className={`options ${activePage === 1 ? "active" : ""}`} onClick={show(1)}>Liked Material</div>
                <div className={`options ${activePage === 2 ? "active" : ""}`} onClick={show(2)}>Saved Material</div>
                <div className={`options ${activePage === 3 ? "active" : ""}`} onClick={show(3)}>History</div>
                <div className={`options ${activePage === 4 ? "active" : ""}`} onClick={show(4)}>My Material</div>
            </ul>
            <div className='student-profile-options-display'>
                <div id='1' className={`options-page ${activePage === 1 ? "active" : ""}`}>Liked Materials</div>
                <div id='2' className={`options-page ${activePage === 2 ? "active" : ""}`}>Saved materials</div>
                <div id='3' className={`options-page ${activePage === 3 ? "active" : ""}`}>history</div>
                <div id='4' className={`options-page ${activePage === 4 ? "active" : ""}`}>my material</div>
            </div>
            <div></div>
        </>
    )
}

export default StudentDashboard