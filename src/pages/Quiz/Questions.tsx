import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAuthenticatedUser } from '../../utils/authUtils';
import questions from "./Questions.module.css";

type QuestionsType = {
    quiz: any;
    _id: string;
    questionOne: string;
    answerOne: boolean;
    questionTwo: string;
    answerTwo: boolean;
    questionThree: string;
    answerThree: boolean;
    questionFour: string;
    answerFour: boolean;
    questionFive: string;
    answerFive: boolean;
};
export default function Questions() {

    const { user, isAuthenticated } = getAuthenticatedUser();


    const [answers, setAnswers] = useState<Record<number, boolean>>({})
    const [score, setScore] = useState<number>(0);
    const [question, setQuestionsDetails] = useState<QuestionsType>()
    const { quizId } = useParams<{ quizId: string }>();


    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchdata = async () => {
            try {
                const questionsResponse = await axios.get<QuestionsType>(`http://localhost:3000/api/v1/quiz/${quizId}/`);
                setQuestionsDetails(questionsResponse.data.quiz);
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchdata();
    }, [quizId]);

    const handleAnswer = (questionId: number, answer: boolean) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    console.log(answers)

    const handleSubmit = async (currentScore: number) => {

        try {
            console.log(currentScore)
            const response = await axios.post(`http://localhost:3000/api/v1/quiz/${quizId}/leaderboard/`, { currentScore }, {withCredentials: true});
            console.log("leaderboard created", response.data);
        }
        catch (err) {
            console.error("signup failed:", err);
        }
    }
    const calculateScore = () => {
        if (!question) return;

        let currentScore = 0;

        // Check each question's answer
        if (answers[1] === question.answerOne) currentScore++;
        if (answers[2] === question.answerTwo) currentScore++;
        if (answers[3] === question.answerThree) currentScore++;
        if (answers[4] === question.answerFour) currentScore++;
        if (answers[5] === question.answerFive) currentScore++;

        console.log(currentScore)
        setScore(currentScore);
        handleSubmit(currentScore);
    };
    // console.log(score)

    return (
        <>
            {
                isAuthenticated ? (
                    <>

                        <h1>Questions</h1>
                        <div className={questions.questions_page}>
                            {/* {questionsDetails.map((question: QuestionsType) => ( */}
                            {
                                question ? (
                                    <>
                                        <div key={question._id} className={questions.question_list} >

                                            <div className="course_details">
                                                <div className='question_answer'>
                                                    <div className='course_name'>Q 1. {question.questionOne}</div>
                                                    {/* <div className='course_description'>Answer{question.answerOne.toString()}</div> */}
                                                    <button onClick={() => handleAnswer(1, true)}>True</button>
                                                    <button onClick={() => handleAnswer(1, false)}>False</button>
                                                </div>
                                                <div className='question_answer'>

                                                    <div className='course_name'>Q 2. {question.questionTwo}</div>
                                                    {/* <div className='course_description'>Answer{question.answerTwo.toString()}</div> */}
                                                    <button onClick={() => handleAnswer(2, true)}>True</button>
                                                    <button onClick={() => handleAnswer(2, false)}>False</button>
                                                </div>
                                                <div className='question_answer'>

                                                    <div className='course_name'>Q 3. {question.questionThree}</div>
                                                    {/* <div className='course_description'>Answer{question.answerThree.toString()}</div> */}
                                                    <button onClick={() => handleAnswer(3, true)}>True</button>
                                                    <button onClick={() => handleAnswer(3, false)}>False</button>
                                                </div>
                                                <div className='question_answer'>

                                                    <div className='course_name'>Q 4. {question.questionFour}</div>
                                                    {/* <div className='course_description'>Answer{question.answerFour.toString()}</div> */}
                                                    <button onClick={() => handleAnswer(4, true)}>True</button>
                                                    <button onClick={() => handleAnswer(4, false)}>False</button>
                                                </div>
                                                <div className='question_answer'>

                                                    <div className='course_name'>Q 5. {question.questionFive}</div>
                                                    {/* <div className='course_description'>Answer{question.answerFive.toString()}</div> */}
                                                    <button onClick={() => handleAnswer(5, true)}>True</button>
                                                    <button onClick={() => handleAnswer(5, false)}>False</button>
                                                </div>
                                            </div>
                                            <button onClick={calculateScore}>Submit Quiz</button>
                                        </div>
                                    </>
                                ) : (
                                    <div>No questions available</div>
                                )
                            }
                            {/* ))} */}
                        </div>
                    </>
                ) : (
                    <div>Please Login</div>
                )
            }
        </>
    )
}
