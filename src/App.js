import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import SingleEvent from "./pages/singleEvent/SingleEvent"
import Add from "./pages/add/add";
import AddEvent from "./pages/addEvent/addEvent"
import Settings from "./pages/settings/Settings"
import Login from "./pages/login/Login"
import AdminLogin from "./pages/adminlogin/adminlogin"
import Register from "./pages/register/Register";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {useContext} from 'react';
import About from "./pages/about/About";
import { Context } from "./context/Context";
import Event from "./pages/event/Event";
import AdminPage from "./pages/adminpage/AdminPage";

function App() {
  // fetchinh user detials from the context
const {user} = useContext(Context)
fetch('https://aqueous-coast-70292.herokuapp.com/').then(res=>
      res.json()
    ).then(data => console.log(data))
  return (
    
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {/* routing of the pages by using the url */}
        <Route exact path="/register">{user ? <Home /> : <Register />}</Route>
        <Route exact path="/login">{user ? <Home /> : <Login />}</Route>
        <Route exact path="/Adminlogin">{user ? <Home /> : <AdminLogin />}</Route>
        <Route exact path="/add">{user ? <Add/> : <Login />}</Route>
        <Route exact path="/addEvent">{user ? ((user.username==="Sampath") ? <AddEvent/> : <AdminLogin/>) : <AdminLogin />}</Route>
        <Route exact path="/settings">{user ? <Settings/> : <Register />}</Route>
        <Route exact path="/about"><About/></Route>
        <Route exact path="/post/:id"><Single /></Route>
        <Route exact path="/event"><Event/></Route>
        <Route exact path="/event/:id"><SingleEvent /></Route>
        <Route exact path="/AdminPage">{user ? ((user.username==="Sampath") ? <AdminPage/> : <AdminLogin/>) : <AdminLogin />}</Route>

      </Switch>
    </Router>
  );
}

export default App;