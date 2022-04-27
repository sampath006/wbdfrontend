import "./settings.css";
import {useState, useContext} from "react";
import {Context} from "../../context/Context";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer"

export default function Settings(){

    //declaring set and use states
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(null);

    //fetching user details and dispatch from the context
    const {user, dispatch} = useContext(Context)
    const PF = "http://localhost:5000/images/"

    //handles update functionality
    const handleUpdate = async (e)=>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"});//displatch update start action
        const updatedUser = {
            userId:user._id,
            username,
            email,
            password,
        };

        //handles the image file
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data);//post image data
            } catch (err) {
                console.log(err)
            }
            try {
                const res = await axios.put("/users/"+ user._id, updatedUser);//update user details
                setSuccess(true);
                dispatch({type:"UPDATE_SUCCESS",payload:res.data});//dispatch update success action
            } catch (err) {
                dispatch({type:"UPDATE_FAILURE"})//dispatch update failure action
            }
        }
    };

    //handles delete functionality
    const handleDelete = async ()=>{
        try {
          await axios.delete(`/users/${user._id}`,{//deletes user data from the backend
            data:{userId:user._id},
          });
          dispatch({type:"LOGOUT"});//dispatch logout action
          window.location.replace("/login");//replaces the url
    
        } catch (err) {
          
        }
      }

    return (
        <>
        <NavBar />
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    {/* on click it deletes the accout */}
                    <span className="settingsDeleteTitle" onClick={handleDelete}>Delete Account</span>
                </div>

                <form className="settingsForm" onSubmit={handleUpdate}>
                {/* add profile image */}
                    <label>Profile Picture</label>
                    <div className="settingsProfile">
                        <img
                            src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                            alt=""
                        />
                        {/* file input */}
                        <label htmlFor="fileInput">
                            <i className="settingsProfileIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
                    </div>
                    {/* username */}
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)}/>
                    {/* email */}
                    <label>Email</label>
                    <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)}/>
                    {/* password */}
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    
                    {/* update button */}
                    <button className="settingsSubmit" type="submit"> Update </button>

                    {/* if succesful display message */}
                    {success && <span style={{color:"green",textAlign:"center",marginTop:"20px"}}>Your profile has been updated...</span>}
                    
                </form>

            </div>
            
        </div>
        <Footer />
        </>
    )
}