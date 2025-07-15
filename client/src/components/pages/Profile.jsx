import LogoutButton from "./LogoutButton";
import userpng from '../../assets/user.png';
import React, {useEffect, useState} from "react";


function Profile(){

    const [user, setUser] = useState(null);

   useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("Token:", token); // ✅ Check if token is printed

  fetch("https://socailmedia-sz9t.onrender.com/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setUser(data);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
    });
}, []);


     if(!user) return <div>....Loading</div>;

    return(
    <div className="flex gap-50 mt-10 justify-center">
        <div>
            <img src={userpng } className="w-15 h-15 mb-5"/>
             <p><strong>User Name:</strong> {user.email}</p>
        </div>
        <LogoutButton />
    </div>
    );
}

export default Profile
