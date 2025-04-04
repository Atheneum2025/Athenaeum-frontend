import axios from 'axios';
import './Quiz.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedUser } from '../../utils/authUtils';
import AddImage from '../../assets/add.png';
import Loader from '../../components/Loader/Loader';
import axiosInstance from '../../utils/axios';
import ErrorPage from '../ErrorPage/ErrorPage';

type QuizType = {
    _id: string;
    quizName: string;
    selectedSubject: string;
    author: string;
}

type SubjectType = {
    subjectname: string;
}
export default function Quiz() {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<SubjectType[]>([])

    const [quizDetails, setQuizDetails] = useState<QuizType[]>([])
    const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [subject, setSubject] = useState<string>("")
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    const [subjectToSend, setSubjectToSend] = useState<string>("");
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

    const fetchData = async () => {
        setLoading(true)
        try {
            const quizResponse = await fetch("http://localhost:3000/api/v1/quiz/");
            const quizResult = await quizResponse.json();
            setQuizDetails(quizResult.quizes);
            setLoading(false)
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
        fetchSubjects();
        
    }, []);

    useEffect(()=>{
        if (selectedSubject) {
            setSubject("");
            setSubjectToSend(selectedSubject);
        }

        if (subject.length > 0) {
            setSelectedSubject("");
            setSubjectToSend(subject);
        }
    }, [selectedSubject, subject])

    const fetchSubjects = async () => {
        try {
            const response = await axiosInstance.get(`/subject`);
            setSubjects(response.data.subjects);
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    }
    
    function sendData(quizId: string) {
        navigate(`/quiz/${quizId}/questions`, { state: { quizId: quizId } });
    }
    function showLeaderboard(quizId: string) {
        navigate(`/quiz/${quizId}/leaderboard`);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        
        try {
            const response = await axiosInstance.post('/quiz/', { selectedSubject: subjectToSend, quizName, questionOne, answerOne, questionTwo, answerTwo, questionThree, answerThree, questionFour, answerFour, questionFive, answerFive }, { withCredentials: true });
            console.log("course created", response.data);
            fetchData();
            setFormIsVisible(false)
        }
        catch (err) {
            console.error("failed:", err);
            setFormIsVisible(false)
        }
    }

    return (
        <>
            {
                isAuthenticated ? (
                    <>
                        <div className="items_display_page">
                            <div className="items_display_header">

                                <h1>Quizzes :</h1>
                                {
                                    user.role !== "student" && (
                                        <>
                                            <button className='add_btn' onClick={() => setFormIsVisible(true)}>
                                                <img src={AddImage} alt="" />
                                                <div>Add New Quiz</div>
                                            </button>
                                            {
                                                formIsVisible && (
                                                    <div className="add_new_material">
                                                        <div className="add_new_material_form">
                                                            <form action="" onSubmit={handleSubmit}>
                                                                <div className="add_new_material_form_header">
                                                                    <h2>Create New Quiz</h2>
                                                                    <button type="button" onClick={() => { setFormIsVisible(false) }}>✕</button>
                                                                </div>
                                                                <div className="question_form_field">
                                                                    <label>Subject</label>
                                                                    <select
                                                                        value={selectedSubject}
                                                                        onChange={(e) => {setSelectedSubject(e.target.value)}}
                                                                    >
                                                                        <option value="">Select Subject</option>
                                                                        {
                                                                            subjects.map((subject, index) => (
                                                                                <option value={subject.subjectname} key={index}>{subject.subjectname}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                    OR
                                                                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
                                                                </div>
                                                                <div className="question_form_field">
                                                                    <label htmlFor="quizName">Enter Quiz Name :</label>
                                                                    <input type="text" id='quizName' maxLength={50} value={quizName} onChange={(e) => setQuizName(e.target.value)} />
                                                                </div>
                                                                <div className="question_form_field">
                                                                    <label htmlFor="questionOne">Question One : </label>
                                                                    <div className="question">
                                                                        <textarea maxLength={120} id='questionOne' value={questionOne} onChange={(e) => setQuestionOne(e.target.value)}></textarea>
                                                                        <button type="button" onClick={() => setAnswerOne(true)} >True</button>
                                                                        <button type="button" onClick={() => setAnswerOne(false)} >False</button>
                                                                    </div>
                                                                </div>


                                                                <div className="question_form_field">
                                                                    <label htmlFor="questionTwo">Question Two : </label>
                                                                    <div className="question">
                                                                        <textarea maxLength={120} id='questionTwo' value={questionTwo} onChange={(e) => setQuestionTwo(e.target.value)}></textarea>
                                                                        <button type="button" onClick={() => setAnswerTwo(true)} >True</button>
                                                                        <button type="button" onClick={() => setAnswerTwo(false)} >False</button>
                                                                    </div>
                                                                </div>

                                                                <div className="question_form_field">
                                                                    <label htmlFor="questionThree">Question Three : </label>
                                                                    <div className="question">
                                                                        <textarea maxLength={120} id='questionThree' value={questionThree} onChange={(e) => setQuestionThree(e.target.value)}></textarea>
                                                                        <button type="button" onClick={() => setAnswerThree(true)} >True</button>
                                                                        <button type="button" onClick={() => setAnswerThree(false)} >False</button>
                                                                    </div>
                                                                </div>


                                                                <div className="question_form_field">
                                                                    <label htmlFor="questionFour">Question Four : </label>
                                                                    <div className="question">
                                                                        <textarea maxLength={120} id='questionFour' value={questionFour} onChange={(e) => setQuestionFour(e.target.value)}></textarea>
                                                                        <button type="button" onClick={() => setAnswerFour(true)} >True</button>
                                                                        <button type="button" onClick={() => setAnswerFour(false)} >False</button>
                                                                    </div>
                                                                </div>

                                                                <div className="question_form_field">
                                                                    <label htmlFor="questionFive">Question Five : </label>
                                                                    <div className="question">
                                                                        <textarea maxLength={120} id='questionFive' value={questionFive} onChange={(e) => setQuestionFive(e.target.value)}></textarea>
                                                                        <button type="button" onClick={() => setAnswerFive(true)} >True</button>
                                                                        <button type="button" onClick={() => setAnswerFive(false)} >False</button>
                                                                    </div>
                                                                </div>
                                                                <div className="quiz_upload_btns">
                                                                    <button type="button" onClick={() => setFormIsVisible(false)}>Cancel</button>
                                                                    <button type="submit">Create Quiz</button>
                                                                </div>
                                                                {/* <button type='submit'>Save</button>
                                                                <button onClick={() => setFormIsVisible(false)}>Cancel</button> */}
                                                            </form>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }
                            </div>
                            <div className="items_cards_list">
                                {
                                    loading ? <Loader width={35} height={15} top={50} color={''} /> :
                                        <>
                                            {quizDetails.length === 0 ? (
                                                <div className='not_available_text'>No Quizzes Available</div>
                                            ) : (
                                                <>

                                                    {quizDetails.map((quiz: QuizType, index) => (
                                                        <div key={quiz._id}>

                                                            <div className="secondary_item_card" onClick={() => sendData(quiz._id)}>
                                                                <div className="index">{index + 1}.</div>
                                                                <div className="course_details">
                                                                    <div className='course_name'>Quiz Name: {quiz.quizName}</div>
                                                                    {
                                                                        quiz.selectedSubject && (
                                                                            <div className='course_description'>Subject :{quiz.selectedSubject}</div>
                                                                        )
                                                                    }
                                                                    <div className='course_description'>Quiz By :{quiz.author}</div>
                                                                </div>
                                                            </div>
                                                            <button onClick={() => { showLeaderboard(quiz._id) }} className='add_btn'>Check Leaderboard</button>
                                                        </div>
                                                    ))}
                                                </>
                                            )
                                            }
                                        </>

                                }
                            </div >
                        </div>
                    </>
                ) : (
                    <>
                        <div>Please Login to access Quiz</div>
                        <button><a href="/login">Login</a></button>
                    </>
                )
            }

        </>
    )
}

