import React, {useState, useEffect} from "react";

function Home(){

    const [posts, setPosts] = useState([]);
    
        useEffect(() => {
            const token = localStorage.getItem("token");

        fetch("https://socailmedia-sz9t.onrender.com/api/posts",{
              headers: { "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`}
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setPosts(data.posts);
            }else {
                   console.error("Unauthorized or Error:", data.message);
                 }
          });
      }, []);
    
        return(


           <div className="p-4 md:w-[500px] grid grid-cols-1 md:grid-cols-1 gap-10 mt-20">
              {posts.map((p, i) => (
                   
                   p.type === "image" && (
                        <div key={i}>
                            <img src={p.url} alt={`post-${i}`} className="w-full h-full object-cover" />
                        </div>
                        )
               ))}

            </div>

        );
}

export default Home
