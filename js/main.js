document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");

  MEDIA_MAP.forEach((media, index) => {
    // Create hidden <video> element
    const video = document.createElement("video");
    video.setAttribute("id", "video" + index);
    video.setAttribute("src", media.src);
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("preload", "auto");
    video.setAttribute("crossorigin", "anonymous");
    video.style.display = "none";
    document.body.appendChild(video);

    // Marker
    const marker = document.createElement("a-entity");
    marker.setAttribute("mindar-image-target", "targetIndex: " + index);

    // Video plane
    const plane = document.createElement("a-video");
    plane.setAttribute("id", "plane" + index);
    plane.setAttribute("src", "#video" + index);
    plane.setAttribute("width", "1");
    plane.setAttribute("height", "0.6");
    plane.setAttribute("position", "0 0 0");
    marker.appendChild(plane);

    // Play button image (overlayed on video)
    const playButton = document.createElement("a-image");
    playButton.setAttribute("src", "#preview-image"); // play.png from assets
    playButton.setAttribute("position", "0 0 0.01"); // slightly above video
    playButton.setAttribute("width", "0.2");
    playButton.setAttribute("height", "0.2");
    playButton.setAttribute("class", "clickable");
    marker.appendChild(playButton);

    // Handle Play click
    playButton.addEventListener("click", () => {
      video.play().then(() => {
        playButton.setAttribute("visible", "false"); // hide play button
      }).catch(err => console.error("Play failed:", err));
    });

    // Add marker to scene
    scene.appendChild(marker);
  });
});
