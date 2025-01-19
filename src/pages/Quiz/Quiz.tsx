import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type QuizType = {
    _id: string;
    quizName: string;
    author: string;
}
export default function Quiz() {
    const navigate = useNavigate();

    const [quizDetails, setQuizDetails] = useState<QuizType[]>([])

    useEffect(() => {

        const fetchdata = async () => {
            try {
                const quizResponse = await fetch("http://localhost:3000/api/v1/quiz/");
                const quizResult = await quizResponse.json();
                setQuizDetails(quizResult.quizes);
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchdata();
    }, []);
    console.log(quizDetails)
    function sendData(quizId: string){
        navigate(`/quizzes/${quizId}/questions`, { state: { quizId: quizId } });
    }

    return (
        <>



            <div>Quiz</div>
            <div className="course_cards_list">
                {quizDetails.map((quiz: QuizType) => (
                    <div key={quiz._id} className="course_card" onClick={() => sendData(quiz._id)}>

                        <div className="course_details">
                            <div className='course_name'>Quiz Name: {quiz.quizName}</div>
                            <div className='course_description'>Quiz By :{quiz.author}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
