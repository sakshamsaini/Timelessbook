document.addEventListener("DOMContentLoaded", () => {
  // Loop through MEDIA_MAP and create video + entity for each marker
  Object.keys(MEDIA_MAP).forEach((key) => {
    const media = MEDIA_MAP[key];
    const index = parseInt(key);

    // Create <video> element
    const video = document.createElement("video");
    video.setAttribute("id", "video" + index);
    video.setAttribute("src", media.url);
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "true");   // Important for autoplay
    video.setAttribute("preload", "auto");
    video.style.display = "none"; // keep hidden
    document.body.appendChild(video);

    // Create <a-entity mindar-image-target>
    const entity = document.createElement("a-entity");
    entity.setAttribute("mindar-image-target", `targetIndex: ${index}`);

    // Create <a-video> inside
    const aVideo = document.createElement("a-video");
    aVideo.setAttribute("src", `#video${index}`);
    aVideo.setAttribute("width", "1");
    aVideo.setAttribute("height", "0.75");
    aVideo.setAttribute("position", "0 0 0");
    entity.appendChild(aVideo);

    // Append to scene
    document.querySelector("a-scene").appendChild(entity);

    // Event listeners
    entity.addEventListener("targetFound", () => {
      console.log("Target found:", index);
      video.play();
    });
    entity.addEventListener("targetLost", () => {
      console.log("Target lost:", index);
      video.pause();
    });
  });
});
