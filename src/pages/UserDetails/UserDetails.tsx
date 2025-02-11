import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

type UserDetailsType = {
    user: any;
    _id: string;
    username: string;
    role: string;
    college: string;
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


    const fetchUserData = async () => {
        try {
            const response = await axios.get<UserDetailsType>(`http://localhost:3000/api/v1/users/c/${userId}`)
            // console.log(response.data.user);
            setUserDetails(response.data.user);
        } catch (error) {
            console.error(error)
        }
    }

    const fetchMaterialData = async () => {
        try {
            const MaterialResponse = await axios.get(`http://localhost:3000/api/v1/users/c/${userId}/materials/`);

            setMaterialDetails(MaterialResponse.data.materials);

        }
        catch (error) {
            console.error(error);
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
