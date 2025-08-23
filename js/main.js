document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");

  mediaMap.forEach((media, index) => {
    // Create video element
    const video = document.createElement("video");
    video.setAttribute("id", "video" + index);
    video.setAttribute("src", media.src);
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "false"); // unmute if you want sound
    video.setAttribute("preload", "auto");
    video.setAttribute("crossorigin", "anonymous");
    video.style.display = "none";
    document.body.appendChild(video);

    // Create AR marker
    const marker = document.createElement("a-entity");
    marker.setAttribute("mindar-image-target", "targetIndex: " + index);

    // Video plane
    const plane = document.createElement("a-video");
    plane.setAttribute("src", "#video" + index);
    plane.setAttribute("width", "1");
    plane.setAttribute("height", "0.6");
    plane.setAttribute("position", "0 0 0");
    marker.appendChild(plane);

    // Add Play Button (HTML overlay)
    const playBtn = document.createElement("button");
    playBtn.innerText = "▶ Play Video " + (index + 1);
    playBtn.style.position = "absolute";
    playBtn.style.top = (50 + index * 40) + "px"; // stack buttons
    playBtn.style.left = "20px";
    playBtn.style.padding = "8px 12px";
    playBtn.style.zIndex = "9999";
    document.body.appendChild(playBtn);

    // On button click → play video
    playBtn.addEventListener("click", () => {
      video.play().catch(err => console.error("Play failed:", err));
    });

    // Add marker to scene
    scene.appendChild(marker);
  });
});
