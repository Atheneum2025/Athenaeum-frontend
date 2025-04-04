import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import "./Home.css";
import styles from "../../components/FeaturedComponent/FeaturedComponent.module.css";
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
};
export default function Home() {
  // const {isAuthenticated, logout} = useContext(AuthContext);
  const { isAuthenticated } = getAuthenticatedUser();

  const [scrollY, setScrollY] = useState<number>(0);
  const [visibleBoxes, setVisibleBoxes] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const handleScroll = () => {
    setScrollY(window.scrollY);

    // Check visibility of each box based on scroll position
    const boxPositions = [800, 1000, 1200]; // Adjust these values based on your layout
    const newVisibleBoxes = boxPositions.map(
      (position) => window.scrollY > position
    );
    setVisibleBoxes(newVisibleBoxes);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const leftHandMovement = -scrollY * 1;
  const rightHandMovement = scrollY * 1;
  const disappear = Math.max(1 - scrollY / 500, 0);

  const [professorDetails, setProfessorDetails] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     try {
  //       const ProfessorResponse = await fetch(
  //         "http://localhost:3000/api/v1/users/"
  //       );
  //       const ProfessorResult = await ProfessorResponse.json();
  //       setProfessorDetails(ProfessorResult.Users);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchdata();
  // }, []);
  return (
    <>
      <div className="hero" id="home">
        <div className="hero_text" style={{ opacity: `${disappear}` }}>
          <div className="hero_text_heading">ATHENAEUM</div>
          <p className="hero_text_para">
            "Athenaeum - where knowledge meets wisdom"
          </p>
          {!isAuthenticated && (
            <div className="hero_btns">
              <button>
                <a href="/login">Sign In</a>
              </button>
              <button>
                <a href="/login">Sign Up</a>
              </button>
            </div>
          )}
        </div>
        <img
          className="hands left"
          style={{
            transform: ` translateY(-50%) translateX(${leftHandMovement}px)`,
          }}
          id="left"
          src={Left_Hand_Image}
          alt=""
        />
        <img className="middle_hero" src={HeroImage} alt="" />
        <img
          className="hands right"
          style={{
            transform: `translateY(-50%) translateX(${rightHandMovement}px)`,
          }}
          id="right"
          src={Right_Hand_Image}
          alt=""
        />
      </div>

      <FeaturedComponent />

      <br></br>
      <div className="new-section">
        {/* First Box */}
        <div className={`new-box ${visibleBoxes[0] ? "visible" : ""}`}>
          <h3>
            Free Study
            <br />
            Material For All
            <br />
            Students
          </h3>
          <div className="screenshot-image screenshot-image-01"></div>
        </div>

        {/* Second Box */}
        <div className={`new-box ${visibleBoxes[1] ? "visible" : ""}`}>
          <h3>
            Create Your
            <br />
            Own Study
            <br />
            Space
          </h3>
          <div className="screenshot-image screenshot-image-02"></div>
        </div>

        {/* Third Box */}
        <div className={`new-box ${visibleBoxes[2] ? "visible" : ""}`}>
          <h3>
            Curated By
            <br />
            Professors
          </h3>
          <div className="screenshot-image screenshot-image-03"></div>
        </div>
      </div>

      <div className="us-section">
        <div className="image-container">
          <div className="image-content">
            <h3>What is ATHENEAUM?</h3>
            <p>
              A platform built to make studying and education more streamlined
              and accessible, where the content is provided directly by
              professors and categorised in a way which makes finding relevant
              content less cumbersome.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}