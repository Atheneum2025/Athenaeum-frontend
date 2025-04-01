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
    const [viewCount, setViewCount] = useState<Number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [height, setHeight] = useState("80vh");
    // const navigate = useNavigate();

    const fetchUserData = async () => {
        try{
            const person = await axiosInstance.get(`/users/c/${user._id}`, {withCredentials: true});
            setViewCount(person.data.user.viewCount);
            console.log(viewCount);
        }
        catch(error){
            console.error(error);
        }
    }

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

    const handleScroll = () => {
        if (window.scrollY > 400) { // Change height when scrolled 100px
            setHeight("50vh");
        } else {
            setHeight("80vh");
        }
    };
    
    useEffect(() => {
        fetchData();
        fetchUserData();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const removeFromViewLater = async (materialId: string) => {
        try {
            const response = await axiosInstance.delete(`/viewLater/${materialId}`, {
                withCredentials: true,
            });
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
                    <div id='sidebar' className="sidebar" style={{height: `${height}`}}>
                        <div className="viewLater_text">View Later :</div>
                        {
                            loading ? <Loader width={20} height={7} top={50} color={"grey"} /> :
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

                                    <div>Completed {viewCount !== null ? viewCount.toString() : 0} out of {viewLater.length}</div>
                                    <div className='drag_n_drop' >Drag and drop material here</div>
                                </>
                        }
                    </div>
                )
            }

        </>
    )
}
