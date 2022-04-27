import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer"
import axios from "axios";



export default function Single() {
  return (
    <>
    <NavBar />
    <div className="single">
      {/* call single post page */}
      <SinglePost />
      
    </div>
    <Footer />
    </>
  );
}
