import axiosInstance from '../../utils/axios';
import { useEffect, useState } from 'react'

type User = { 
    _id: string;
}
type MaterialType = {
    _id: string;
    materialname: string;
    views: number;
}
export default function MyMaterial({_id}: User) {

    const [materialDetails, setMaterialDetails] = useState<MaterialType[]>([]);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/material/${_id}`, {withCredentials: true})
            setMaterialDetails(response.data.materials)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() =>{
        fetchData();
    }, [])
    console.log(materialDetails);
    return (
        <>
            <div>MyMaterial</div>
            <div className='liked_materials'>
                {
                    materialDetails.map((materials: MaterialType, index) => (
                        <div className="liked_material_card" key={index}>
                            <div className="liked_material_details">
                                <div className="liked_material_name">{materials.materialname}</div>
                                <div className='uploaded_by'>{materials._id}</div>
                                <div>{materials.views}</div>
                            </div>
                        </div>

                    ))
                }
                
            </div>
        </>
    )
}
