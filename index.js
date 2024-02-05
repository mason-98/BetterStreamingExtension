let myRatios = {}
let myScale = {}
let myFullscreen = {}
const saveBtn = document.getElementById("save-btn")
const deleteBtn = document.getElementById("delete-btn")
const ultrawideBtn = document.getElementById("ultrawide-btn")
const loadBtn = document.getElementById("load-btn")
const rangeInput = document.getElementById("range-input-el")
const numInput = document.getElementById("num-input-el")
const testBtn = document.getElementById("test-btn")
// const fullScreenCheckBox = document.getElementById("fullScreen-chkbox")
const scaleCheckBox = document.getElementById("scale-chkbox")
chrome.storage.local.get("myRatios", function(data){
    myRatios = JSON.parse(data.myRatios);
})
// chrome.storage.local.get("myFullscreen", function(data){
//     myFullscreen =JSON.parse(data.myFullscreen);
// })
chrome.storage.local.get("myScale", function(data){
    myScale = JSON.parse(data.myScale);
})

function ultrawideBtnEvent(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let url = new URL(tabs[0].url)
        let hostname = url.hostname
        let hostSplit = hostname.split('\.')
        let siteName = hostSplit[0]
        if (siteName === "www"){
            siteName = hostSplit[1]
        }
        numInput.value = "1.33";
        rangeInput.value = "1.33";
        chrome.tabs.sendMessage(tabs[0].id, {message:"fit",ratio: numInput.value.toString()});
        console.log("Ultrawide")
    })
}

function testBtnEvent(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let url = new URL(tabs[0].url)
        let hostname = url.hostname
        let hostSplit = hostname.split('\.')
        let siteName = hostSplit[0]
        if (siteName === "www"){
            siteName = hostSplit[1]
        }
        chrome.tabs.sendMessage(tabs[0].id, {message:"fit", ratio: numInput.value.toString()});
        console.log("test")
    })
}

function saveBtnEvent(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let url = new URL(tabs[0].url)
        let hostname = url.hostname
        let hostSplit = hostname.split('\.')
        let siteName = hostSplit[0]
        if (siteName === "www"){
            siteName = hostSplit[1]
        }
        myRatios[siteName] = numInput.value
        chrome.tabs.sendMessage(tabs[0].id, {message:"fit", ratio: myRatios[siteName].toString()});
        chrome.storage.local.set({"myRatios": JSON.stringify(myRatios)}, function(){
            console.log("save")
            console.log(myRatios)
            console.log(myRatios[siteName])
        })
    })


}

function loadBtnEvent(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let url = new URL(tabs[0].url)
        let hostname = url.hostname
        let hostSplit = hostname.split('\.')
        let siteName = hostSplit[0]
        if (siteName === "www"){
            siteName = hostSplit[1]
        }
        console.log("Load")
        console.log(myRatios)
        if (siteName in myRatios){
            let ratio = myRatios[siteName]
            console.log(ratio)
            numInput.value = ratio
            rangeInput.value = ratio
            chrome.tabs.sendMessage(tabs[0].id, {message:"fit", ratio: ratio}, function(){
                console.log("Load")
                console.log(myRatios)
            });
        } else {
            alert("No ratio found for " + siteName)
        }

    })
}

function deleteBtnEvent(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let url = new URL(tabs[0].url)
        let hostname = url.hostname
        let hostSplit = hostname.split('\.')
        siteName = hostSplit[0]
        if (siteName === "www"){
            siteName = hostSplit[1]
        }
        delete myRatios[siteName]
        chrome.storage.local.set({"myRatios": JSON.stringify(myRatios)}, function(){
            console.log(myRatios)
            alert(siteName + " saved ratio deleted")
        });
    })
}

// function fullScreenCheckBoxEvent(){
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//         let url = new URL(tabs[0].url)
//         let hostname = url.hostname
//         let hostSplit = hostname.split('\.')
//         let siteName = hostSplit[0]
//         if (siteName === "www"){
//             siteName = hostSplit[1]
//         }
//         if (fullScreenCheckBox.checked){
//             myFullscreen[siteName] = 1
//         } else {
//             myFullscreen[siteName] = 0
//         }
//         chrome.storage.local.set({"myFullscreen": JSON.stringify(myFullscreen)}, function(){
//             //alert("Fullscreen Success")
//         });
//         console.log(myFullscreen)
//     })
// }

function scaleCheckBoxEvent(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let url = new URL(tabs[0].url)
        let hostname = url.hostname
        let hostSplit = hostname.split('\.')
        let siteName = hostSplit[0]
        if (siteName === "www"){
            siteName = hostSplit[1]
        }
        if (scaleCheckBox.checked){
            myScale[siteName] = 1
        } else {
            myScale[siteName] = 0
        }
        chrome.storage.local.set({"myScale": JSON.stringify(myScale)}, function(){
            //alert("Scale Success")
        });
        console.log(myScale)
    })
}

function checkLocalStorage(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let url = new URL(tabs[0].url)
        let hostname = url.hostname
        let hostSplit = hostname.split('\.')
        let siteName = hostSplit[0]
        if (siteName === "www"){
            siteName = hostSplit[1]
        }
        // if (myFullscreen[siteName] === 1){
        //     fullScreenCheckBox.checked = true; 
        //     chrome.tabs.sendMessage(tabs[0].id, {message:"fullscreen"});
        // }
        if (myScale[siteName] === 1 && siteName in myRatios){
            scaleCheckBox.checked = true; 
            let ratio = myRatios[siteName]
            numInput.value = ratio
            rangeInput.value = ratio
            chrome.tabs.sendMessage(tabs[0].id, {message:"fit", ratio: ratio});
        }
    })
}

document.addEventListener("DOMContentLoaded", function(){
    checkLocalStorage();

    testBtn.addEventListener("click", testBtnEvent);
    saveBtn.addEventListener("click", saveBtnEvent);
    loadBtn.addEventListener("click", loadBtnEvent);
    deleteBtn.addEventListener("dblclick", deleteBtnEvent);
    ultrawideBtn.addEventListener("click", ultrawideBtnEvent);
    // fullScreenCheckBox.addEventListener("change", fullScreenCheckBoxEvent);
    scaleCheckBox.addEventListener("change", scaleCheckBoxEvent);


})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(checkLocalStorage());
});

rangeInput.addEventListener("input", function(){
    numInput.value = rangeInput.value
})


numInput.addEventListener("input", function(){
    rangeInput.value = numInput.value
})
