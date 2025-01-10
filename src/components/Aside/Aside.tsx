import React from "react"
import { Link } from "react-router-dom";

const Aside : React.FC = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Landing Page</Link></li>
                    <li><Link to="/home">Home</Link></li>
                </ul>
            </nav>
        </header>
    );

}

export default Aside