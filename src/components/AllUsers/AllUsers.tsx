import axios from 'axios'
import React, { useEffect } from 'react'

type User = {
    _id: number;
    username: string;
    role: 'professor' | 'student';
};

type AllUsersProps = {
    users: User[];
}
export default function AllUsers({users}): React.FC<AllUsersProps> {
    console.log(users)
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
