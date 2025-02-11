import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type UserRole = {
    role: 'professors' | 'students';
};

type User = {
    _id: string;
    username: string;
    role: string;
    college: string
}

export default function AllUsers({ role }: UserRole) {

    const [userDetails, setUserDetails] = useState<User[]>([])
    const navigate = useNavigate();

    // console.log(users)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/users/${role}`);
                // console.log(response.data);
                if (role === "professors") {
                    setUserDetails(response.data.professors);
                }
                else {
                    setUserDetails(response.data.students)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, [])
    console.log(userDetails)

    function sendData(userId: string) {
        navigate(`/user/${userId}/`, { state: { userId: userId } });
    }
    return (
        <>
            {
                userDetails.map((user: User, index) => (
                    <div className="liked_material_card" key={index} onClick={() => sendData(user._id)}>
                        

                            <div className="liked_material_details">
                                <div className="liked_material_name">{user.username}</div>
                                <div className='uploaded_by'>{user.role}</div>
                            </div>
                    </div>
                ))
            }
        </>
    )
}
