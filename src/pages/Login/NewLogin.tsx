import { useState } from "react";
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
    const [role, setRole] = useState<string>("");
    const [email, setEmail] = useState<string>("");
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

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add authentication logic
        try {
            const response = await axios.post(`http://localhost:3000/auth/login`, { username, password }, { withCredentials: true })
            console.log(response);
            navigate("/home");
            localStorage.setItem("authToken", JSON.stringify(response.data));
            Cookies.set("authToken", response.data.accessToken)
        }
        catch (error) {
            console.error(error);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', { username, password, role, email });
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
        // navigate("/dashboard");

    }

    return (
        <div
            className={`${styles.container} ${isActive ? styles.active : ""}`}
            id="container"
        >
            {/* Sign Up Form */}
            <div className={`${styles["form-container"]} ${styles["sign-up"]}`}>
                <form onSubmit={handleSignUp}>
                    <h1>Create Account</h1>
                    <div className={styles["social-icons"]}>
                        {/* <a href="#" className={styles.icon}>
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="#" className={styles.icon}>
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className={styles.icon}>
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className={styles.icon}>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a> */}
                    </div>
                    <span>or use your email for registration</span>
                    <input
                        type="text"
                        name="name"
                        value={username}
                        placeholder="Name"
                        onChange={(e)=> setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        name="name"
                        value={role}
                        placeholder="Role"
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>

            {/* Sign In Form */}
            <div className={`${styles["form-container"]} ${styles["sign-in"]}`}>
                <form onSubmit={handleSignIn}>
                    <h1>Sign In</h1>
                    <div className={styles["social-icons"]}>
                        {/* <a href="#" className={styles.icon}>
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="#" className={styles.icon}>
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className={styles.icon}>
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className={styles.icon}>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a> */}
                    </div>
                    <span>or use your email password</span>
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
                    <Link to="/forgot-password">Forget Your Password?</Link>
                    <button type="submit">Sign In</button>
                </form>
            </div>

            {/* Toggle Container */}
            <div className={styles["toggle-container"]}>
                <div className={styles.toggle}>
                    <div className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}>
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
                    <div
                        className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}
                    >
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
    );
};

export default LoginPage;