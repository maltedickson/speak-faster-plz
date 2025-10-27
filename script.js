step = 0.25;

const legendId = "speed-legend";

document.addEventListener("keypress", (e) => {
  const video = document.querySelector("video");
  if (!video) {
    return;
  }

  const old_legend = document.getElementById(legendId);
  if (old_legend) {
    old_legend.remove();
  }

  let newPlaybackRate = video.playbackRate;

  switch (e.code) {
    case "KeyS":
      newPlaybackRate -= step;
      break;
    case "KeyD":
      newPlaybackRate += step;
      break;
  }
  newPlaybackRate = Math.max(0, newPlaybackRate);
  video.playbackRate = newPlaybackRate;

  const legend = document.createElement("div");
  legend.setAttribute("id", legendId);
  legend.innerText = `${newPlaybackRate.toFixed(2)}`;

  const videoContainer = video.parentElement;
  if (videoContainer.style.position != "absolute") {
    videoContainer.style.position = "relative";
  }
  legend.style.position = "absolute";
  legend.style.top = "0px";
  legend.style.left = "0px";
  legend.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  legend.style.color = "white";
  legend.style.padding = "5px";
  legend.style.borderRadius = "5px";
  legend.style.zIndex = "1000";

  videoContainer.appendChild(legend);
});
