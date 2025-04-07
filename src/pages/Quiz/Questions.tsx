import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthenticatedUser } from '../../utils/authUtils';
import questions from "./Questions.module.css";


type QuestionsType = {
    quiz: any;
    quizName: string;
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
    const navigate = useNavigate();

    const [answers, setAnswers] = useState<Record<number, boolean>>({})
    const [score, setScore] = useState<number>(0);
    const [question, setQuestionsDetails] = useState<QuestionsType>()
    const { quizId } = useParams<{ quizId: string }>();

    const [selectAnswerOne, setSelectAnswerOne] = useState<boolean>(false);

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
            const response = await axios.post(`http://localhost:3000/api/v1/quiz/${quizId}/leaderboard/`, { currentScore }, { withCredentials: true });
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

    function showLeaderboard(quizId: string) {
        navigate(`/quiz/${quizId}/leaderboard`);
    }

    return (
        <>
            {
                isAuthenticated ? (
                    <>
                        <div className="items_display_page">
                            <div className="items_display_header">
                                <h1>{question?.quizName}</h1>
                            </div>
                            <div className="items_cards_list">
                                <div className={questions.questions_page}>
                                    {/* {questionsDetails.map((question: QuestionsType) => ( */}
                                    {
                                        question ? (
                                            <>
                                                <div key={question._id} className='question_list' >

                                                    <div className="main-div">
                                                        <div className='question'>
                                                            <div className='course_name'>Q 1. {question.questionOne}</div>
                                                            {/* <div className='course_description'>Answer{question.answerOne.toString()}</div> */}
                                                            <button onClick={() => handleAnswer(1, true)}>True</button>
                                                            <button onClick={() => handleAnswer(1, false)}>False</button>
                                                            {answers[1] != null && (answers[1] ? (<div>Your Answer : True</div>) : (<div>Your Answer : False</div>))}
                                                        </div>
                                                        <div className='question'>
                                                            <div className='course_name'>Q 2. {question.questionTwo}</div>
                                                            {/* <div className='course_description'>Answer{question.answerTwo.toString()}</div> */}
                                                            <button onClick={() => handleAnswer(2, true)}>True</button>
                                                            <button onClick={() => handleAnswer(2, false)}>False</button>
                                                            {answers[2] != null && (answers[2] ? (<div>Your Answer : True</div>) : (<div>Your Answer : False</div>))}
                                                        </div>
                                                        <div className='question'>
                                                            <div className='course_name'>Q 3. {question.questionThree}</div>
                                                            {/* <div className='course_description'>Answer{question.answerThree.toString()}</div> */}
                                                            <button onClick={() => handleAnswer(3, true)}>True</button>
                                                            <button onClick={() => handleAnswer(3, false)}>False</button>
                                                            {answers[3] != null && (answers[3] ? (<div>Your Answer : True</div>) : (<div>Your Answer : False</div>))}
                                                        </div>
                                                        <div className='question'>
                                                            <div className='course_name'>Q 4. {question.questionFour}</div>
                                                            {/* <div className='course_description'>Answer{question.answerFour.toString()}</div> */}
                                                            <button onClick={() => handleAnswer(4, true)}>True</button>
                                                            <button onClick={() => handleAnswer(4, false)}>False</button>
                                                            {answers[4] != null && (answers[4] ? (<div>Your Answer : True</div>) : (<div>Your Answer : False</div>))}
                                                        </div>
                                                        <div className='question'>
                                                            <div className='course_name'>Q 5. {question.questionFive}</div>
                                                            {/* <div className='course_description'>Answer{question.answerFive.toString()}</div> */}
                                                            <button onClick={() => handleAnswer(5, true)}>True</button>
                                                            <button onClick={() => handleAnswer(5, false)}>False</button>
                                                            {answers[5] != null && (answers[5] ? (<div>Your Answer : True</div>) : (<div>Your Answer : False</div>))}
                                                        </div>
                                                    </div>
                                                    <div className="quiz_footer">
                                                        <button className='save-button' onClick={calculateScore}>Submit Quiz</button>
                                                        {
                                                            score ? (
                                                                <div>Your Score : {score}</div>
                                                            ) : (
                                                                <div></div>
                                                            )
                                                        }
                                                        <button onClick={() => { showLeaderboard(question._id,) }} className='add_btn'>Check Leaderboard</button>
                                                    </div>

                                                </div>
                                            </>
                                        ) : (
                                            <div>No questions available</div>
                                        )
                                    }
                                    {/* ))} */}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>Please Login</div>
                )
            }
        </>
    )
}
