import React,{useState,useEffect, useContext} from "react";
import axios from "axios";
import {useLocation, Link } from "react-router-dom";
import "./singlePost.css";
import { Context } from "../../context/Context";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const SinglePost = () => {

  //fetching the url
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [likes,setLikes] = useState([]);
  const [like,setLike] = useState(false);
  const [test,setTest] = useState('');
  const [comment,setComment]= useState([]);
  const [txtcomment,setTxtcomment]=useState([]);
  const [authorcomment,setAuthorcomment]=useState([]);
  //fetching image from local host
  const PF = "https://aqueous-coast-70292.herokuapp.com/images/"
  //fetching user from context
  const {user} = useContext(Context)

  //Declaring set and use states
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [numlikes,setNumlikes] = useState(0);


  //Fetchs a single post from the backend and sets it to the variable
  useEffect(()=>{
    const getPost = async ()=>{
      const res = await axios.get("/posts/"+path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setLikes(res.data.like);
      var tempp = res.data.like;
      setLike(tempp.includes(user?._id));
      setNumlikes(tempp.length);
      setComment(res.data.comment)
      const tempcomt = res.data.comment
      var commenting = []
      var authorcomment = []
      // const commenting = tempcomt.map((xp)=>((axios.get("/comments/"+xp)).data.test))
      // const commenting = await (await axios.get("/comments/"+tempcomt[0])).data.test;
      for (let i = 0; i < tempcomt.length; i++) {
        commenting.push(await (await axios.get("/comments/"+tempcomt[i])).data.test)
        authorcomment.push(await (await axios.get("/comments/"+tempcomt[i])).data.author)

      }
      setTxtcomment(commenting)
      setAuthorcomment(authorcomment)

    };
    getPost()
  },[path])

  const getComment = async()=>{
      if(comment.length!=0){
        const commenting = await axios.get("/comments"+comment[0]);
        setTxtcomment(commenting)
        setAuthorcomment(authorcomment)
      }
  }

  //Handles the delete functionality
  const handleDelete = async ()=>{
    try {
      await axios.delete(`/posts/${post._id}`,{
        data:{username:user.username},
      });
      window.location.replace("/");//Reloads the page

    } catch (err) {
      
    }
  }

  //Handles the update functionality
  const handleUpdate = async ()=>{
    try {
      await axios.put(`/posts/${post._id}`,{
        headers: {
          'Authorization': 'Bearer ' + user.accessToken
        },
         token: user.accessToken,username:user.username,title,desc,
      });
      window.location.reload("/");//Reloads the page

    } catch (err) {
      
    }
  }
  const Getlikes = (inp)=>{
    useEffect(()=>{
      setLikes(inp)
    },[likes])
    return likes
  }
  //handle like
  const handleLike = async ()=>{
    // if likes.includes(user._id){
    //   setLikes
    // }
    if(user){
      var newlikes = [];
    if (like){
      // const newList = list.filter((item) => item.id !== id);
      setNumlikes(numlikes-1)
      // const likesa=likes
      // console.log(likesa)
      newlikes = likes.filter((item)=> item !== user._id)
      console.log(newlikes)
      setLikes(newlikes)
      setLike(!like)
      // const x =Getlikes()
      console.log(likes)
    }
    else{
      setNumlikes(numlikes+1)
      newlikes=likes;
      newlikes.push(user?._id);
      setLikes(newlikes)
      // useEffect(()=>{
      //   setLikes(newlikes)
      // },[])
      // getLikes(newlikes)
      setLike(!like)
    }
    try{
      await axios.put(`/posts/like/${post._id}`,{
        like:likes
      });
      
    }catch(err){

    }}
  }

  //handle comment
  const handleComment = async(e)=>{
    e.preventDefault();
    const newComment={
      author: user.username,
      userid: user._id,
      postId: post._id,
      test,
    }
    try{
      const res = await axios.post('/comments/',newComment)
      setTest("")
      // setTest(res)
      const ce = comment
      ce.push(res.data._id)
      setComment(ce)
      
    }
    catch(err){
        
    }
    try{
      axios.put(`/posts/comment/${post._id}`,{
        comment
      });
    }
    catch(err){

    }
  }
  
  return (
    <div>
      <div className="singlePost">
        {/* fetching a single post and displaying in the page */}
        <div className="singlePostWrapper">
          {post.photo && (
            <img className="singleWrapperImg"
            src={PF + post.photo}
            alt=""
            
          />
          )}{
            updateMode ? <input type="text" className="singlePostTitleInput" value={title} autoFocus  onChange={(e)=>setTitle(e.target.value)}/> : (
              <h1 className="singlePostTitle">
            {post.title}
            {/* Only the user who added the blog can edit and delete the blog */}
            {post.username === user?.username && (
              <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
              </div>
            )}
 
          </h1>
            )
          }
        {/* fectching and displaying the details like author and created date */}
          <div className="singlePostInfo">
            
            <span className="singlePostAuthor">
              Author:  
              <Link to={`/?user=${post.username}`} className="link"><b> {post.username} </b></Link>
            </span>
            <span>
              {user!==null && like ? (<ThumbDownIcon className="likeButton" onClick={() => {handleLike()}} />) : 
              (<ThumbUpIcon className="likeButton" onClick={() => {handleLike()}}/>)}
                  
              {numlikes}
            </span>

            <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
          </div>
          {/* It can be updated only if it is in updated mode or it it will just show the content */}
          {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)}/> : (
            <p className="singlePostDesc">{post.desc}</p>
          ) }
          {/* onclick it handles the update funcion */}
          {updateMode && <button className="singlePostButton" onClick={handleUpdate}> Update </button>}
          <form onSubmit={handleComment} >
          <label>
            Comment:
            <input type="text" id="naming" name="name" onChange={(e)=>setTest(e.target.value)}/>
          </label>
          <input type="submit" id="sub" value="Submit" />
      </form>
      <>
              {authorcomment[0]}:{txtcomment[0]}
      </>
        </div>
      </div>
    </div>

  );
}

export default SinglePost;