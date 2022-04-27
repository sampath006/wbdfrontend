import React, { useEffect, useState } from 'react'
import './adminPage.css'
import axios from "axios"
import Header from '../../components/header/Header';
import Events from '../../components/events/Events';
import { useLocation,Link } from 'react-router-dom';
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";

export default function AdminPage(){

    //declarimg set and use states
    const [posts, setPosts] = useState([]);
    const [events, setEvents] = useState([]);

    //fetching user from the context
    const [users, setUsers] = useState([])

    //getting the url location
    const {search} = useLocation(); 

    useEffect(()=>{
        //fetching the blog posts
        const fetchPosts = async ()=>{
            const res = await axios.get("/posts"+search)
            setPosts(res.data)
        }
        //fetching events
        const fetchEvents = async ()=>{
            const res = await axios.get("/events"+search)
            setEvents(res.data)
        }

        //fetching the users
        const fetchUsers = async() => {
            const res = await axios.get("/users")
            setUsers(res.data)
        }
        fetchPosts();
        fetchEvents();
        fetchUsers();
    },[search])
   
    
    return(
        <>
        <NavBar/>
        <div className = "adminPage">
            <h1 className="adminHeader">Admin Page</h1>
                {/* displayes the total blog posts */}
                <div className="postsAndBlogsCount">
                    <span className = "postsCount">Total Posts :{posts.length}</span>
                    <span className = "eventsCount">Total Events :{events.length}</span>
                </div>
                <Link className="link" to="/addEvent"><button className="addEvent"> Add An Event </button></Link>
                {/* displays the evenst present */}
                <Events events = {events}/>

                {/* <h1>hello</h1> */}
        </div>
        <Footer/>
        </>
    );
}
