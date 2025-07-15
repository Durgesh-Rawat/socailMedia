import { Link } from "react-router-dom"
import homeimg from '../../assets/home.png';
import profileimg from '../../assets/account.png';
import createimg from  '../../assets/add.png';
import exploreimg from '../../assets/loupe.png';
import messageimg from '../../assets/messenger.png';
import notificationimg from '../../assets/notification.png';
import reelimg from '../../assets/reel.png';
import searchimg from '../../assets/search.png';
import '../../index.css';
import { useNavigate } from "react-router-dom";
import React, {useEffect} from "react";

function Nav(){

    const navigate = useNavigate();
   
    useEffect(() => {
      const token = localStorage.getItem('token');
      if(!token){
        navigate('/login'); }
   }, []); // ✅ safest and recommended

      

   

   return(    

   <div className="max-w-screen  max-h-[600px] fixed flex gap-6 justify-center bottom-5 m-5 pl-6 md:flex-col flex-row md:items-start md:m-12 md:gap-10 md:fixed ">
    <h1 className="font-bold text-2xl md:text-4xl hidden md:block">Instagram</h1>
    <Link to={'/Home'} className="flex items-center max-w-20 max-h-22 text-sm md:text-xl font-bold gap-1 md:gap-2"><img src={homeimg} alt="home" className="w-6 h-6 md:w-10 md:h-8" /><span className="hidden md:inline">Home</span></Link>
    <Link to={'/Search'} className="flex items-center text-sm md:text-xl font-bold gap-1 md:gap-2"><img src={searchimg} className="w-6 h-6 md:w-10 md:h-8" /><span className="hidden md:inline">Search</span></Link>
    <Link to={'/Explore'} className="flex items-center text-sm md:text-xl font-bold gap-1 md:gap-2"><img src={exploreimg} className="w-6 h-6 md:w-10 md:h-8" /><span className="hidden md:inline">Explore</span></Link>
    <Link to={'/Reels'} className="flex items-center text-sm md:text-xl font-bold gap-1 md:gap-2"><img src={reelimg} className="w-6 h-6 md:w-10 md:h-8" /><span className="hidden md:inline">Reels</span></Link>
    <Link to={'/Messages'} className="flex items-center text-sm md:text-xl font-bold gap-1 md:gap-2"><img src={messageimg} className="w-6 h-6 md:w-10 md:h-8" /><span className="hidden md:inline">messages</span></Link>
    <Link to={'/Notifications'} className="flex items-center text-sm md:text-xl font-bold gap-1 md:gap-2"><img src={notificationimg} className="w-6 h-6 md:w-10 md:h-8" /><span className="hidden md:inline">Notifications</span></Link>
    <Link to={'/Create'} className="flex items-center text-sm md:text-xl font-bold gap-1 md:gap-2"><img src={createimg} className="w-6 h-6 md:w-10 md:h-8" /><span className="hidden md:inline">Create</span></Link>
    <Link to={'/Profile'} className="flex items-center text-sm md:text-xl font-bold gap-1 md:gap-2"><img src={profileimg} className="w-6 h-6 md:w-10 md:h-8" /><span className="hidden md:inline">Profile</span></Link>
   </div>
 
   );
}

export default Nav