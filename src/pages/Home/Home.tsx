import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

// import Header from "../../components/Header/Header";

type User = {
  _id: string;
  username: string;
  role: string;
}
export default function Home() {
  // const {isAuthenticated, logout} = useContext(AuthContext);


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

      <div>Hello this is Rishon</div>
      <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat quae sunt sapiente, aut facilis perspiciatis necessitatibus? In aspernatur nesciunt dicta nulla! Ut est nisi suscipit quidem, modi laborum illum, hic ipsum possimus minima rem!</h1>
      <div>
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
      </div>
      <h1>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non ut dicta, aut sequi doloremque aliquid animi totam quibusdam nobis quis sed unde accusantium facere maxime rem delectus fugiat possimus illo consequatur exercitationem laboriosam quo facilis? Ipsa dignissimos aliquid neque, deleniti recusandae dolores? Voluptatem dolores alias quod natus exercitationem expedita officiis modi beatae? Ipsam deserunt nihil fugit necessitatibus quis. Velit quidem reiciendis soluta totam ducimus, tempora distinctio. Accusantium impedit minima nihil dicta porro dignissimos in! Necessitatibus fuga cum iste! Aspernatur quos ea possimus? Omnis quaerat est voluptatem reiciendis nam tempora.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima laboriosam, magni sed facere similique vero delectus possimus neque animi sit voluptatem. Nam tenetur excepturi pariatur veritatis vel minus eos quaerat voluptate, iste expedita facilis quibusdam, blanditiis, id voluptatibus vitae? Voluptatibus ipsum itaque eius atque ratione.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro recusandae delectus in quo accusantium alias, magnam mollitia quia eligendi. Beatae tenetur excepturi non qui sit. Sint error eius quis, ex aut alias? Maxime officia eum quis quod repellat, dolores ipsa, ex sed itaque, quidem quisquam.
      </h1>
    </>
  )
}
