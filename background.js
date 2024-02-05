let myRatios = {}
let myScale = {}
// let myFullscreen = {}
function checkLocalStorage(tab){
    let url = new URL(tab.url)
    let hostname = url.hostname
    let hostSplit = hostname.split('\.')
    let siteName = hostSplit[0]
    if (siteName === "www"){
        siteName = hostSplit[1]
    }
    setTimeout(function() {
        // function code goes here
        // if (myFullscreen[siteName] === 1 && myScale[siteName] === 1 && siteName in myRatios){
        //     let ratio = myRatios[siteName]
        //     console.log("both")
        //     // chrome.tabs.query({active: true}, function(tab) {
        //     //     // chrome.debugger.attach({ tabId: tab.id }, "1.0");
        //     //     // chrome.debugger.sendCommand({ tabId: tab.id }, 'Input.dispatchKeyEvent', { type: 'keyDown', windowsVirtualKeyCode:13, nativeVirtualKeyCode : 13, macCharCode: 13  });
        //     //     // chrome.debugger.sendCommand({ tabId: tab.id }, 'Input.dispatchKeyEvent', { type: 'keyUp', windowsVirtualKeyCode:13, nativeVirtualKeyCode : 13, macCharCode: 13, ratio: ratio  });
        //     //     // chrome.debugger.detach({ tabId: tab.id });
        //     // });
        //     chrome.tabs.sendMessage(tab.id, {message:"both", ratio: ratio});
        // }
        // else if (myFullscreen[siteName] === 1){
        //     console.log(myFullscreen)
        //     setTimeout(function() {
        //         chrome.tabs.sendMessage(tab.id, {message:"fullscreen"});
        //     }, 1500);
        // }
        // else
        if (myScale[siteName] === 1 && siteName in myRatios){
            console.log(myScale)
            console.log(myRatios)
            let ratio = myRatios[siteName]
            setTimeout(function() {
                chrome.tabs.sendMessage(tab.id, {message:"fit", ratio: ratio});
            }, 1500);
        }
    }, 6000);
}

// adds a listener to tab change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // check for a URL in the changeInfo parameter (url is only added when it is changed)
    if (changeInfo.url) {
        chrome.storage.local.get("myRatios", function(data){
            myRatios = JSON.parse(data.myRatios);
            // chrome.storage.local.get("myFullscreen", function(data){
            //     myFullscreen =JSON.parse(data.myFullscreen);
                chrome.storage.local.get("myScale", function(data){
                    myScale = JSON.parse(data.myScale);
                    checkLocalStorage(tab);
                })
            // })
        })
    }
});
