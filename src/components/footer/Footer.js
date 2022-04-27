import React from 'react'
import "./footer.css"
import { useContext } from 'react'
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Button from '@material-ui/core/Button';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {

    // Fetching user details from context
    const {user, dispatch} = useContext(Context)

    return (
        <div className="footer">
            <div className="footerTitles">
            <ul className="botList">
                    <li className="botListItem">
                        {/* Link to Home page */}
                        <Link className="link" to="/">HOME</Link> 
                    </li>
                    {/* Query which shows the blogs written by the user */}
                    {user ? (
                        <li className="botListItem">
                            <Link className="link" to={`/?user=${user.username}`}>BLOGS</Link>
                        </li>
                        ) : (
                            <li className="botListItem">
                            <Link className="link" to="/login">BLOGS</Link>
                            </li>
                        )}
                    <li className="botListItem">
                        {/* link to the evnets page */}
                        <Link className="link" to="/event">EVENT</Link>
                    </li>
                    
                    <li className="botListItem">
                        {/* Link to the about us page */}
                    <Link className="link" to="/about">ABOUT</Link>
                    </li>
                    
            </ul>
            </div>


            <div className='icons'>
                {/* Contact us buttons */}
                <div className = "button"><Button variant="outlined" color="blue" href="https://www.facebook.com/">Facebook <FacebookIcon/></Button></div>
                <div className = "button"><Button variant="outlined" color="red" href="https://www.twitter.com/">Twitter <TwitterIcon/></Button></div>
                <div className = "button"><Button variant="outlined" color="black" href="mailto:sampathkumarreddy.m19@iiits.in">CONTACT US <EmailIcon/></Button></div>
                <div className = "button"><Button variant="outlined" color="pink" href="https://www.instagram.com/?hl=en">Instagram <InstagramIcon/></Button></div>
            </div>
        </div>
    )
}
