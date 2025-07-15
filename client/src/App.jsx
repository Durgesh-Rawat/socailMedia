import Nav from "./components/pages/Nav";
import {BrowserRouter,Routes,Route, useLocation} from 'react-router-dom';
import Search from "./components/pages/Search";
import Reels from "./components/pages/Reels";
import Profile from "./components/pages/Profile";
import Notifications from "./components/pages/Notifications";
import Messages from "./components/pages/Messages";
import Home from "./components/pages/Home";
import Explore from "./components/pages/Explore";
import Create from "./components/pages/Create";
import Login from "./components/loginSignup/Logins";
import Signup from "./components/loginSignup/Signup";
import './index.css';
import Logins from "./components/loginSignup/Logins";


function App() {

  const location = useLocation();
  const hideNavRoutes = ['/login','/signup'];
  const shouldHideNav = hideNavRoutes.includes(location.pathname);


  return (
    
      <div className="flex min-h-screen">
       { !shouldHideNav && <Nav/>}
        <div className="flex md:ml-150 p-4 pb-20"> 
    
       <Routes>
         <Route path="/Home" element={<Home />}></Route>
         <Route path="/Create" element={<Create />}></Route>
         <Route path="/Explore" element={<Explore />}></Route>
         <Route path="/Messages" element={<Messages />}></Route>
         <Route path="/Notifications" element={<Notifications />}></Route>
         <Route path="/Profile" element={<Profile />}></Route>
         <Route path="/Search" element={<Search />}></Route>
         <Route path="/Reels" element={<Reels />}></Route>
         <Route path="/login" element={<Logins />}></Route>
         <Route path="/signup" element={<Signup />}></Route>
       </Routes>
        
        </div>

    </div>
  
  )
}

export default App
