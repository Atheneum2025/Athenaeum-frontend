import AdminsDashboard from './AdminsDashboard/AdminsDashboard';
import ProfessorDashboard from './ProfessorDashboard/ProfessorDashboard';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import { getAuthenticatedUser } from '../../utils/authUtils';

export default function ProfilePage() {

    const {user, isAuthenticated} = getAuthenticatedUser();
    
    return (
        <>
            {
                isAuthenticated ? (
                    <div>
                        {user.role === "admin" ? (
                            <AdminsDashboard user = {user} />
                        ) : user.role === "professor" ? (
                            <ProfessorDashboard user = {user} />
                        ) : user.role === "student" ? (
                            <StudentDashboard user = {user} />
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
