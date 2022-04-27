import React from 'react'
import Post from '../post/Post'
import "./posts.css"
export default function Posts({posts}) {
    return (
        //Maps all blog posts and send it to the post page which displays one by one
        <div className="posts">
            {posts.map((p)=>(
                 <Post post={p}/>
            ))}
        </div>
    ) 
}
