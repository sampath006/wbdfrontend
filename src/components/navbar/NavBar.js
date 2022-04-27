import "./navbar.css"
import React, { useContext, useState} from 'react'
import logo from "../../assets/Picture1.jpg";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";


export default function NavBar() {
    //Fetching user details from context
    const {user, dispatch} = useContext(Context)
    const PF = "http://localhost:5000/images/"

    //Handles logout functionality
    const handleLogout = ()=>{
        dispatch({type:"LOGOUT"});
    };

    return (
        <div className="nav">
            <div id="logo">
                {/* Logo Image */}
                <img src={logo} />
            </div>

            <div className="centerNav">
                <ul className="topList">
                    <li className="topListItem">
                        {/* Link to home page */}
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    {user ? (
                        <li className="topListItem">
                            {/* query which gives us the blogs written by the user */}
                        <Link className="link" to={`/?user=${user.username}`}>BLOGS</Link>
                        </li>
                    ) : (
                        <li className="topListItem">
                            {/* if not a user then redirected to login page */}
                        <Link className="link" to="/login">BLOGS</Link>
                        </li>
                    )}
                    <li className="topListItem">
                        {/* links to add blogs page */}
                    <Link className="link" to="/add">ADD</Link>
                    </li>
                    <li className="topListItem">
                        {/* links to events page */}
                        <Link className="link" to="/event">EVENT</Link>
                    </li>
                    <li className="topListItem">
                        {/* links to about us page */}
                    <Link className="link" to="/about">ABOUT</Link>
                    </li>

                    {user ? (user.username==="Sampath" ? (
                        <li className="topListItem">
                        {/* Admin page */}
                    <Link className="link" to="/AdminPage">ADMIN PAGE</Link></li> ): (" ")) : (" ")}



                    {/* on click it handles the logout functionality */}
                    <li className="topListItem" onClick={handleLogout}>
                    {user && "LOGOUT"}
                    </li>

                </ul>
            </div>
            <div className="rightNav">
                { user ? (
                    // if user is present it shows the profile pic at right side which is linked to settings
                    <Link to="/settings" className="link"><img className="rightImg" src={PF + user.profilePic} alt=""/>
                    <span className="userName">{user.username}</span>
                    </Link>
                
                    ) :(
                        <ul className="topList">
                            <li className="topListItem">
                                {/* links to login page */}
                                <Link className="link" to="/login">LOGIN</Link>
                            </li>
                            <li className="topListItem">
                                {/* links to register page */}
                                <Link className="link" to="/register">REGISTER</Link>
                            </li>
                        </ul>
                    )
                }
            </div>
        </div>
    )
}