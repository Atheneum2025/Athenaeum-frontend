import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import './Home.css'
import styles from '../../components/FeaturedComponent/FeaturedComponent.module.css';
import AllUsers from "../../components/AllUsers/AllUsers";
import { getAuthenticatedUser } from "../../utils/authUtils";
import HeroImage from "../../assets/athena.png";
import Left_Hand_Image from "../../assets/left_hand.png";
import Right_Hand_Image from "../../assets/right_hand.png";
import FeaturedComponent from "../../components/FeaturedComponent/FeaturedComponent";

// import Header from "../../components/Header/Header";
// let right = document.getElementById('right');
// let left = document.getElementById('left');

// window.addEventListener('scroll', ()=> {
//   let value = window.scrollY;

//   if (right) {
//     right.style.right = value * 1.5 + 'px';
//   }
// })
type User = {
  _id: string;
  username: string;
  role: string;
}
export default function Home() {
  // const {isAuthenticated, logout} = useContext(AuthContext);
  const { isAuthenticated } = getAuthenticatedUser();

  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  const leftHandMovement = -scrollY * 1;
  const rightHandMovement = scrollY * 1;
  const disappear = Math.max(1 - scrollY / 500, 0);

  const [professorDetails, setProfessorDetails] = useState<User[]>([]);

  useEffect(() => {

    const fetchdata = async () => {
      try {
        const ProfessorResponse = await fetch("http://localhost:3000/api/v1/users/");
        const ProfessorResult = await ProfessorResponse.json();
        setProfessorDetails(ProfessorResult.Users);
      }
      catch (error) {
        console.error(error);
      }
    }

    fetchdata();
  }, []);
  return (
    <>
      <div className="hero">
        <div className="hero_text"
          style={{ opacity: `${disappear}` }}
        >
          <div className="hero_text_heading">ATHENAEUM</div>
          <p className="hero_text_para">"Athenaeum - where knowledge meets wisdom"</p>
          {
            !isAuthenticated && (
              <div className="hero_btns">
                <button><a href="/login">Sign In</a></button>
                <button><a href="/login">Sign Up</a></button>
              </div>
            )
          }
        </div>
        <img className="hands left"
          style={{ transform: ` translateY(-50%) translateX(${leftHandMovement}px)` }}
          id="left" src={Left_Hand_Image} alt="" />
        <img className="middle_hero" src={HeroImage} alt="" />
        <img className="hands right"
          style={{ transform: `translateY(-50%) translateX(${rightHandMovement}px)` }}
          id="right" src={Right_Hand_Image} alt="" />
      </div>

      {/* <div>
        <div className="course_cards_list">
          {professorDetails.map((user: User) => (
            <div key={user._id} className="course_card">
              <div className="course_avatar">
                <div>{user.username}</div>
              </div>
              <div className="course_details">
                <div className='course_name'>Course Name: {user.username}</div>
                <div className='course_name'>Course Name: {user.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* <AllUsers role={"professors"} /> */}
      <FeaturedComponent />
      {/* <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.inner_box}>
            <div className={styles.front}>BCA</div>
            <div className={styles.back}>BAchelor in computer application</div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.inner_box}>
            <div className={styles.front}>BCA</div>
            <div className={styles.back}>BAchelor in computer application</div>
          </div>
        </div>
      </div> */}
    </>
  )
}
