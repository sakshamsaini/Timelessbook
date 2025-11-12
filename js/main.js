document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");

  Object.keys(MEDIA_MAP).forEach((key) => {
    const media = MEDIA_MAP[key];
    const index = parseInt(key);

    let assetEl;

    if (media.type === "video") {
      // --- Create <video> asset ---
      assetEl = document.createElement("video");
      assetEl.setAttribute("id", `media-${index}`);
      assetEl.setAttribute("src", media.url);
      assetEl.setAttribute("preload", "auto");
      assetEl.setAttribute("playsinline", "true");
      assetEl.setAttribute("webkit-playsinline", "true");
      assetEl.setAttribute("crossorigin", "anonymous");
      assetEl.setAttribute("loop", "true");
      assetEl.style.display = "none";
    } else if (media.type === "audio") {
      // --- Create <audio> asset ---
      assetEl = document.createElement("audio");
      assetEl.setAttribute("id", `media-${index}`);
      assetEl.setAttribute("src", media.url);
      assetEl.setAttribute("preload", "auto");
      assetEl.setAttribute("crossorigin", "anonymous");
      assetEl.setAttribute("loop", "true");
    }

    scene.appendChild(assetEl);

    // --- Marker entity ---
    const marker = document.createElement("a-entity");
    marker.setAttribute("mindar-image-target", `targetIndex: ${index}`);

    let playButton;
    let mediaPlane;

    if (media.type === "video") {
      // --- Video plane ---
      mediaPlane = document.createElement("a-plane");
      mediaPlane.setAttribute("id", `media-plane-${index}`);
      mediaPlane.setAttribute("material", `src: #media-${index}; transparent: true; opacity: 1`);
      mediaPlane.setAttribute("width", "1");
      mediaPlane.setAttribute("height", "0.6");
      mediaPlane.setAttribute("visible", "false");
      marker.appendChild(mediaPlane);

      // --- Play button overlay ---
      playButton = document.createElement("a-image");
      playButton.setAttribute("src", "#preview-image");
      playButton.setAttribute("class", "clickable");
      playButton.setAttribute("position", "0 0 0.01");
      playButton.setAttribute("scale", "0.2 0.2 0.2");
      playButton.setAttribute("visible", "false");
      marker.appendChild(playButton);

      playButton.addEventListener("click", () => {
        if (assetEl.paused) {
          assetEl.play();
          playButton.setAttribute("visible", "false");
        }
      });
    }

    // --- Marker logic ---
    marker.addEventListener("targetFound", () => {
  if (media.type === "video") {
    mediaPlane.object3D.visible = true;
    mediaPlane.setAttribute("material", `src: #media-${index}; transparent: true; opacity: 1`);
    playButton.object3D.visible = true;
  } else if (media.type === "audio") {
    assetEl.play();
  }
});

    marker.addEventListener("targetLost", () => {
  if (media.type === "video") {
    // Pause and reset instantly
    assetEl.pause();
    assetEl.currentTime = 0;

    // Force-hide geometry immediately
    mediaPlane.object3D.visible = false;
    playButton.object3D.visible = false;

    // Clear material reference (prevents ghost frame)
    mediaPlane.removeAttribute("material");
    mediaPlane.setAttribute("material", "transparent: true; opacity: 0;");
  } else if (media.type === "audio") {
    assetEl.pause();
    assetEl.currentTime = 0;
  }
});


    scene.appendChild(marker);
  });
});
