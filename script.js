let currentSrc = "";

let videos = new Set();

function handleVideoElement(video) {
  const already_added = videos.has(video);
  if (already_added) {
    return;
  }

  videos.add(video);
  console.log(videos);
  video.addEventListener("ratechange", () => {
    if (video.currentSrc === currentSrc) {
      displayController(video);
    }
  });
  video.addEventListener("play", () => {
    currentSrc = video.currentSrc;
    displayController(video);
  });
}

Array.from(document.getElementsByTagName("video")).forEach(handleVideoElement);

function observeDOMChanges() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === "VIDEO") {
          handleVideoElement(node);
        }
        if (node.querySelectorAll) {
          node.querySelectorAll("video").forEach(handleVideoElement);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

observeDOMChanges();

window.addEventListener("keypress", (e) => {
  const video = videos.values().find((video) => video.currentSrc === currentSrc);
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
