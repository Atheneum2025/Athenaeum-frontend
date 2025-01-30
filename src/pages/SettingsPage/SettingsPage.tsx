import axios from 'axios';
import React, { useState } from 'react'

export default function SettingsPage() {

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    const changePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/auth/change-password`, {oldPassword, newPassword}, {withCredentials: true});
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div>Settings</div>
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

        </>
    )
}
