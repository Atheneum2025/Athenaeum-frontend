import React, { useState } from "react";
// import Button from '../../components/Button/Button'
import "./Login.css";
import axios from "axios";
import { useUserContext } from "../../context/UserContext.tsx";

function Login() {
  const {isLoggedIn ,login} = useUserContext();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:3000/auth/login',{username, password});
      console.log("login successful", response.data);
      console.log(isLoggedIn)
      login();
    }
    catch(err){
      console.error("Login failed:", err);
    }
  }

  return (
    <div className="login">
      <div className="login-background">
        <div className="login-form">
          <div>LOG IN</div>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="username">EMAIL</label>
            <input
              type="text"
              value={username}
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              type="text"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="login-btn">
              LOG IN
            </button>
          </form>
          <p>Don't have an account? Sign Up</p>
          <p><a style={{color:"black", textDecoration:"none"}} href="/home">Continue as guest</a></p>
        </div>
        <div className="login-text">
          WELCOME BACK
          <p>login with your username and password Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis officia earum neque?</p>
        </div>
      </div>

      <div className="box"></div>
    </div>
  );
}

export default Login;
