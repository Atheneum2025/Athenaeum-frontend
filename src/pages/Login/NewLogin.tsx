import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import Cookies from "js-cookie"
import styles from "./NewLogin.module.css";
import OpenEye from "../../assets/openEye.png";
import CloseEye from "../../assets/closeEye.png";

const LoginPage = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    // const [role, setRole] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("")
    const [isActive, setIsActive] = useState(false);
    const [color, setColor] = useState("red");
    const navigate = useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);


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
            if (password !== confirmPassword) {
                setPasswordError("Passwords do not match");
                return;
            }
            const response = await axiosInstance.post('/auth/signup', { username, password, email });
            setSignupMessage("Registration Successful")
            setColor("green");
            setEmail("")
            setUsername("")
            setPassword("")
            setEmailError("")
            setPasswordError("")
            setConfirmPassword("")
            // setRole("")
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
                            <fieldset>
                                <legend>Username</legend>
                                <input
                                    type="text"
                                    name="name"
                                    value={username}
                                    placeholder="Name"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </fieldset>
                            <fieldset>
                                <legend>Email</legend>
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </fieldset>
                            <fieldset>
                                <legend>Password</legend>
                                <input
                                    type="text"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <div className="hide_password" onMouseOver={() => setIsPasswordVisible((prev) => !prev)} onMouseOut={() => setIsPasswordVisible((prev) => !prev)} ></div>
                            </fieldset>


                            <fieldset>
                                <legend>Confirm Password</legend>
                                <input
                                    type="text"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    placeholder="Confirm Password"
                                    onChange={handleConfirmPasswordChange}
                                />
                            </fieldset>
                            <button type="submit">Sign Up</button>
                            <div className={styles["error_message"]}>

                                {emailError && <pre>{emailError}</pre>}
                                {passwordError && <pre>{passwordError}</pre>}
                                {signupMessage && (
                                    <pre style={{ color: "{color}" }} >{signupMessage}</pre>
                                )}
                            </div>
                        </form>

                    </div>

                    {/* Sign In Form */}
                    <div className={`${styles["form_container"]} ${styles["sign_in"]}`}>
                        <form onSubmit={handleSignIn}>
                            <h2>Sign In</h2>
                            <fieldset>
                                <legend>Username or Email</legend>
                                <input
                                    type="text"
                                    name="username"
                                    id="loginUsername"
                                    value={username}
                                    placeholder="Username or Email"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </fieldset>
                            <fieldset>
                                <legend>Password</legend>
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className={styles["hide_password"]} onMouseOver={() => setIsPasswordVisible((prev) => !prev)} onMouseOut={() => setIsPasswordVisible((prev) => !prev)} >
                                    {
                                        isPasswordVisible ? (
                                            <img src={OpenEye} alt="" />
                                        ) : (
                                            <img src={CloseEye} alt="" />
                                        )
                                    }
                                </div>
                            </fieldset>
                            <button type="submit" className={styles["submit_btn"]}>Sign In</button>
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
                                <a href="/home" className={`${styles["guest_btn"]}`}>Continue as guest</a>

                            </div>
                            <div className={`${styles["toggle_panel"]} ${styles["toggle_right"]}`}>
                                <h1>Welcome Back!</h1>
                                <p>
                                    Enter your credentials to login into our website
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