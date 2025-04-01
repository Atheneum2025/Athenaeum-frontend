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
    window.scrollTo(0, 0);
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

      <FeaturedComponent />
      {/* <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolore voluptatum ut sapiente fuga nesciunt quo beatae dignissimos voluptatibus aspernatur consectetur magni repudiandae cumque quod laborum, dicta doloremque nostrum sit reiciendis accusamus, rerum ullam. Quibusdam deleniti, dolor fuga magnam quod ad. Deserunt culpa veniam nobis.
      </div> */}
    </>
  )
}
