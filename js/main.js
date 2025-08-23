// js/main.js
window.addEventListener("DOMContentLoaded", () => {
  const sceneEl = document.querySelector("a-scene");

  // Start AR on button click (policy-friendly)
  document.querySelector("#startButton").addEventListener("click", async () => {
    await sceneEl.systems["mindar-image-system"].start();
    console.log("✅ AR started");
  });

  // Shared <video> asset
  const videoEl = document.querySelector("#dynamicVideoTex");
  const videoPlane = document.querySelector("#videoPlane");

  // Register target listeners for all 60
  for (let i = 0; i < 60; i++) {
    const anchor = document.querySelector(`#target-${i}`);
    if (!anchor) continue;

    anchor.addEventListener("targetFound", () => {
      console.log(`🎯 Target ${i} found`);
      const mediaUrl = MEDIA_MAP[i];

      if (!mediaUrl) return;

      if (mediaUrl.endsWith(".mp3")) {
        // Play audio
        const audio = new Audio(mediaUrl);
        audio.play().catch(err => console.warn("Audio play blocked:", err));
      } else {
        // Video
        videoEl.src = mediaUrl;
        videoEl.load();
        videoEl.play().catch(err => console.warn("Video play blocked:", err));
        anchor.appendChild(videoPlane);
      }
    });

    anchor.addEventListener("targetLost", () => {
      console.log(`❌ Target ${i} lost`);
      videoEl.pause();
      if (videoPlane.parentNode === anchor) {
        anchor.removeChild(videoPlane);
      }
    });
  }
});
