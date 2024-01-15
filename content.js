let isActive = false;
function toggleObjectFit(ratio){
    let vid = document.getElementsByTagName("video")[0]
    if (vid){
        let vidStyle = {
            transform:`scale(${ratio})`
        }
        Object.assign(vid.style, vidStyle)
        console.log(vid)
    }
    

}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      sendResponse(toggleObjectFit(request.ratio)); // respond with the new active state
});