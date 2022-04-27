import "./register.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer"

export default function Register(){

    //declaring set and use states 
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    //handles the submit functionality
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register", {//posts the data to the backend
                username,
                email,
                password,
            });
            res.data && window.location.replace("/login")//replaces the url
        } catch (err) {
            setError(true);
        }
    };

    return (
        <>
        <NavBar />
        <div className="register">
            <span className="registerTitle">Register</span>
        {/* register form */}
            <form className="registerForm" onSubmit={handleSubmit}>
                {/* username input */}
                <label>Username</label>
                <input type="text" placeholder="Enter Your Username" className="registerInput" onChange={e=>setUsername(e.target.value)}/>
                {/* emial input */}
                <label>Email</label>
                <input type="text" placeholder="Enter Your Email" className="registerInput" onChange={e=>setEmail(e.target.value)}/>
                {/* password input */}
                <label>Password</label>
                <input type="password" placeholder="Enter Your Password" className="registerInput" onChange={e=>setPassword(e.target.value)}/>
                {/* register button */}
                <button className="registerButton" type="submit">Register</button>
            </form>
            <button className="registerLoginButton">
                {/* link to login page */}
            <Link className="link" to="/login">LOGIN</Link>
            </button>
            {/* display error */}
            {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!!</span>}
        </div>
        <Footer />
        </>
    )
}