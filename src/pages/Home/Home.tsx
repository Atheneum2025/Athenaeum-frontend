import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import './Home.css'
import AllUsers from "../../components/AllUsers/AllUsers";
import { getAuthenticatedUser } from "../../utils/authUtils";

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
          <p className="hero_text_para">"Unlock the power of wisdom and strategy - Learn like Athena".</p>
          {
            !isAuthenticated && (
              <div className="hero_btns">
                <button><a href="/login">Login</a></button>
              </div>
            )
          }
        </div>
        <img className="hands left"
          style={{ transform: `translateY(-50%) translateX(${leftHandMovement}px)` }}
          id="left" src="..\src\assets\left_hand.png" alt="" />
        <img className="middle_hero" src="..\src\assets\middle_one.png" alt="" />
        <img className="hands right"
          style={{ transform: `translateY(-50%) translateX(${rightHandMovement}px)` }}
          id="right" src="..\src\assets\right_hand.png" alt="" />
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
      <AllUsers role={"professors"} />
      <h1>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non ut dicta, aut sequi doloremque aliquid animi totam quibusdam nobis quis sed unde accusantium facere maxime rem delectus fugiat possimus illo consequatur exercitationem laboriosam quo facilis? Ipsa dignissimos aliquid neque, deleniti recusandae dolores? Voluptatem dolores alias quod natus exercitationem expedita officiis modi beatae? Ipsam deserunt nihil fugit necessitatibus quis. Velit quidem reiciendis soluta totam ducimus, tempora distinctio. Accusantium impedit minima nihil dicta porro dignissimos in! Necessitatibus fuga cum iste! Aspernatur quos ea possimus? Omnis quaerat est voluptatem reiciendis nam tempora.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima laboriosam, magni sed facere similique vero delectus possimus neque animi sit voluptatem. Nam tenetur excepturi pariatur veritatis vel minus eos quaerat voluptate, iste expedita facilis quibusdam, blanditiis, id voluptatibus vitae? Voluptatibus ipsum itaque eius atque ratione.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro recusandae delectus in quo accusantium alias, magnam mollitia quia eligendi. Beatae tenetur excepturi non qui sit. Sint error eius quis, ex aut alias? Maxime officia eum quis quod repellat, dolores ipsa, ex sed itaque, quidem quisquam.
      </h1>
    </>
  )
}
