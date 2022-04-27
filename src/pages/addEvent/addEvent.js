import "./addEvent.css"
import React, { useContext, useState } from "react";
import axios from 'axios';
import { Context } from "../../context/Context";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer"

export default function AddEvent() {

    //declaring the use and set variables
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [prize, setPrize] = useState("");
    const [venue, setVenue] = useState("");
    const [categories, setCategories] = useState("");
    const [file, setFile] = useState(null);

    //fetching the user from the context
    const { user } = useContext(Context);

    //handles the add event functionality
    const handleAdd = async (e) => {
        e.preventDefault();
        const newEvent = {
            username: user.username,
            title,
            desc,
            categories,
            date,
            prize,
            venue,
        }

        //handles the image file
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newEvent.photo = filename;
            try {
                await axios.post("/upload", data);//uploads the image
            } catch (err) {

            }
            try {
                const res = await axios.post("/events", newEvent);//post the data to the backend
                window.location.replace("/event/" + res.data._id);//replaces the url
            } catch (err) {

            }
        }

    };


    return (
        <>
        <NavBar />
        <div className="addEve">
            {/* show image */}
            {file && (
                <img className="addImgEve" src={URL.createObjectURL(file)} alt="" />
            )}
            {/* form data */}
            <form className="addFormEve" onSubmit={handleAdd}>
                <div className="addFormGroupEve">
                    <div className="addImageEvent">
                        {/* add image */}
                        <label >
                            Choose Event Image : <input name="image" type="file" className="addInputImgEve" onChange={(e) => setFile(e.target.files[0])}></input>
                        </label>
                    </div>
                    <br />
                    <p></p>
                    <br />
                    <div className="addTitleTextEve">
                        <label >Add your Title : <input name="title" type="text" placeholder="Title" className="addInputEve" onChange={(e) => setTitle(e.target.value)} ></input></label>
                    </div>
                    <br />
                    {/* add date */}
                    <div className="addTitleTextEve">
                        <label >Date : <input name="date" type="date" className="addDateEve" onChange={(e) => setDate(e.target.value)} ></input></label><br />
                    </div>
                    <div className="addTitleTextEve">
                        <label >Prize Money : <input name="prize" type="text" placeholder="$$$" className="addPrizeEve" onChange={(e) => setPrize(e.target.value)} ></input></label><br />
                    </div>
                    {/* venue */}
                    <div className="addVenueTextEve">
                        <label >Venue : <input name="venue" type="text" placeholder="Venue" className="addVenueEve" onChange={(e) => setVenue(e.target.value)} ></input></label><br />
                    </div>
                </div>
                    {/* description */}
                <div className="addFormGroupEve">
                    <textarea type="text" name="para" placeholder=" Tell About your Event " className="addTextEve" onChange={(e) => setDesc(e.target.value)}></textarea>
                </div>
                {/* add event button */}
                <button className="addSubmitEve" type="submit"> ADD EVENT</button>
            </form>
        </div>
        <Footer />
        </>
    )
}