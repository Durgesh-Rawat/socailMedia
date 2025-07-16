import React, { useRef, useEffect, useState } from "react";

function AutoPlayVideo({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play video when it enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;

        if (entry.isIntersecting) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.8, // 80% visible to play
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  // Toggle play/pause on click
  const togglePlay = () => {
    const video = videoRef.current;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <video
      ref={videoRef}
      src={src}
      playsInline
      loop
      onClick={togglePlay}
      className="w-[350px] h-[550px] object-cover rounded cursor-pointer"
    />
  );
}

export default AutoPlayVideo;
