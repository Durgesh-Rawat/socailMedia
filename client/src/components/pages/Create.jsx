import React, {useState} from "react";

function Create(){
   const [media, setMedia] = useState(null);
   const [previewURL,setPreviewURL] = useState("");
   const [uploading, setUploading] = useState(false);
   const [mediaType, setMediaType] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
     if (!file) return;
     
    setMedia(file);
    setPreviewURL(URL.createObjectURL(file));
 
      if (file.type.startsWith("image")) {
      setMediaType("image");
    } else if (file.type.startsWith("video")) {
      setMediaType("video");
    } else {
      alert("Only image or video files are allowed.");
      setMedia(null);
      setPreviewURL("");
      setMediaType("");
    }
  };



  const handleUpload = async() => {
     if(!media) return alert("No media Selected");
     setUploading(true);

     const formData = new FormData();
     formData.append("file",media);
     formData.append("upload_preset", "unsigned_reels");

    
      try {
    
     const token = localStorage.getItem("token");

      const uploadUrl =
        mediaType === "video"
          ? "https://api.cloudinary.com/v1_1/df2bhysjj/video/upload"
          : "https://api.cloudinary.com/v1_1/df2bhysjj/image/upload";

      const res = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Cloudinary response:", data);

      await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
         },
        body: JSON.stringify({
          url: data.secure_url,
          type: mediaType,
        }),
      });
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };



  


    return(
   
        <div className="p-4 max-w-md max-h-50 mt-20 mx-auto bg-[hsla(216,42%,95%,1)] shadow rounded">
            <h2 className="text-xl font-bold mb-4">Upload Post</h2>
            <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="mb-4 border-2 mr-2" />
            {previewURL && mediaType=="image" && (
                <img src={previewURL} alt="Preview" className="w-full mb-4 rounded" />
            )}

            {previewURL && mediaType=="video" && (
                <video src={previewURL} alt="Preview" controls   controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                 disablePictureInPicture className="w-full mb-4 rounded" />
            )}

           <button onClick={handleUpload} disabled={uploading} className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${
                        uploading ? "opacity-50 cursor-not-allowed" : ""}`}>
                      {uploading ? "Uploading..." : "Post"}
           </button>
        </div>



    );
}

export default Create