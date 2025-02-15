import axios from 'axios';
import React, { useState } from 'react'
import './ContactUs.css'

export default function ContactUs() {

    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/contactUs/`, { message }, { withCredentials: true })
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <h1>Contact Us</h1>
            <p>Your messages will be directed to the admin</p>
            <form action="" onSubmit={handleSubmit} >
                <label htmlFor="message"></label>
                <textarea
                    name="message"
                    id="message" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                <button type="submit" >Submit</button>
            </form>
        </>
    )
}
