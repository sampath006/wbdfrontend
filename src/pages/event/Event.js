import React, { useEffect, useState } from 'react';
import Events from '../../components/events/Events';
import SidebarEve from '../../components/eventSidebar/eventSidebar';
import "./event.css";
import axios from "axios";
import { useLocation,Link } from 'react-router-dom';
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer"

export default function Event() {

    //declaring set and use states
    const [events, setEvents] = useState([]);
    const {search} = useLocation(); 


    //fetching the events from the backend
    useEffect(()=>{
        const fetchEvents = async ()=>{
            const res = await axios.get("/events"+search)
            setEvents(res.data)
        }
        fetchEvents();
    },[search])
    return (
        <>
        <NavBar />
        <SidebarEve />
        <div className="event">
            {/* maps the events like props */}
           <Events events = {events}/>
        </div>
        <div className='eventh3'>
        <h3>If you want to organise an event please contact us to get the admin access.<br/> Our contact information is provided in the About page. </h3>
        </div>
        <Footer />
        </>
    )
}