// src/components/Hero.js
import React, { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { IoPlayCircle } from "react-icons/io5";
import Loading from "../common/Loading";

const Hero = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const folderRef = ref(storage, "videos"); // Replace 'videos' with your folder name
        const videoRefs = await listAll(folderRef);
        const videoURLs = await Promise.all(
          videoRefs.items.map(async (itemRef) => {
            const videoURL = await getDownloadURL(itemRef);
            return { url: videoURL, name: itemRef.name };
          })
        );
        setVideos(videoURLs);
      } catch (error) {
        console.error("Error fetching videos: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (video) => {
    navigate("/player", { state: { video } });
  };

  return (
    <div className="text-white mb-[100px]">
      <div className="p-5">
        <h1 className="text-xl font-bold">Latest videos</h1>
        <div className="mt-5 flex justify-center items-center flex-wrap gap-5">
          {loading ? (
            <Loading />
          ) : videos.length === 0 ? (
            <p>No videos available</p>
          ) : (
            videos.map((video, index) => (
              <div
                key={index}
                className="relative w-[280px] h-[200px] cursor-pointer"
                onClick={() => handleVideoClick(video)}
              >
                <div className="border bg-gray-400 w-full h-full rounded-md flex items-center justify-center">
                  <IoPlayCircle className="text-white text-6xl absolute" />
                  <h1 className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                    {video.name}
                  </h1>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
