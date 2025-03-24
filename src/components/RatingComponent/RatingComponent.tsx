import React, { useEffect, useState } from 'react'
import EmptyStar_Image from '../../assets/star.png';
import FilledStar_Image from '../../assets/star_filled.png';
import './RatingComponent.css'
import axiosInstance from '../../utils/axios';

type CourseType = {
    _id: string;
    coursename: string;
    description: string;
    keywords: string;
    rating: number;
}
type RatingComponentProps = {
    course: CourseType;
};

export default function RatingComponent({ course }: RatingComponentProps) {

    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [totalStars, setTotalStars] = useState(5);

    const [averageRating, setAverageRating] = useState<number>(0);
    const courseId = 2;
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`course/${course._id}/rate/`);
            setAverageRating(response.data.averageRating);
        } catch (error) {
            console.error("Error fetching ratings", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const submitRating = async (newRating: number) => {
        try {
            await axiosInstance.post(`course/${course._id}/rate/`, {
                courseId: course._id,
                rating: newRating,
            }, { withCredentials: true });
            setRating(newRating);
            fetchData();
        } catch (error) {
            console.error("Error submitting rating", error);
        }
    };


    return (
        <>
            <form action="" onSubmit={(e) => { e.preventDefault(); submitRating(rating); }}>
                <div className="ratings_section">
                    {[...Array(totalStars)].map((star, index) => {

                        const currentRating = index + 1;
                        return (
                            <label key={index} className="star">
                                <input type="radio" name="rating" value={currentRating} onChange={() => setRating(currentRating)} />
                                <span
                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    <img src={currentRating <= (hover || rating) ? FilledStar_Image : EmptyStar_Image} alt="" />
                                </span>
                            </label>
                        )
                    })}
                </div>
                <div className="upload_btns">
                    <button type="button">Cancel</button>
                    <button type='submit'>Rate</button>
                </div>
            </form>
        </>
    )
}
