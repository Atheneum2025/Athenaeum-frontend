import React, { useEffect, useState } from 'react';
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import axiosInstance from '../../utils/axios';
import './AdminAnalytics.css';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type CourseType = {
    _id: string;
    coursename: string;
    description: string;
    keywords: string;
    rating: number;
};

export default function AdminAnalytics() {
    const [courseData, setCourseData] = useState<CourseType[]>([]);

    const data = {
        labels: courseData.map(course => course.coursename),
        datasets: [
            {
                label: "Average Ratings",
                data: courseData.map(course => course.rating.toFixed(1)),
                backgroundColor: "#4bc0c0",
                borderColor: "#4bc0c0",
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ["Watched", "Not Watched"],
        datasets: [
            {
                data: [4500, 1500],
                backgroundColor: ["#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#2B90D9", "#E6B800"],
            },
        ],
    };

    const fetchCourseData = async () => {
        try {
            const courseResponse = await axiosInstance.get('/course/c', { withCredentials: true });
            setCourseData(courseResponse.data.courses);
        } catch (error) {
            console.error("Failed to fetch course data", error);
        }
    };

    useEffect(() => {
        fetchCourseData();
    }, []);

    return (
        <div className="admin-analytics">
            <h2>Admin Analytics Dashboard</h2>
            <div className="summary-boxes">
                <div className="summary-box">Total Ratings: {courseData.reduce((acc, cur) => acc + cur.rating, 0).toFixed(1)}</div>
                <div className="summary-box">Number of Courses: {courseData.length}</div>
                <div className="summary-box">Average Rating: {(courseData.reduce((acc, cur) => acc + cur.rating, 0) / courseData.length || 0).toFixed(2)}</div>
                <div className="summary-box">Likes on Materials: 1200</div>
                <div className="summary-box">Active Users Today: 320</div>
            </div>
            <div className="charts">
                <div className="chart-container">
                    <h3>Course Ratings</h3>
                    <Bar data={data} />
                </div>
                <div className="chart-container">
                    <h3>Course Watch Status</h3>
                    <Pie data={pieData} />
                </div>
            </div>
        </div>
    );
} 
