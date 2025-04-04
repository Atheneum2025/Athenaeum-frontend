import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import Cookies from "js-cookie"
import styles from "./NewLogin.module.css";
import OpenEye from "../../assets/openEye.png";
import CloseEye from "../../assets/closeEye.png";
import Loader from "../../components/Loader/Loader";

const LoginPage = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    // const [role, setRole] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("")
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const [isActive, setIsActive] = useState(false);
    const [color, setColor] = useState("red");
    const [loading, setLoading] = useState<boolean>(false)
    const [signUpLoading, setSignUpLoading] = useState<boolean>(false)
    const navigate = useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);


    const [loginMessage, setResMessage] = useState<string>("");
    const [signupMessage, setSignupMessage] = useState<string>("");


    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        // Add authentication logic
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
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
            setLoading(false)
        }
        catch (error) {
            console.error(error);
            setResMessage("Invalid User Credentials");
        }
        finally {
            setLoading(false)
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setSignUpLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
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
            if (!validatePassword(password)) {
            setSignUpLoading(false);
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
            setSignUpLoading(false)

        } catch (error: any) {
            console.error(error)
            setSignupMessage(error.reponse?.data?.message || "Email already exists");
        }
        finally {
            setSignUpLoading(false)
        }
    }

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log(email)
        return emailRegex.test(email);
    }

    // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    //     setPassword(e.target.value);
    //     setConfirmPassword("")
    //     if ((password.length + 1) < 5) {
    //         setPasswordError(`password must be atleast 5 characters`)
    //         setIsPasswordValid(false);

    //         return true
    //     }
    //     else if(!passwordRegex.test(password)){
    //         setPasswordError(`at least one letter and one number. `)
    //         setIsPasswordValid(false);

    //         return true
    //     }
    //     else {
    //         setPasswordError("");
    //         setIsPasswordValid(true);

    //         return false
    //     }
    // }

    const validatePassword = (pwd: string): boolean => {
        if (pwd.length < 5) {
            setPasswordError("Password must be at least 5 characters long.");
            return false;
        }
        const hasLetter = /[A-Za-z]/.test(pwd);
        const hasNumber = /\d/.test(pwd);

        if (!hasLetter || !hasNumber) {
            setPasswordError("At least one letter and one number.");
            return false;
        }

        setPasswordError("");
        return true;
    };


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
                                    onChange={(e) => {setPassword(e.target.value); setConfirmPassword("")}}
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
                            <button type="submit" className={styles["submit_btn"]} disabled={signUpLoading}>{signUpLoading ? "Signing Up.." : "Sign Up"}</button>
                            <div className={styles["error_message"]}>
                                {
                                    signUpLoading ? (
                                        <>
                                            <Loader width={25} height={10} top={88} color={"#434146"} />
                                        </>
                                    ) : (
                                        <>
                                            {emailError && <pre>{emailError}</pre>}
                                            {passwordError && <pre>{passwordError}</pre>}
                                            {signupMessage && (
                                                <pre style={{ color: "{color}", height: "20px" }} >{signupMessage}</pre>
                                            )}
                                        </>
                                    )
                                }

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
                            <button type="submit" className={styles["submit_btn"]} disabled={loading}>{loading ? "Signing In.." : "Sign In"}</button>
                            <div className={styles["error_message"]}>
                                {
                                    loading ? (<div className={styles["loading"]}>
                                        <Loader width={25} height={10} top={74} color={"#434146"} />
                                    </div>) : (
                                        loginMessage && (
                                            <pre style={{ color: "{color}" }} >{loginMessage}</pre>
                                        )
                                    )
                                }
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