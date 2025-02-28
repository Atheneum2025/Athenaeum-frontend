import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';

type UserDetailsType = {
    user: any;
    _id: string;
    username: string;
    role: string;
    college: string;
    isActive: boolean;
}

type MaterialType = {
    _id: string;
    materialname: string;
    description: string;
    isPublished: boolean;
};
export default function UserDetails() {

    const [userDetails, setUserDetails] = useState<UserDetailsType>()
    const [materialDetails, setMaterialDetails] = useState<MaterialType[]>([]);
    const { userId } = useParams<{ userId: string }>();
    const [isActive, setIsActive] = useState<boolean>();
    

    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get<UserDetailsType>(`/users/c/${userId}`)
            // console.log(response.data.user);
            setUserDetails(response.data.user);
            setIsActive(response.data.user.isActive);
        } catch (error) {
            console.error(error)
        }
    }

    const fetchMaterialData = async () => {
        try {
            const MaterialResponse = await axiosInstance.get(`/users/c/${userId}/materials/`);

            setMaterialDetails(MaterialResponse.data.materials);

        }
        catch (error) {
            console.error(error);
        }
    }

    const toggleUserStatus = async (_id: string) => {

        try {
            const response = await axiosInstance.patch(`/users/toggleActive/${_id}`);
            console.log(response.data);
            setIsActive(!isActive);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUserData();
        fetchMaterialData();
    }, [])

    console.log(materialDetails);
    return (
        <>
            {
                userDetails ? (
                    <>
                        <div>{userDetails.username}</div>
                        <div>{userDetails.role}</div>
                        <button onClick={()=>toggleUserStatus(userDetails._id)} >
                            {
                                isActive ? (
                                    <>
                                        Deactivate
                                    </>
                                ) : (
                                    <>
                                        Activate
                                    </>
                                )
                            }
                        </button>
                        {
                            materialDetails.map((material: MaterialType, index) => (
                                <div key={index}>
                                    <div>{material.materialname}</div>
                                    <div>{material._id}</div>
                                </div>

                            ))
                        }
                    </>

                ) : (
                    <div>User Doesnt Exist</div>
                )

            }
        </>
    )
}
