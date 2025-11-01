const videos = Array.from(document.getElementsByTagName("video"));

let currentSrc = "";

videos.forEach((video) => {
  video.addEventListener("ratechange", (e) => {
    if (video.currentSrc !== currentSrc) {
      return;
    }
    displayController(video);
  });
  video.addEventListener("play", () => {
    currentSrc = video.currentSrc;
    displayController(video);
  });
});

window.addEventListener("keypress", (e) => {
  console.log(currentSrc);
  const video = videos.find((video) => video.currentSrc === currentSrc);
  if (!video) {
    return;
  }
  switch (e.code) {
    case "KeyD":
      video.playbackRate += 0.25;
      break;
    case "KeyS":
      video.playbackRate -= 0.25;
      break;
    case "KeyX":
      video.currentTime += 5;
      break;
    case "KeyZ":
      video.currentTime -= 5;
      break;
  }
});

function displayController(video) {
  const controllerId = "speak-faster-plz-controller";
  const old_controller = document.getElementById(controllerId);
  if (old_controller) {
    old_controller.remove();
  }
  const controller = document.createElement("div");
  controller.setAttribute("id", controllerId);
  controller.setAttribute("class", "speak-faster-plz-controller");
  controller.innerText = `${video.playbackRate.toFixed(2)}`;

  const videoContainer = video.parentElement;
  if (videoContainer.style.position != "absolute") {
    videoContainer.style.position = "relative";
  }

  videoContainer.appendChild(controller);
}
