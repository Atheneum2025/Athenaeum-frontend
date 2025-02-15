import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import Cookies from "js-cookie"
import styles from "./NewLogin.module.css";

const LoginPage = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("")
    const [isActive, setIsActive] = useState(false);
    const [color, setColor] = useState("red");
    const navigate = useNavigate();

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
                const response = await axiosInstance.post(`/auth/login`, { username, password }, { withCredentials: true })
                console.log(response);
                setColor("green");
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

            if (!username || !password || !email) {
                setSignupMessage("Please fill in all the fields");
                return;
            }
            if (!validateEmail(email)) {
                setEmailError("Invalid email error")
                return;
            }
            if (password !== confirmPassword){
                setPasswordError("Passwords do not match");
                return;
            }
            const response = await axiosInstance.post('/auth/signup', { username, password, role, email });
            setSignupMessage("Registration Successful")
            setColor("green");
            setEmail("")
            setUsername("")
            setPassword("")
            setEmailError("")
            setPasswordError("")
            setConfirmPassword("")
            setRole("")
            console.log(response.data)

        } catch (error: any) {
            console.error(error)
            setSignupMessage(error.reponse?.data?.message || "Email already exists");
        }
    }

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log(email)
        return emailRegex.test(email);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setConfirmPassword("")
        if ((password.length + 1) < 5) {
            setPasswordError(`password must be atleast 5 characters`)
            return true
        }
        else {
            setPasswordError("");
            return false
        }
    }


    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setPasswordError("Passwords do not match")
            return true
        }
        else {
            setPasswordError("")
            return false
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
                                value={confirmPassword}
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
                                    <pre style={{color: "{color}"}} >{signupMessage}</pre>
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
                            <div className={styles["error_message"]}>
                                {loginMessage && (
                                    <pre style={{ color: "{color}" }} >{loginMessage}</pre>
                                )}
                            </div>
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
                                <a href="/home">Continue as guest</a>

                            </div>
                            <div className={`${styles["toggle_panel"]} ${styles["toggle_right"]}`}>
                                <h1>Welcome Back!</h1>
                                <p>
                                    Enter your personal details to use all of site features
                                </p>
                                <button className={styles.hidden} onClick={() => setIsActive(true)}>
                                    Sign Up
                                </button>
                                <a href="/home">Continue as guest</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;