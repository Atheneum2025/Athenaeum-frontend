import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import User_Light_Image from '../../assets/light_theme/user.png';
import User_Dark_Image from '../../assets/dark_theme/user.png';
import { useTheme } from "../../context/ThemeContext.tsx";

type UserDetailsType = {
    user: any;
    _id: string;
    username: string;
    role: string;
    college: string;
    isActive: boolean;
    phoneNo: number;
    email: string;
}

type MaterialType = {
    _id: string;
    materialname: string;
    description: string;
    isPublished: boolean;
};
export default function UserDetails() {
  const { theme } = useTheme();

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
        window.scrollTo(0, 0);
        fetchUserData();
        fetchMaterialData();
    }, [])

    console.log(materialDetails);
    return (
        <>
            {
                userDetails ? (
                    <>
                        <div className="items_display_page courses_page">
                            <div className='items_display_header'>
                                <h1>Professor Details :</h1>
                            </div>
                            <div className="items_cards_list">
                                <div className="user_info">
                                    <div>
                                        <div>Professor Name : {userDetails.username}</div>
                                        <div>{userDetails.college}</div>
                                        <div>{userDetails.phoneNo}</div>
                                        <div>{userDetails.email}</div>
                                    </div>
                                    <div className='user_avatar'>
                                        <img src={theme === "light" ? User_Light_Image : User_Dark_Image} alt="" />
                                    </div>
                                    <button onClick={() => toggleUserStatus(userDetails._id)} >
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
                                </div>
                                {
                                    materialDetails.map((material: MaterialType, index) => (
                                        <div key={index} className='secondary_item_card'>
                                            <div className='index'>{index + 1}.</div>
                                            <div className="">
                                                <div className='item_name'>{material.materialname}</div>
                                                <div className='item_description'>{material.description}</div>
                                            </div>
                                        </div>

                                    ))
                                }
                            </div>
                        </div>
                    </>

                ) : (
                    <div>User Doesnt Exist</div>
                )

            }
        </>
    )
}
