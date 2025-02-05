import axios from 'axios'
import React, { useEffect } from 'react'

type User = {
    _id: number;
    username: string;
    role: 'professor' | 'student';
};

export default function AllUsers({ role }: User) {
    // console.log(users)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/users`);
                console.log(response.data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, [])

    return (
        <>

        </>
    )
}
