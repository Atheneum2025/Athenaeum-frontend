import axios from 'axios';
import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import { themes, ThemeType } from '../../utils/theme';
import { getAuthenticatedUser } from '../../utils/authUtils';
import axiosInstance from '../../utils/axios';

export default function SettingsPage() {

    const { user, isAuthenticated } = getAuthenticatedUser();

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [phoneNo, setPhoneNo] = useState<number>()
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const changePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/auth/change-password`, { oldPassword, newPassword }, { withCredentials: true });
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }

    const themeContext = useContext(ThemeContext);

    if (!themeContext) return null;
    const { theme, setTheme } = themeContext;

    const changeRole = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.patch(`/users/c/${user._id}/role/`,{phoneNo}, {withCredentials: true});
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div className="settings_page">
                <h1>Settings</h1>
                <div>Update User Info</div>
                <form action="" className=''>
                    <label htmlFor="avatar">Edit Avatar</label>
                    <input type="file" />
                    <label htmlFor="username">Edit Username:</label>
                    <input type="text" />
                    <label htmlFor="fullname">Edit Fullname:</label>
                    <input type="text" />


                    <button type='submit' >Save Changes</button>
                </form>

                {
                    user.role === 'student' && (
                        <button className='add-btn' type='button' onClick={()=>setIsVisible(true)} >Upgrade to Professor</button>
                    )
                }
                <h3>Current theme: {theme}</h3>
                {
                    Object.keys(themes).map((themeKey) => (
                        <button key={themeKey} onClick={() => setTheme(themeKey as ThemeType)}>
                            {themeKey}
                        </button>
                    ))
                }


                <div>Change Password</div>
                <form action="" onSubmit={changePassword}>
                    <label htmlFor="password">Enter Old Password</label>
                    <input type="text" id="oldPassword" value={oldPassword} onChange={(e) => (setOldPassword(e.target.value))} />
                    <label htmlFor="password">Enter New Password</label>
                    <input type="text" id="newPassword" value={newPassword} onChange={(e) => (setNewPassword(e.target.value))} />
                    <button type='submit'>Change Password</button>
                </form>
                <div>Site Appearance</div>
                <div>Developer's Favourite Theme</div>
                <div>Clear cache data</div>
                <button>Clear Cache</button>
                <button>Save Changes</button>

                <div>Advanced Settings</div>
                <div>delete user account</div>
            </div>
            {
                isVisible && (
                    <>
                        <div className="add_new_material">
                            <div className="add_new_material_form">
                                <form action="" onSubmit={changeRole} >
                                <div className="add_new_material_form_header">
                                    <h2> For Verification</h2>
                                    <button type="button" onClick={() => { setIsVisible(false) }}>✕</button>
                                </div>
                                <div className="form_field">
                                    <label htmlFor="event">Enter Your Phone Number:</label>
                                    <input type="number" id="text" value={phoneNo} onChange={(e: any) => setPhoneNo(e.target.value)} />
                                </div>
                                <div className="upload_btns">
                                    <button type="button" onClick={() => setIsVisible(false)}>Cancel</button>
                                    <button type="submit" >Save</button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </>
                )

            }

        </>
    )
}
