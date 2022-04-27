import React from 'react';
import "./sliderEvent.css";
import {Link} from "react-router-dom";

export default function SliderEvent({event}) {

    const PF = "http://localhost:5000/images/"

    return (
        <div className="eventPost">
            {/* fetching events from the backend */}
            {event.photo && (
                <img
                className="eventsliderImg"
                src={PF + event.photo}
                alt="image"
                />
            )}
            <div className="eventInfo">
                <div className="eventCats">
                    {/* mapping the category */}
                    {event.categories.map((c)=>(
                        <span className="eventCat">{c.name}</span>
                    ))}
                </div>
                {/* on clik it goes to the single event */}
                <Link className="link" to={`/event/${event._id}`}>
                <span className="eventsliderTitle">{event.title}</span>
                </Link>
                
            
            </div>
        </div>
    )
}

