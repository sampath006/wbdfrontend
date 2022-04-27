import "./add.css"
import React, { useContext, useState } from "react";
import axios from 'axios';
import { Context } from "../../context/Context";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer"


export default function Add() {

    //Declaring the set and use states
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [categories, setCategories] = useState("");
    const [file, setFile] = useState(null);

    //fetching user from the context
    const { user } = useContext(Context);

    //handles the add functionality 
    const handleAdd = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            userid: user._id,
            title,
            desc,
            categories,
        }

        //handles the image 
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", data);//uploads the image
            } catch (err) {

            }}
            try {
                const res = await axios.post("/posts", newPost);//post data to the backend
                window.location.replace("/post/" + res.data._id);//replaces the url
            } catch (err) {

            }
        
    };


    return (
        <>
        <NavBar />
        <div className="add">
            {/* image */}
            {file && (
                <img className="addImg" src={URL.createObjectURL(file)} alt="" />
            )}
            {/* form to add the data  */}
            <form className="addForm" onSubmit={handleAdd}>
                <div className="addFormGroup">
                    <div className="addBlogImg">
                        <label >
                            Choose Blog Image : <input name="image" type="file" className="addInputImg" onChange={(e) => setFile(e.target.files[0])}></input>
                        </label>
                    </div>
                    <p></p>
                    {/* categories of the blog */}
                    <div className="addCat">
                        <label for="category" >Category : </label>
                        <select name="category" className="addOption" onChange={(e) => setCategories(e.target.value)}>
                            <option value="Others">Select</option>
                            <option value="Music">Music</option>
                            <option value="Games">Games</option>
                            <option value="Sports">Sports</option>
                            <option value="News">News</option>
                            <option value="Telugu">Telugu</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Others">Others</option>
                        </select >
                        <br /></div>
                        {/* title */}
                    <div className="addTitleText">
                        <label >Add your Title : <input name="title" type="text" placeholder="Title" className="addInput" onChange={(e) => setTitle(e.target.value)} ></input>
                        </label></div>
                </div>

                <div className="addFormPara">
                    <textarea type="text" name="para" placeholder="Begin Your Story..." className="addText" onChange={(e) => setDesc(e.target.value)}></textarea>
                </div>
                <button className="addSubmit" type="submit"> Publish </button>
            </form>
        </div>
        <Footer />
        </>
    )
}