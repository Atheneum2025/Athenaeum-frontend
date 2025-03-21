import React, { useState } from 'react'
import EmptyStar_Image from '../../assets/star.png';
import FilledStar_Image from '../../assets/star_filled.png';
import './RatingComponent.css'

export default function RatingComponent() {

    const [rating, setRating] = useState<number | null>(null);
    const [hover, setHover] = useState<number | null>(null);
    const [totalStars, setTotalStars] = useState(5);


    return (
        <>
            <form action="">
                {/* <input type="checkbox" name="" id="" />
                <input type="checkbox" name="" id="" />
                <input type="checkbox" name="" id="" />
                <input type="checkbox" name="" id="" />
                <input type="checkbox" name="" id="" />
                <img src={EmptyStar_Image} alt="" />
                <img src={EmptyStar_Image} alt="" />
                <img src={EmptyStar_Image} alt="" />
                <img src={EmptyStar_Image} alt="" />
                <img src={EmptyStar_Image} alt="" />

                <img src={FilledStar_Image} alt="" /> */}

                {[...Array(totalStars)].map((star, index) => {

                    const currentRating = index + 1;
                    return (
                        <label htmlFor="" key={index} className="star">
                            <input type="radio" name="rating" value={currentRating} onChange={() => setRating(currentRating)} />
                            <span 
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(currentRating)}
                            >
                                <img src={currentRating <= (hover | rating) ? FilledStar_Image : EmptyStar_Image} alt="" />
                                {/* {
                                    
                                    currentRating <= (hover | rating) ? <img src={EmptyStar_Image} alt="" /> : <img src={FilledStar_Image} alt="" />
                                } */}
                            </span>
                        </label>
                    )
                })}

                <button>Rate</button>
                <button style={{ backgroundColor: "red" }}>
                    Cancel
                </button>
            </form>
        </>
    )
}
