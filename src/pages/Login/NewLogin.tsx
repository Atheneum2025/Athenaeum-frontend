import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import Cookies from "js-cookie"
import styles from "./Login.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faGoogle,
//   faFacebookF,
//   faGithub,
//   faLinkedinIn,
// } from "@fortawesome/free-brands-svg-icons";

const LoginPage = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("")
    const [isActive, setIsActive] = useState(false);
    // const [formData, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    // });
    const navigate = useNavigate();

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    // if(password.length < 6){
    //     setPasswordError("Password  must be atleast 6 characters")
    // }

    const [loginMessage, setResMessage] = useState<string>("");
    const [signupMessage, setSignupMessage] = useState<string>("");


    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add authentication logic
        try {
            if (!(username && password)) {
                setResMessage("Please fill in all the fields")
            }
            else {
                const response = await axios.post(`http://localhost:3000/auth/login`, { username, password }, { withCredentials: true })
                console.log(response);
                navigate("/home");
                localStorage.setItem("authToken", JSON.stringify(response.data));
                Cookies.set("authToken", response.data.accessToken)
            }
        }
        catch (error) {
            console.error(error);
            setResMessage("Invalid User Credentials");
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!(username && password)) {
                setSignupMessage("Please fill in all the fields")
            }
            if (validateEmail(email)) {
                const response = await axios.post('http://localhost:3000/auth/signup', { username, password, role, email });
                setSignupMessage("Registration Successful")
                setEmail("")
                console.log(response.data)
            }
            else {
                setEmailError("Invalid email error")

            }
        } catch (error) {
            console.error(error)
            setSignupMessage("Email already exists")
        }

        // navigate("/dashboard");
    }

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log(email)
        return emailRegex.test(email);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (password.length + 1 <= 5) {
            setPasswordError(`password must be atleast ${password.length + 1} characters`)
            return
        }
        else {
            setPasswordError("");
        }
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match")
            return
        }
        else {
            setPasswordError(" ")
        }
    }


    return (
        <>
            <div className={styles["login_page"]}>

                <div
                    className={`${styles.container} ${isActive ? styles.active : ""}`}
                    id="container"
                >
                    {/* Sign Up Form */}
                    <div className={`${styles["form_container"]} ${styles["sign_up"]}`}>
                        <form onSubmit={handleSignUp}>
                            <h2>Create Account</h2>
                            <input
                                type="text"
                                name="name"
                                value={username}
                                placeholder="Name"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <input
                                type="text"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <input
                                type="text"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={handleConfirmPasswordChange}
                            />
                            <input
                                type="text"
                                name="name"
                                value={role}
                                placeholder="Role"
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <button type="submit">Sign Up</button>
                            <div className={styles["error_message"]}>

                                {emailError && <pre>{emailError}</pre>}
                                {passwordError && <pre>{passwordError}</pre>}
                                {signupMessage && (
                                    <pre className={styles["error_message"]}>{signupMessage}</pre>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Sign In Form */}
                    <div className={`${styles["form_container"]} ${styles["sign_in"]}`}>
                        <form onSubmit={handleSignIn}>
                            <h2>Sign In</h2>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                placeholder="Email"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="text"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Sign In</button>
                            {loginMessage && (
                                <pre className={styles["error_message"]}>{loginMessage}</pre>
                            )}
                        </form>
                    </div>

                    {/* Toggle Container */}
                    <div className={styles["toggle_container"]}>
                        <div className={styles.toggle}>
                            <div className={`${styles["toggle_panel"]} ${styles["toggle_left"]}`}>
                                <h1>Hello, Friend!</h1>
                                <p>
                                    Register with your personal details to use all of site features
                                </p>
                                <button
                                    className={styles.hidden}
                                    onClick={() => setIsActive(false)}
                                >
                                    Sign In
                                </button>
                            </div>
                            <div className={`${styles["toggle_panel"]} ${styles["toggle_right"]}`}>
                                <h1>Welcome Back!</h1>
                                <p>
                                    Enter your personal details to use all of site features
                                </p>
                                <button className={styles.hidden} onClick={() => setIsActive(true)}>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;