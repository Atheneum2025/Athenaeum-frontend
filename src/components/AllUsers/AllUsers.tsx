import axiosInstance from '../../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type UserRole = {
    role: 'professors' | 'students';
};

type User = {
    _id: string;
    username: string;
    role: string;
    college: string;
    isActive: boolean;
    phoneNo: string;
}

export default function AllUsers({ role }: UserRole) {

    const [userDetails, setUserDetails] = useState<User[]>([])
    const navigate = useNavigate();

    // console.log(users)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/users/${role}`);
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
            <div className="option_materials">
                {
                    userDetails.map((user: User, index) => (
                        <div className="option_material_card" key={index} onClick={() => sendData(user._id)}>
                            <div className="option_material_details">
                                <div className="liked_material_name">{user.username}</div>
                                <div className="liked_material_name">{user.phoneNo}</div>
                                <div>{JSON.stringify(user.isActive) == "true" ? <>Active</> : <>Not Active</>}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
