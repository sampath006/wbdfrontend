import "./login.css"
import { Link } from "react-router-dom";
import { useContext,useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer"

export default function Login(){

    //declaring the user and password reference
    const userRef = useRef()
    const passwordRef = useRef()

    //using dispatch from the context
    const {dispatch, isFetching} = useContext(Context)

    //handles the submit functionality
    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"});//dispatches the login start function
        try {
            const res = await axios.post("/auth/login",{//posts the data to the backend
                username: userRef.current.value,
                password: passwordRef.current.value
            });
            dispatch({type:"LOGIN_SUCCESS", payload: res.data});//dsiapatches the login success action

        } catch (err) {
            dispatch({type:"LOGIN_FAILURE"}); //dispatches the login failure action
            alert("Wrong Credentials")
        }
    };


    return (
        <>
        <NavBar />
        <div className="login">
            <span className="loginTitle">Login</span>
        {/* Login form */}
            <form className="loginForm" onSubmit={handleSubmit}>
                {/* username input */}
                <label>Username</label>
                <input type="text" placeholder="Enter Your Username" className="loginInput" ref={userRef}/>
                {/* password input */}
                <label>Password</label>
                <input type="password" placeholder="Enter Your Password" className="loginInput" ref={passwordRef}/>
                {/* login button */}
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterButton">
                {/* link to register page */}
            <Link className="link" to="/register">REGISTER</Link>
            </button>
            <button className="adminloginRegisterButton">
                {/* link to admin login page */}
                <Link className="link" to="/Adminlogin">ADMIN-LOGIN</Link>
            </button>
        </div>
        <Footer />
        </>
    )
}