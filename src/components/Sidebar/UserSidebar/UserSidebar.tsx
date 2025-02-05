import { useEffect, useState } from 'react';
import './UserSidebar.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../Loader/Loader';
type ViewLaterType = {
    _id: string;
    materialName: string;
};

type MaterialType = {
    _id: string;
    materialname: string;
    description: string;
    course: string;
    subject: string;
    unit: string;
    keywords: string;
};
export default function UserSidebar() {

    const [viewLater, setViewLater] = useState<ViewLaterType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    // const navigate = useNavigate();


    useEffect(() => {

        const fetchdata = async () => {
            setLoading(true)
            try {
                const response = await axios.get("http://localhost:3000/api/v1/viewLater/", { withCredentials: true });
                setViewLater(response.data.allMaterials)
                setLoading(false);
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchdata();
    }, []);
    console.log(viewLater)

    const removeFromViewLater = async (materialId: string) => {
        console.log(materialId);
        
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/viewLater/${materialId}`, {
                withCredentials: true,
            });
            console.log(response);
        } catch (error) {
            console.error("Error removing material", error);
        }
    };
    // const sendData = (coursename: string) => {
    //     navigate(`/course/${coursename}/subject`, { state: { courseName: coursename } });
    //     console.log(coursename)
    // }
    return (

        <>
            <div id='sidebar' className="sidebar">
                <div>View Later</div>
                {
                    loading ? <Loader /> :
                        <>

                            {viewLater.map((viewLater: ViewLaterType) => (
                                <div key={viewLater._id} className="course_card" >

                                    <div className="course_details">
                                        <div className='course_name'>Course Name: {viewLater.materialName}</div>
                                        <div onClick={() => { removeFromViewLater(viewLater.materialName)}}>remove</div>
                                    </div>
                                </div>
                            ))}
                        </>
                }
            </div>

        </>
    )
}
