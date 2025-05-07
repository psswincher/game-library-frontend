import { useState } from "react";
import styles from "./GameImagePlay.module.css";

function GameImagePlay({ imageUrl, howToPlayUrl }) {
  const [showVideo, setShowVideo] = useState(false);

  const handlePlayClick = () => {
    setShowVideo(true);
  };

  const extractYouTubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const containerClass = `${styles.imageContainer} ${showVideo ? styles.expanded : ""}`;

  return (
    <div className={containerClass}>
      {!showVideo && (
        <>
          <img src={imageUrl} alt="Game cover" className={styles.image} />
          {howToPlayUrl && (
            <button className={styles.playButton} onClick={handlePlayClick}>
              ▶ How to Play
            </button>
          )}
        </>
      )}
      {showVideo && howToPlayUrl && (
        <div className={styles.videoContainer}>
          <iframe
            src={`https://www.youtube.com/embed/${extractYouTubeId(howToPlayUrl)}?autoplay=1`}
            title="How to Play"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default GameImagePlay;
