function toggleObjectFit(ratio){
    let vid = document.getElementsByTagName("video")[0]
    if (vid){
        let vidStyle = {
            transform:`scale(${ratio})`
        }
        Object.assign(vid.style, vidStyle)
        console.log(vid)
    } 
    else {
      vid = document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("video")[0]
      if (vid){
          let vidStyle = {
              transform:`scale(${ratio})`
          }
          Object.assign(vid.style, vidStyle)
          console.log(vid)
        }
    }
    

}

function toggleFullScreen(){
    let vid = document.getElementsByTagName("video")[0]
    if (vid){
      if (vid.innerHeight !== screen.height){
          if (vid.webkitRequestFullscreen) {
            vid.webkitRequestFullscreen();
          }else if (vid.requestFullscreen) {
            vid.requestFullscreen();
          } else if (vid.mozRequestFullScreen) {
            vid.mozRequestFullScreen();
          } else if (vid.msRequestFullscreen) { 
            vid.msRequestFullscreen();
          }
      }
    }
}

function doBoth(ratio){
  toggleFullScreen();
  toggleObjectFit(ratio);
}

// console.log("Sending Message Now");
chrome.runtime.sendMessage({message:"callBackground"}, function (response) {
  if (response.fullscreen === "1"){
    toggleFullScreen();
  }
  if (response.ratio !== "-1"){
    toggleObjectFit(response.ratio);
  }
  console.log(response);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request)
  if (request.message === "fit")
      sendResponse(toggleObjectFit(request.ratio)); // respond with the new active state
  else if (request.message === "fullscreen")
      sendResponse(toggleFullScreen()); // respond with the new active state
  else if (request.message === "both"){
      doBoth(ratio); // respond with the new active state
  }
});
