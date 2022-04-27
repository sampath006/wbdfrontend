import {  useState } from "react"
import "./eventSidebar.css"
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "@mui/material";

export default function SidebarEve(){

    //Declaring set and use states
    const [date, setDate] = useState("");

    //handles date functionality
    const handleDate = async()=>{
        try {
            window.location.replace(`/?date=${date}`);//query based on date
        } catch (err) {

        }
    }

    return (
        <div className="sidebarEveItems">
           <div className = "searchByDateDiv">
               {/* form to search date */}
            <form onSubmit={handleDate}>
                {/* date */}
                    <label className="sidebarEveTitle">Search By Date : <input name="date" type="date" onChange={(e) => setDate(e.target.value)}></input><Button type="submit"><SearchIcon style={{color:"black", fontSize:40}} /></Button></label>
            </form>
           </div>
        </div>
    )
}