import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Player,
  BigPlayButton,
  ControlBar,
  PlayToggle,
  VolumeMenuButton,
  FullscreenToggle,
} from "video-react";
import "video-react/dist/video-react.css"; // import css for video-react
import Loading from "../common/Loading";

const PlayerComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { video } = location.state;

  const [loading, setLoading] = useState(true);

  const handleCanPlay = () => {
    setLoading(false);
  };

  return (
    <div className="text-white p-5">
      <button
        className="flex items-center text-lg mb-4"
        onClick={() => navigate(-1)}
      >
        <IoArrowBack className="mr-2" />
        Back
      </button>
      <div className="w-full flex justify-center flex-col items-center max-w-4xl mx-auto">
        {loading && <Loading />}
        <Player
          src={video.url}
          autoPlay
          fluid
          onCanPlay={handleCanPlay}
          className={`w-full ${loading ? "hidden" : ""}`}
        >
          <BigPlayButton position="center" />
          <ControlBar autoHide={true} />
        </Player>
        <h1 className="text-center mt-4 text-2xl">{video.name}</h1>
      </div>
    </div>
  );
};

export default PlayerComponent;
