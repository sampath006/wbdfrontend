import React from 'react'
import './about.css'
import img3 from "../../assets/img-3.png"
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer"
export default function About() {
    return (
        <>
        <NavBar />
        <div className='about-content'>
            {/* about us heading */}
            <h1 className="about-heading">About us</h1>

            <hr class="style-hr" />
            <span>
                {/* quote in the about page */}
                <div className="about-quote"><q>Blogging is not rocket science. It's about being yourself and   putting what you have into it.</q></div>
                <div className="contain">
                    <div className="text-block-left">
                        {/* content in the about page */}
                        <h2 >Blogs page Project</h2>
                        <p>Blogging one's thoughts, experiences and exhibiting topics helps others to explore a vast knowledge from bloggers . Here  Bloggers can blog their words and share info about various events. <br />
                            We are team of 5 members. We created this page to share their experience in the form
                            of a blogs.
                            <br />Here you can start blogging and share your experience in word format with
                            everyone. Our team details are:
                        </p>
                        <ul className='names'>
                            {/* our project member names */}
                            <li>M Sampath</li>
                            <li>Deepak</li>
                            <li>Aditya Medarametla</li>
                            <li>Bodhi Aditya</li>
                            <li>Hemanth sai</li>
                        </ul>
                    </div>
                    <div className='about-img'>
                        <img src={img3} width={500} height={500}></img>
                    </div>
                </div>
            </span>
        </div>
        <Footer />
        </>
    )
}