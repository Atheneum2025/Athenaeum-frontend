import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import AdminsDashboard from '../AdminsDashboard/AdminsDashboard';
import ProfessorDashboard from '../ProfessorDashboard/ProfessorDashboard';
import StudentDashboard from '../StudentDashboard/StudentDashboard';
import { getAuthenticatedUser } from '../../utils/authUtils';

export default function ProfilePage() {

      const {user, isAuthenticated} = getAuthenticatedUser();
    
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
