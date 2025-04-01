import React, { useEffect, useState } from 'react'
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import axiosInstance from '../../utils/axios';
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type CourseType = {
    _id: string;
    coursename: string;
    description: string;
    keywords: string;
    rating: number;
};

type RatingsType = {
    ratings : number;
}

export default function AdminAnalytics() {

    const [courseData, setCourseData] = useState<CourseType[]>([])
    const [ratings, setRatings] = useState<RatingsType[]>([])

    const data = {
        labels: courseData.map(course => course.coursename),
        datasets: [
            {
                label: "Ratings",
                data: courseData.map(course => course.rating.toFixed(1)),
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                tension: 0.4, // Smooth line

            },
        ],
    };

    const newData = {
        labels: ["Watched", "Not Watched"],
        datasets: [
            {
                data: [4500, 1500], // Number of views
                backgroundColor: ["#36A2EB", "#FFCE56"], // Colors for sections
                hoverBackgroundColor: ["#2B90D9", "#E6B800"],
            },
        ],
    };

    const fetchCourseData = async () => {
        const courseResponse = await axiosInstance.get('/course/c', {withCredentials: true});
        setCourseData(courseResponse.data.courses);
        console.log(courseData);
    }

    useEffect(()=> {
        fetchCourseData();
    }, [])
    return (
        <>
            <div>AdminAnalytics</div>

            <div>total ratings for a course</div>
            <div>no of ratings for a course</div>
            <div>average ratings for a course</div>
            <div>likes for materials</div>
            <div>user login info</div>
            <div className='analytics'>
                <div>
                    <Bar data={data} />
                </div>
                <div>
                    <Pie data={newData} />
                </div>
            </div>
        </>
    )
}
