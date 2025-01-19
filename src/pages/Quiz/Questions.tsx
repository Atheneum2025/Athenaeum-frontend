import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

type QuestionsType = {
    _id: string;
    questionOne: string;
    answerOne: string;
    questionTwo: string;
    answerTwo: string;
    questionThree: string;
    answerThree: string;
    questionFour: string;
    answerFour: string;
    questionFive: string;
    answerFive: string;
};
export default function Questions() {

    const [answers, setAnswers] = useState<Record<number, boolean>>({})
    const [score, setScore] = useState<number | null>(null);
    const [question, setQuestionsDetails] = useState<QuestionsType>()
    const { quizId } = useParams<{ quizId: string }>();


    useEffect(() => {

        const fetchdata = async () => {
            try {
                const questionsResponse = await axios.get<QuestionsType>(`http://localhost:3000/api/v1/quiz/${quizId}/`);

                setQuestionsDetails(questionsResponse.data);
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchdata();
    }, []);
    

    return (
        <>
            <div>Questions</div>
            <div className="course_cards_list">
                {/* {questionsDetails.map((question: QuestionsType) => ( */}
                {
                    question ? (
                        <>
                            <div>questions</div>
                            <div key={question._id} className="course_card" >

                                <div className="course_details">
                                    <div className='question'>
                                        <div className='course_name'>Question One{question.questionOne}</div>
                                        <div className='course_description'>Answer{question.answerOne}</div>
                                        <button>True</button>
                                        <button>False</button>
                                    </div>
                                    <div className='question'>

                                        <div className='course_name'>Question Two{question.questionTwo}</div>
                                        <div className='course_description'>Answer{question.answerTwo}</div>
                                    </div>
                                    <div className='question'>

                                        <div className='course_name'>Question Three{question.questionThree}</div>
                                        <div className='course_description'>Answer{question.answerThree}</div>
                                    </div>
                                    <div className='question'>

                                        <div className='course_name'>Question Four{question.questionFour}</div>
                                        <div className='course_description'>Answer{question.answerFour}</div>
                                    </div>
                                    <div className='question'>

                                        <div className='course_name'>Question Five{question.questionFive}</div>
                                        <div className='course_description'>Answer{question.answerFive}</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>No questions available</div>
                    )
                }
                {/* ))} */}
            </div>
        </>
    )
}
