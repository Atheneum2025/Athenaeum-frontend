import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import AdminsDashboard from '../AdminsDashboard/AdminsDashboard';
import ProfessorDashboard from '../ProfessorDashboard/ProfessorDashboard';
import StudentDashboard from '../StudentDashboard/StudentDashboard';

export default function ProfilePage() {

    const { isAuthenticated, logout } = useContext(AuthContext);
    console.log(isAuthenticated);
    const authToken = localStorage.getItem("authToken");
    let parsedToken
    authToken ? parsedToken = JSON.parse(authToken) : parsedToken = null;
    const user = parsedToken?.user;


    
    return (
        <>
            {
                isAuthenticated ? (
                    <div>
                        {user.role === "admin" ? (
                            <AdminsDashboard/>
                        ) : user.role === "professor" ? (
                            <ProfessorDashboard user = {user}/>
                        ) : user.role === "student" ? (
                            <StudentDashboard/>
                        ) : null}
                    </div>
                ) : (
                    <div>
                        <div> Welcome Guest</div>
                    </div>
                )
            }

        </>
    )
}
