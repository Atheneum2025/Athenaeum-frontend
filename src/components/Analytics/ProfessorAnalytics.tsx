import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios';
import { getAuthenticatedUser } from '../../utils/authUtils';
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type MaterialType = {
    materialname: string;
    views: number;
}

export default function ProfessorAnalytics() {
    const { user, isAuthenticated } = getAuthenticatedUser();

    const [material, setMaterial] = useState<MaterialType[]>([]);

    let totalPublished, totalUnpublished;
    const fetchMaterialData = async () => {
        const response = await axiosInstance.get(`/material/${user._id}`, {withCredentials: true});
        setMaterial(response.data.materials)
    }

    const fetchMaterialStats = async () => {
        try{

            const materialData = await axiosInstance.get('/materials/stats', {withCredentials: true});
            totalPublished = materialData.data.totalPublished;
            totalUnpublished = materialData.data.totalUnpublished;
        }
        catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchMaterialData();
        fetchMaterialStats();
    }, [])

    const data = {
        labels: material.map(material => material.views),
        datasets: [
            {
                label: "Views",
                data: material.map(material => material.views),
                borderColor: "rgba(195, 13, 83, 0.4)",
                backgroundColor: "rgba(245, 0, 0, 0.7)",
                tension: 0.4, // Smooth line

            },
        ],
    };

    const newData = {
        labels: ["Documents", "Videos"],
        datasets: [
            {
                data: [totalPublished, totalUnpublished], // Number of views
                backgroundColor: ["#36A2EB", "#FFCE56"], // Colors for sections
                hoverBackgroundColor: ["#2B90D9", "#E6B800"],
            },
        ],
    };
    return (
        <>

            <div>
                <h2>Most Viewed</h2>
                <div>How to train your dragon pdf</div>
                <div>34</div>
            </div>
            <div>
                <Bar data={data} />
            </div>
            
            <div>Most Opened Material</div>
            <div>Most Liked Material</div>
            <div>
                <h2>Types of Materials</h2>
                <div>
                    <Pie data={newData} />
                </div>
            </div>
            <div></div>
            <div>Total Number Of Views
                {
                    material.map((material: MaterialType, index) => (
                        <div key={index}>
                            <div>{material.materialname}</div>
                            <div>{material.views}</div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
