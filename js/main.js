document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");

  // Loop through MEDIA_MAP
  Object.keys(MEDIA_MAP).forEach((key) => {
    const media = MEDIA_MAP[key];
    const index = parseInt(key);

    // --- Create <video> asset ---
    const video = document.createElement("video");
    video.setAttribute("id", `video-${index}`);
    video.setAttribute("src", media.url);
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
    videoPlane.setAttribute("visible", "false"); // hidden by default
    marker.appendChild(videoPlane);

    // --- Create play button overlay ---
    const playButton = document.createElement("a-image");
    playButton.setAttribute("src", "#preview-image");
    playButton.setAttribute("class", "clickable");
    playButton.setAttribute("position", "0 0 0.01"); // slightly above plane
    playButton.setAttribute("scale", "0.2 0.2 0.2");
    playButton.setAttribute("visible", "false"); // hidden until marker is found
    marker.appendChild(playButton);

    // --- Play button logic ---
    playButton.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        playButton.setAttribute("visible", "false"); // hide play button when playing
      }
    });

    // --- Marker events ---
    marker.addEventListener("targetFound", () => {
      videoPlane.setAttribute("visible", "true");
      playButton.setAttribute("visible", "true"); // show play button
    });

    marker.addEventListener("targetLost", () => {
      video.pause();
      video.currentTime = 0; // reset video
      videoPlane.setAttribute("visible", "false");
      playButton.setAttribute("visible", "false");
    });

    scene.appendChild(marker);
  });
});
