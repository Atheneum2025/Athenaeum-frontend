import './UserSidebar.css'
export default function UserSidebar() {

    const menu = document.getElementById('menu');
    const sidebar = document.getElementById('sidebar');

    // menu?.addEventListener('click', ()=>{
    //     sidebar.style.display = "block";
    // })
    // console.log(sidebar);
    return (
        
        <>
            <div id='sidebar' className="sidebar">
                <div>UserSidebar 
                    <div> Back button</div>
                </div>
                <div>Courses
                    <div>Subjects</div>
                    <div>Units</div>
                </div>
            </div>

        </>
    )
}
