let myRatios = {}
const saveBtn = document.getElementById("save-btn")
const deleteBtn = document.getElementById("delete-btn")
const deleteAllBtn = document.getElementById("delete-all-btn")
const loadBtn = document.getElementById("load-btn")
const rangeInput = document.getElementById("range-input-el")
const numInput = document.getElementById("num-input-el")
const testBtn = document.getElementById("test-btn")
const ratiosFromLocalStorage = JSON.parse(localStorage.getItem("myRatios"))


function testBtnEvent(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let url = new URL(tabs[0].url)
        let hostname = url.hostname
        let hostSplit = hostname.split('\.')
        let siteName = hostSplit[0]
        if (siteName === "www"){
            siteName = hostSplit[1]
        }
        chrome.tabs.sendMessage(tabs[0].id, {ratio: numInput.value.toString()});
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
        chrome.tabs.sendMessage(tabs[0].id, {ratio: myRatios[siteName].toString()});
        localStorage.setItem("myRatios", JSON.stringify(myRatios))
        console.log("save")
        console.log(myRatios)
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
            chrome.tabs.sendMessage(tabs[0].id, {ratio: ratio});
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
        localStorage.setItem("myRatios", JSON.stringify(myRatios))
        console.log(myRatios)
        alert(siteName + " saved ratio deleted")
    })
}

function deleteAllBtnEvent() {
    localStorage.removeItem("myRatios")
    myRatios = {}
    alert("All saved ratios deleted")
}

document.addEventListener("DOMContentLoaded", function(){
    if (ratiosFromLocalStorage){
        myRatios = ratiosFromLocalStorage
    }
    testBtn.addEventListener("click", testBtnEvent);
    saveBtn.addEventListener("click", saveBtnEvent);
    loadBtn.addEventListener("click", loadBtnEvent);
    deleteBtn.addEventListener("dblclick", deleteBtnEvent);
    deleteAllBtn.addEventListener("dblclick", deleteAllBtnEvent);
})

rangeInput.addEventListener("input", function(){
    numInput.value = rangeInput.value
})


numInput.addEventListener("input", function(){
    rangeInput.value = numInput.value
})
