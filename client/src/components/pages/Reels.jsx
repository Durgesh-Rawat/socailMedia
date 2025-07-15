import { useState, useEffect } from "react";
import AutoPlayVideo from "./AutoPlayVideo";


function Reels(){
    const [reels, setReels] = useState([]);

    useEffect(() => {

      const token = localStorage.getItem("token");

    fetch("https://socailmedia-sz9t.onrender.com/api/posts",{
                    headers: { "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`}
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReels(data.posts);
        }
      });
  }, []);

    return(
          <div className="p-4 md:w-[500px] grid grid-cols-1 md:grid-cols-1 gap-10 mt-20">
              {reels.map((p, i) => (
                   
                   p.type === "video" && (
                        <div key={i}>
                            <AutoPlayVideo src={p.url}  controls controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                              disablePictureInPicture />
                        </div>
                        )
               ))}

            </div>
    );
}

export default Reels
