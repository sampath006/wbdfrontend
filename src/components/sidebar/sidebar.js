import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "./sidebar.css"

// this works for side bar where we can add more features
export default function Sidebar(){
    const [cats,setCats] = useState([]);

    useEffect(()=>{
        const getCats = async ()=>{
            const res = await axios.get("/categories")//Fecthing categories data
            setCats(res.data)
        } // this will fetch more details about cateogeries
        getCats();
    },[])

    return (
        <div>
            <div className="sidebar">
                <div className="sidebarItem">
                    <table>
                        <th className="filterCategories">
                            <ul className="sidebarList">
                                <span className="sidebarTitle">CATEGORIES:</span>
                                {cats.map(c=>(
                                    <Link to={`/?cat=${c.name}`} className="link">
                                        <li className="sidebarListItem">{c.name}</li>
                                    </Link>
                                ))}
                            </ul>
                        </th>
                    </table>
                </div>
            </div>
        </div>
    )
}