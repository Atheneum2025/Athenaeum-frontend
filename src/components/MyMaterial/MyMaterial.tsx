import axiosInstance from '../../utils/axios';
import { useEffect, useState } from 'react'

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

    const [materialDetails, setMaterialDetails] = useState<MaterialType[]>([]);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/material/${_id}`, { withCredentials: true })
            setMaterialDetails(response.data.materials)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    console.log(materialDetails);
    return (
        <>
            <div className="items_display_page">
                <div className="items_display_header">
                    <h1>My Material :</h1>
                </div>
                <div className='items_cards_list'>
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

                </div>
            </div>
        </>
    )
}
