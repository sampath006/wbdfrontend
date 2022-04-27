import SingleEvent from "../../components/singleEvent/SingleEvent";
import "./singleEvent.css";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer"

export default function SingleEve() {
  return (
    <>
    <NavBar />
    <div className="single">
      {/* calls single event page */}
      <SingleEvent />
    </div>
    <Footer />
    </>
  );
}
