import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import { themes, ThemeType } from '../../utils/theme';
import { getAuthenticatedUser } from '../../utils/authUtils';
import axiosInstance from '../../utils/axios';
import './SettingsPage.css';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {

    const { user, isAuthenticated } = getAuthenticatedUser();
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [phoneNo, setPhoneNo] = useState<number>()
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [deleteAccount, setDeleteAccount] = useState<boolean>(false);

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [])
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
            const response = await axiosInstance.patch(`/users/c/${user._id}/role/`, { phoneNo }, { withCredentials: true });
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }

    const clearRecentSearch = () => {
        localStorage.removeItem("recentSearches");
        console.log('recents cleared');
    }

    const deleteUserAccount = async () => {
        console.log('hello')
        try {

            const response = await axiosInstance.delete(`/users/c/${user._id}`, { withCredentials: true })
            console.log(response);
            logout();
            navigate('/login');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="settings_page">
                <div className="settings_page_header">
                    <h1>Settings</h1>
                    {
                        user.role === 'student' && (
                            <button className='big_btn' type='button' onClick={() => setIsVisible(true)} >Become a Professor</button>
                        )
                    }
                </div>
                <div className="settings_options">
                    <h2>Update Personal Info</h2>
                    <div className="section" >
                        <form action="" className='edit_profile'>
                            <div className="edit_avatar">
                                <label htmlFor="avatar">Edit Avatar</label>
                                <div><img src="" alt="" /></div>
                                <div className="file_input">
                                    <label htmlFor="file">Browse</label>
                                    <input type="file" id="file" />
                                </div>
                            </div>
                            <div className='input_fields'>
                                <label htmlFor="username">Edit Username:</label>
                                <input type="text" id="username" />
                            </div>
                            <div className='input_fields'>
                                <label htmlFor="email">Edit Email:</label>
                                <input type="text" id="email" />
                            </div>
                            <div className="setting_btns">
                                <button type='submit' >Save Changes</button>
                            </div>
                        </form>
                    </div>
                    <h2>Change Password</h2>
                    <div className="section">
                        <form action="" className="change_password" onSubmit={changePassword}>
                            <div className="input_fields">
                                <label htmlFor="oldPassword">Enter Old Password</label>
                                <input type="text" id="oldPassword" value={oldPassword} onChange={(e) => (setOldPassword(e.target.value))} />
                            </div>
                            <div className="input_fields">
                                <label htmlFor="newPassword">Enter New Password</label>
                                <input type="text" id="newPassword" value={newPassword} onChange={(e) => (setNewPassword(e.target.value))} />
                            </div>
                            <div className="setting_btns">
                                <button type='submit'>Change Password</button>
                            </div>
                        </form>
                    </div>

                    <h2>Site Appearance</h2>
                    <div className="section">
                        <h3>Current theme: {theme}</h3>
                        <div className="theme_options">
                            {
                                Object.keys(themes).map((themeKey) => (
                                    <button key={themeKey} onClick={() => setTheme(themeKey as ThemeType)} style={{ borderColor: `${themeKey}` }}>
                                        {themeKey}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    <h2>Clear Search Data</h2>
                    <div className="clear_data section">
                        <p>This will clear your Recents Searches</p>
                        <button onClick={clearRecentSearch} >Clear Recents</button>
                    </div>
                    <h2>Delete User Account</h2>
                    <div className="delete_account section">
                        <h3>This will delete your Account parmanently</h3>
                        <button onClick={() => setDeleteAccount(true)} >Delete Account</button>
                    </div>

                    {/* <button onClick={()=>deleteUserAccount()} >Delete Account</button> */}
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
                    {
                        deleteAccount && (
                            <>
                                <div className="add_new_material">
                                    <div className="add_new_material_form">
                                        <div className="add_new_material_form_header">
                                            <h2>Do You Want to Delete This Account Parmanently ?</h2>
                                            <button type="button" onClick={() => { setDeleteAccount(false) }}>✕</button>
                                        </div>
                                        <div className="upload_btns">
                                            <button type="submit" style={{ backgroundColor: "red" }} onClick={() => deleteUserAccount()}>Yes</button>
                                            <button type="button" onClick={() => setDeleteAccount(false)}>No</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>




        </>
    )
}
