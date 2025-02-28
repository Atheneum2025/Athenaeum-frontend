import { useEffect, useState } from 'react';
import './UserSidebar.css'
import axiosInstance from '../../../utils/axios';
import Loader from '../../Loader/Loader';
import Delete_Light_Image from '../../../assets/light_theme/delete.png';
import Delete_Dark_Image from '../../../assets/dark_theme/delete.png';
import { getAuthenticatedUser } from '../../../utils/authUtils';
import { useTheme } from "../../../context/ThemeContext.tsx";


type ViewLaterType = {
    _id: string;
    materialname: string;
    materialId: string;
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

    const { theme } = useTheme();
    const { user, isAuthenticated } = getAuthenticatedUser();

    const [viewLater, setViewLater] = useState<ViewLaterType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    // const navigate = useNavigate();


    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.get("/viewLater/", { withCredentials: true });
            setViewLater(response.data.allMaterials)
            setLoading(false);
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {

        fetchData();

    }, []);
    console.log(viewLater)

    const removeFromViewLater = async (materialId: string) => {
        console.log(materialId);

        try {
            const response = await axiosInstance.delete(`/viewLater/${materialId}`, {
                withCredentials: true,
            });
            console.log(response);
            fetchData();
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
            {
                isAuthenticated && (
                    <div id='sidebar' className="sidebar">
                        <div className="viewLater_text">View Later :</div>
                        {
                            loading ? <Loader /> :
                                <>
                                    {viewLater.map((viewLater: ViewLaterType) => (
                                        <div key={viewLater._id} className="viewLater_card" >
                                            <div>
                                                <div className='viewLater_name'>Material Name: {viewLater.materialname}</div>
                                                <div>/course/subject/unit</div>
                                            </div>
                                            <div className='delete_viewLater' onClick={() => { removeFromViewLater(viewLater.materialId) }}>
                                                <img src={theme === "light" ? Delete_Light_Image : Delete_Dark_Image} alt="" />
                                                {/* <img src={Delete_Dark_Image} alt="" /> */}
                                            </div>
                                        </div>
                                    ))}

                                    {/* <div>Completed {user.viewCount} out of {viewLater.length}</div> */}
                                </>
                        }
                    </div>
                )
            }

        </>
    )
}
