document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");

  // Loop through MEDIA_MAP
  Object.keys(MEDIA_MAP).forEach((key) => {
    const media = MEDIA_MAP[key];
    const index = parseInt(key);

    // --- Create <video> asset ---
    const video = document.createElement("video");
    video.setAttribute("id", `video-${index}`);
    video.setAttribute("src", media.src);
    video.setAttribute("preload", "auto");
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("crossorigin", "anonymous"); // fix CORS issue
    video.setAttribute("loop", "true");
    video.style.display = "none"; // keep hidden
    scene.appendChild(video);

    // --- Create marker entity ---
    const marker = document.createElement("a-entity");
    marker.setAttribute("mindar-image-target", `targetIndex: ${index}`);

    // --- Create video plane ---
    const videoPlane = document.createElement("a-plane");
    videoPlane.setAttribute("id", `video-plane-${index}`);
    videoPlane.setAttribute("material", `src: #video-${index}; transparent: true; opacity: 1`);
    videoPlane.setAttribute("width", "1");
    videoPlane.setAttribute("height", "0.6");
    videoPlane.setAttribute("position", "0 0 0");
    marker.appendChild(videoPlane);

    // --- Create play button overlay ---
    const playButton = document.createElement("a-image");
    playButton.setAttribute("src", "#preview-image");
    playButton.setAttribute("class", "clickable");
    playButton.setAttribute("position", "0 0 0.01"); // slightly above plane
    playButton.setAttribute("scale", "0.2 0.2 0.2");
    marker.appendChild(playButton);

    // --- Play button logic ---
    playButton.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        playButton.setAttribute("visible", "false"); // hide play button when playing
      }
    });

    scene.appendChild(marker);
  });
});
