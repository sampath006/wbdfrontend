import React from 'react';
import "./event.css";
import {Link} from "react-router-dom";

export default function Event({event}) {

    
    //Fetching image path
    const PF = "http://localhost:5000/images/"

    return (
        <div className="eventPost">
            {/* Fetching all details of the post and displaying it*/}
            {event.photo && (
                <img
                className="eventImg"
                src={PF + event.photo}
                alt="image"
                />
            )}
            <div className="eventInfo">
                <div className="eventCats">
                    {event.categories.map((c)=>(
                        <span className="eventCat">{c.name}</span>
                    ))}
                </div>

                {/* When we click on title it will redirect to the single event page */}
                <Link className="link" to={`/event/${event._id}`}>
                <span className="eventTitle">{event.title}</span>
                </Link>
                <span className="eventPrice">${event.prize}</span>
                <span className="eventDate" >ON : {new Date(event.date).toDateString()}</span>
                <hr/>
            
            <p className="eventDesc">
            {event.desc}
            </p>
            </div>
        </div>
    )
}

