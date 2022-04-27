import "./adminlogin.css"
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

    //dispacting the state and action from the context
    const {dispatch, isFetching} = useContext(Context)

    //handles submit functionality
    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"});//dispatch login start action
        try {
            const res = await axios.post("/auth/adminlogin",{//post data to login and check
                username: userRef.current.value,
                password: passwordRef.current.value
            });
            dispatch({type:"LOGIN_SUCCESS", payload: res.data});//dispatch login succes action

        } catch (err) {
            dispatch({type:"LOGIN_FAILURE"}); //dispatch login failure action
            alert("Wrong Credentials")
        }
    };


    return (
        <>
        <NavBar />
        <div className="adminlogin">
            <span className="adminloginTitle">AdminLogin</span>
            {/* login form */}
            <form className="adminloginForm" onSubmit={handleSubmit}>
                {/* username input */}
                <label>Username</label>
                {/* password input */}
                <input type="text" placeholder="Enter Your Username" className="adminloginInput" ref={userRef}/>
                <label>Password</label>
                <input type="password" placeholder="Enter Your Password" className="adminloginInput" ref={passwordRef}/>
                <button className="adminloginButton" type="submit" disabled={isFetching}>Admin Login</button>
            </form>
            <h3 style={{marginTop:"10px"}}>If you need the admin access please contact us</h3>

        </div>
        <Footer />
        </>
    )
}