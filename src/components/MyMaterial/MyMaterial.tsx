import { useEffect, useState, DragEvent } from 'react'
import axiosInstance from '../../utils/axios';
import Loader from '../Loader/Loader';

type User = {
    _id: string;
}
type MaterialType = {
    _id: string;
    materialname: string;
    views: number;
    createdAt: string;
}
export default function MyMaterial({ _id }: User) {
    const [loading, setLoading] = useState<boolean>(false)

    const [materialDetails, setMaterialDetails] = useState<MaterialType[]>([]);
    const [filename, setFilename] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true)

        try {
            const response = await axiosInstance.get(`/material/by-user/`, { withCredentials: true })
            setMaterialDetails(response.data.materials)
            setLoading(false)

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    console.log(materialDetails);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            setFilename(files[0].name);
        }
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(true);
    }

    const handleDragLeave = () => {
        setDragActive(false);
    }
    return (
        <>
            <div className="items_display_page">
                <div className="items_display_header">
                    <h1>My Material :</h1>

                </div>
                <div className='items_cards_list'>
                    {
                        loading ? <Loader width={35} height={15} top={50} color={"var(--secondary-color)"} /> :
                            <>
                                {

                                    materialDetails.length === 0 ? (
                                        <div className='not_available_text'>No Materials Uploaded</div>
                                    ) : (
                                        <>
                                            {
                                                materialDetails.map((materials: MaterialType, index) => (
                                                    <div className="option_material_card" key={index}>
                                                        <div className="option_material_details" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                                                            <div className="liked_m aterial_name">{materials.materialname}</div>
                                                            <div className="liked_material_name" >Uploaded On :{materials.createdAt}</div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </>
                    }

                </div>
            </div>
        </>
    )
}
