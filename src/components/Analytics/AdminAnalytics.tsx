import React from 'react'
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import { color } from 'chart.js/helpers';



ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
export default function AdminAnalytics() {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                label: "Sales",
                data: [400, 300, 500, 200, 600],
                backgroundColor: "rgba(236, 38, 38, 0.6)",
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
    return (
        <>
            <div>AdminAnalytics</div>
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
