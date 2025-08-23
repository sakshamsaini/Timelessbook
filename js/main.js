// main.js

document.addEventListener("DOMContentLoaded", () => {
  const assets = document.querySelector("#assets");
  const anchorsContainer = document.querySelector("#anchors");
  const overlay = document.querySelector("#overlay");
  const startButton = document.querySelector("#startButton");

  // Preload media elements
  Object.entries(MEDIA_MAP).forEach(([targetIndex, data]) => {
    if (data.type === "video") {
      const vid = document.createElement("video");
      vid.setAttribute("id", `video-${targetIndex}`);
      vid.setAttribute("src", data.url);
      vid.setAttribute("loop", "");
      vid.setAttribute("preload", "auto");
      vid.setAttribute("playsinline", "");
      vid.setAttribute("webkit-playsinline", "");
      vid.muted = true; // autoplay allowed
      assets.appendChild(vid);

      // Create anchor entity
      const anchor = document.createElement("a-entity");
      anchor.setAttribute("mindar-image-target", `targetIndex: ${targetIndex}`);
      const aVideo = document.createElement("a-video");
      aVideo.setAttribute("src", `#video-${targetIndex}`);
      aVideo.setAttribute("width", "1");
      aVideo.setAttribute("height", "0.6");
      aVideo.setAttribute("position", "0 0 0");
      anchor.appendChild(aVideo);
      anchorsContainer.appendChild(anchor);

      // Event listeners
      anchor.addEventListener("targetFound", () => {
        vid.play();
      });
      anchor.addEventListener("targetLost", () => {
        vid.pause();
      });

    } else if (data.type === "audio") {
      const aud = document.createElement("audio");
      aud.setAttribute("id", `audio-${targetIndex}`);
      aud.setAttribute("src", data.url);
      aud.setAttribute("preload", "auto");
      assets.appendChild(aud);

      const anchor = document.createElement("a-entity");
      anchor.setAttribute("mindar-image-target", `targetIndex: ${targetIndex}`);
      anchorsContainer.appendChild(anchor);

      anchor.addEventListener("targetFound", () => {
        aud.play();
      });
      anchor.addEventListener("targetLost", () => {
        aud.pause();
        aud.currentTime = 0;
      });
    }
  });

  // Unlock autoplay on first tap
  startButton.addEventListener("click", () => {
    overlay.style.display = "none";

    // Unmute all videos after user gesture
    Object.entries(MEDIA_MAP).forEach(([i, data]) => {
      if (data.type === "video") {
        const vid = document.getElementById(`video-${i}`);
        vid.muted = false;
      }
    });
  });
});
