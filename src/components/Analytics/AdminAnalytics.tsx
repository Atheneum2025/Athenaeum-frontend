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
    const [courseCount, setCourseCount] = useState<number>();
    const [subjectCount, setSubjectCount] = useState<number>();
    const [unitCount, setUnitCount] = useState<number>();
    const [materialCount, setMaterialCount] = useState<number>();
    const [userCount, setUserCount] = useState<number>();
    const [publishedMCount, setPublishedMCount] = useState<number>();
    const [notPublishedMCount, setNotPublishedMCount] = useState<number>();

    

    const fetchCourseData = async () => {
        try {
            const courseResponse = await axiosInstance.get('/course/c', { withCredentials: true });
            setCourseData(courseResponse.data.courses);
        } catch (error) {
            console.error("Failed to fetch course data", error);
        }
    };
    const fetchAllCountsStats = async () => {
        try {
            const countResponse = await axiosInstance.get('/users/materials/count', { withCredentials: true });
            setCourseCount(countResponse.data.courseCount);
            setSubjectCount(countResponse.data.subjectCount);
            setUnitCount(countResponse.data.unitCount);
            setMaterialCount(countResponse.data.materialCount);
            setUserCount(countResponse.data.userCount);
            setPublishedMCount(countResponse.data.publishedCount);
            setNotPublishedMCount(countResponse.data.notPublishedCount);
            console.log(countResponse);
            console.log(publishedMCount);
            console.log(notPublishedMCount);

        } catch (error) {
            console.error("Failed to fetch course data", error);
        }
    };

    useEffect(() => {
        fetchCourseData();
        fetchAllCountsStats();
    }, []);

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
        labels: ["Published", "Not Published"],
        datasets: [
            {
                data: [3, 4],
                backgroundColor: ["#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#2B90D9", "#E6B800"],
            },
        ],
    };

    return (
        <div className="admin-analytics">
            <h2>Admin Analytics Dashboard</h2>
            <div className="summary-boxes">
                <div className="summary-box">Total Courses: {courseCount}</div>
                <div className="summary-box">Total Subjects: {subjectCount}</div>
                <div className="summary-box">Total Units: {unitCount}</div>
                <div className="summary-box">Total Materials: {materialCount}</div>
                <div className="summary-box">Total Users: {userCount}</div>
            </div>
            <div className="charts">
                <div className="chart-container">
                    <h3>Course Ratings</h3>
                    <Bar data={data} />
                </div>
                <div className="chart-container">
                    <h3>Material Publish Status</h3>
                    <Pie data={pieData} style={{height: "400px", width: "400px"}} />
                </div>
            </div>
        </div>
    );
} 
