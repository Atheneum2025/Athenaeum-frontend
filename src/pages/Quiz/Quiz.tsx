import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedUser } from '../../utils/authUtils';

type QuizType = {
    _id: string;
    quizName: string;
    author: string;
}
export default function Quiz() {
    const navigate = useNavigate();

    const [quizDetails, setQuizDetails] = useState<QuizType[]>([])
    const [formIsVisible, setFormIsVisible] = useState<boolean>(false);

    const [quizName, setQuizName] = useState<string>("");
    const [questionOne, setQuestionOne] = useState<string>("");
    const [questionTwo, setQuestionTwo] = useState<string>("");
    const [questionThree, setQuestionThree] = useState<string>("");
    const [questionFour, setQuestionFour] = useState<string>("");
    const [questionFive, setQuestionFive] = useState<string>("");
    const [answerOne, setAnswerOne] = useState<boolean>();
    const [answerTwo, setAnswerTwo] = useState<boolean>();
    const [answerThree, setAnswerThree] = useState<boolean>();
    const [answerFour, setAnswerFour] = useState<boolean>();
    const [answerFive, setAnswerFive] = useState<boolean>();


    const { user, isAuthenticated } = getAuthenticatedUser();

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
    function sendData(quizId: string) {
        navigate(`/quizzes/${quizId}/questions`, { state: { quizId: quizId } });
    }
    function showLeaderboard(quizId: string) {
        navigate(`/quizzes/${quizId}/leaderboard`);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/v1/quiz/', { quizName, questionOne, answerOne, questionTwo, answerTwo, questionThree, answerThree, questionFour, answerFour, questionFive, answerFive });
            console.log("course created", response.data);
            setFormIsVisible(false)
        }
        catch (err) {
            console.error("failed:", err);
            setFormIsVisible(false)
        }
    }

    return (
        <>



            <div>Quiz</div>
            {
                isAuthenticated ? (
                    <>
                        {
                            user.role === "professor" && (
                                <>
                                    <button className='add-btn' id='btn' onClick={() => setFormIsVisible(true)}>Add New Quiz</button>
                                    {
                                        formIsVisible && (
                                            <div className="form-for-adding-new">
                                                <form action="" onSubmit={handleSubmit}>
                                                    <label htmlFor="quizName">Enter Quiz Name</label>
                                                    <input type="text" id='quizName' value={quizName} onChange={(e) => setQuizName(e.target.value)} />

                                                    <label htmlFor="questionOne">Question One : </label>
                                                    <input type="text" id='questionOne' value={questionOne} onChange={(e) => setQuestionOne(e.target.value)} />

                                                    {/* <label htmlFor="correctAnswerOne">Correct Answer : </label> */}
                                                    <input type="button" value={"true"} onClick={() => setAnswerOne(true)} />
                                                    <input type="button" value={"false"} onClick={() => setAnswerOne(false)} />


                                                    <label htmlFor="questionTwo">Question Two : </label>
                                                    <input type="text" id='questionTwo' value={questionTwo} onChange={(e) => setQuestionTwo(e.target.value)} />
                                                    <input type="button" value={"true"} onClick={() => setAnswerTwo(true)} />
                                                    <input type="button" value={"false"} onClick={() => setAnswerTwo(false)} />

                                                    <label htmlFor="questionThree">Question Three : </label>
                                                    <input type="text" id='questionThree' value={questionThree} onChange={(e) => setQuestionThree(e.target.value)} />
                                                    <input type="button" value={"true"} onClick={() => setAnswerThree(true)} />
                                                    <input type="button" value={"false"} onClick={() => setAnswerThree(false)} />

                                                    <label htmlFor="questionFour">Question Four : </label>
                                                    <input type="text" id='questionFour' value={questionFour} onChange={(e) => setQuestionFour(e.target.value)} />
                                                    <input type="button" value={"true"} onClick={() => setAnswerFour(true)} />
                                                    <input type="button" value={"false"} onClick={() => setAnswerFour(false)} />

                                                    <label htmlFor="questionFive">Question Five : </label>
                                                    <input type="text" id='questionFive' value={questionFive} onChange={(e) => setQuestionFive(e.target.value)} />
                                                    <input type="button" value={"true"} onClick={() => setAnswerFive(true)} />
                                                    <input type="button" value={"false"} onClick={() => setAnswerFive(false)} />

                                                    <button type='submit'>Save</button>
                                                    <button onClick={() => setFormIsVisible(false)}>Cancel</button>
                                                </form>
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                        < div className="course_cards_list">
                            {quizDetails.map((quiz: QuizType) => (
                                <div key={quiz._id}>

                                    <div className="course_card" onClick={() => sendData(quiz._id)}>

                                        <div className="course_details">
                                            <div className='course_name'>Quiz Name: {quiz.quizName}</div>
                                            <div className='course_description'>Quiz By :{quiz.author}</div>
                                        </div>
                                    </div>
                                    <button onClick={() => showLeaderboard(quiz._id)}>Check Leaderboard</button>
                                </div>
                            ))}
                        </div >
                    </>
                ) : (
                    <div>please login </div>
                )
            }
        </>
    )
}
