import React,{useState,useEffect, useContext} from "react";
import axios from "axios";
import {useLocation, Link } from "react-router-dom";
import "./singleEvent.css";
import { Context } from "../../context/Context";

const SingleEvent = () => {

  //Using window location to get the url
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [event, setEvent] = useState({});

  //fetching image from local host 5000
  const PF = "http://localhost:5000/images/"

  //Fetching user from context
  const {user} = useContext(Context)

  //Declaring set and use states
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [prize, setPrize] = useState("");
  const [venue, setVenue] = useState("");

  const [updateMode, setUpdateMode] = useState(false);

  //It gets the value of the set variable
  useEffect(()=>{
    const getEvent = async ()=>{
      const res = await axios.get("/events/"+path);
      setEvent(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setDate(res.data.date);
      setPrize(res.data.prize);
      setVenue(res.data.venue);
    };
    getEvent()
  },[path])


//It handles the delete functionality of an event
  const handleDelete = async ()=>{
    try {
      await axios.delete(`/events/${event._id}`,{
        data:{username:user.username},
      });
      window.location.replace("/");//after deleting it reloads the page

    } catch (err) {
      
    }
  }

  //Handles the update event functionality of an event
  const handleUpdate = async ()=>{
    try {
      await axios.put(`/events/${event._id}`,{
        username:user.username, title,desc,date,prize,venue,
      });
      window.location.reload("/");//after updating it reloads the page

    } catch (err) {
      
    }
  }
  
  return (
      <div className="singleEvent">
        <div className="singleEventWrapper">
        {/* Fetching the data of a single event and displaying it */}
          {event.photo && (
            <img className="singleWrappereImg"
            src={PF + event.photo}
            alt=""
            className="singleEventImg"
          />
          )}{
            updateMode ? <input type="text" className="singleEventTitleInput" value={title} autoFocus  onChange={(e)=>setTitle(e.target.value)}/> : (
              <h1 className="singleEventTitle">
            {event.title}
            {/* Only the admin who added the event can edit and delete the events */}
            {event.username === user?.username && (
              <div className="singleEventEdit">
              <i className="singleEventIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                <i className="singleEventIcon far fa-trash-alt" onClick={handleDelete}></i>
              </div>
            )}
          </h1>
            )
          }
          {/* fetching the details like origanizer,venue and price */}
          <div className="singleEventInfo">
            <span className="singleEventAuthor">
              Organized By :  
              <Link to={`/?user=${event.username}`} className="link"><b> {event.username} </b></Link>
            </span>
            <span className="singleEventDate">Win:${event.prize}</span>
            <span className="singleEventDate">On : {new Date(event.date).toDateString()}</span>
          </div>
          {updateMode ? <input type="text" className="singleEventVenueInput" value={venue} autoFocus  onChange={(e)=>setVenue(e.target.value)}/> : (
            <p className="singleEventVenue">{event.venue}</p>
          ) }
          {/* if it is update mode then the admin can update the description of the event */}
          {updateMode ? <textarea className="singleEventDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)}/> : (
            <p className="singleEventDesc">{event.desc}</p>
          ) }
          {updateMode && <button className="singleEventButton" onClick={handleUpdate}> Update </button>}
        </div>
      </div>


  );
}

export default SingleEvent;