import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Events from '../../components/events/Events';
import Sidebar from '../../components/sidebar/sidebar';
import Button from '@material-ui/core/Button'
import Pagination from '@material-ui/lab/Pagination';
import NavBar from "../../components/navbar/NavBar";
import SearchIcon from '@mui/icons-material/Search';
import Footer from "../../components/footer/Footer"
import "./home.css";
import axios from "axios"
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export default function Home() {
    
    //declaring the set and use states
    const [index,setIndex] = useState(0)
    const [posts, setPosts] = useState([]);
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");

    //fetching the user from the context
    const [users, setUsers] = useState([])

    //getting the window location
    const {search} = useLocation(); 

    //fetching the blog posts and events and also users
    useEffect(()=>{
       
        const fetchPosts = async ()=>{
            const res = await axios.get("/posts"+search)
            setPosts(res.data)
        }
        const fetchAllEvents = async()=>{
            const res = await axios.get("/posts/all")
        }
        const fetchEvents = async ()=>{
            const res = await axios.get("/events"+search)
            setEvents(res.data)
        }
        const fetchUsers = async() => {
            const res = await axios.get("/users")
            setUsers(res.data)
        }
        fetchPosts();
        fetchEvents();
        fetchUsers();
        fetchAllEvents();
    },[search])

    //pagination
    const slice = posts.slice(6*index,6*index+6);

    //it handles the change functionality
    const handleChange = (event, value) => {
        setIndex(value-1);
      };
    const handleSearch = ()=>{
        try {
            window.location.replace(`/?title=${title}`);
        } catch (err) {
            
        }
    }
    const currentURL = window.location.href
    return (
        <>
        <NavBar />
        

        {/* display slider in homepage */}
        {(currentURL==="http://localhost:3000/")?(<Header events={events}/>) : ( " " )}
         <Sidebar />

        <div className="searchHome">
            <div className="searchTitle">
                <form onSubmit={handleSearch}>
                    <input className="searchByTitle" name="title" type="text" placeholder="Title"onChange={(e) => setTitle(e.target.value)}></input>
                    <Button type='submit'><SearchIcon style={{color:"black", fontSize:40}} /></Button>
                </form> 
            </div>
        </div>

        <div className="home">
            {/* slicing the blogs */}
           <Posts posts = {slice}/>
        </div>
        <div className='paginate'>
            <div className = "innerPaginate">
                {/* pagination */}
                <Pagination count={Math.ceil(posts.length/6)} onChange={handleChange}/>
            </div>
        </div>
        <Footer/>
        </>
    )
}
