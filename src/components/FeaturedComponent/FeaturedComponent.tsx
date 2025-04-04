import React, { useEffect, useState } from "react";
import styles from "./FeaturedComponent.module.css";
import axiosInstance from "../../utils/axios";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

type CourseType = {
    _id: string;
    coursename: string;
    description: string;
};

type MaterialType = {
    _id: string;
    materialname: string;
    description: string;
    isPublished: boolean;
    fileType: string;
    owner: string;
    url: string;
};
export default function FeaturedComponent() {

    const navigate = useNavigate();
    const [courseDetails, setCourseDetails] = useState<CourseType[]>([]);
    const [materialDetails, setMaterialDetails] = useState<MaterialType[]>([]);

    const fetchData = async () => {
        try {
            const courseResponse = await axiosInstance.get("/course", {
                withCredentials: true,
                params: { limit: 4 },
            });
            const materialResponse = await axiosInstance.get("/material", {
                withCredentials: true,
                params: { limit: 4 },
            });
            setCourseDetails(courseResponse.data.courses);
            setMaterialDetails(materialResponse.data.materials);
            console.log(materialResponse);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <h2 className="section-title">Recommended Courses:</h2>
            <div className="parent_container">
                <div className={styles.container}>
                    {courseDetails.map((course: CourseType, index) => (
                        <div className={styles.box} key={index}>
                            <div className={styles.inner_box} onClick={()=>navigate(`/course/${course.coursename}/subject`)}>
                                <div className={styles.front}>{course.coursename}</div>
                                <div className={styles.back}>{course.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h2 className="section-title">New Materials:</h2>
            <div className="parent_container">
                <div className={styles.container}>
                    {materialDetails.map((material: MaterialType, index) => (
                        <div className={styles.box} key={index}>
                            <div className={styles.inner_box}>
                                <div className={styles.front}>{material.materialname}</div>
                                {/* <div className={styles.back}>{material.description}</div> */}
                                <div className={styles.back}>
                                    <ReactPlayer url={material.url}
                                        // width="1080px"
                                        // height="720px"
                                        width="100px"
                                        height="45px"
                                        controls={true}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}