import React, { useEffect, useState } from 'react'
import "./Leaderboard.css"
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { getAuthenticatedUser } from '../../utils/authUtils';

type LeaderboardType = {
  _id: string;
  score: number;
  quiz: string;
  studentname: string;
}
export default function Leaderboard() {
  const { user, isAuthenticated } = getAuthenticatedUser();

  const { quizId } = useParams<{ quizId: string }>();
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([])
  // const [sortedLeaderboard, setSortedLeaderboard] = useState<LeaderboardType[]>([])


  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`http://localhost:3000/api/v1/quiz/${quizId}/leaderboard`);
        // console.log(response.data);
        setLeaderboard(response.data.leaderboard)
      }
      catch (error) {
        console.error(error)
      }
    }

    fetchData();
  }, [])

  let sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score)

  return (
    <>
    {
      isAuthenticated ? (
        <>
        
      <div>Leaderboard</div>
      {/* <div>{ }</div> */}
      <div className='leaderboard'>
        <div className='leaderboard_grid header'>
          <div>Rank</div>
          <div>Student</div>
          <div>Score</div>
        </div>
        {
          sortedLeaderboard.map((leaderboard: LeaderboardType, index) => (
            <div className='leaderboard_grid score' key={leaderboard._id}>
              <div>{index + 1}</div>
              <div>{leaderboard.studentname}</div>
              <div>{leaderboard.score}</div>
            </div>
          ))
        }
      </div>
        </>
      ):(
        <div>please Login</div>
      )
    }

    </>
  )
}
