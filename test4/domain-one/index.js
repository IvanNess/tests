const iframe = document.getElementById('iframe')

console.log(iframe)

window.addEventListener("message", messageHandler, false)

function messageHandler(event) {
    const { action, value, callback } = event.data
    if (action == 'returnData'){
        console.log(value)
        let newCallback = eval('(' + callback + ')')
        newCallback = eval('(' + newCallback + ')')
        newCallback()
    }
}

function setOtherLocalStorageItem(key, value){
    iframe.contentWindow.postMessage({
        action: 'save',
        key,
        value
    }, '*')
}

function getOtherLocalStorageItem(key){
    iframe.contentWindow.postMessage({
        action: 'get',
        key
    }, '*')
}

function removeOtherLocalStorageItem(key){
    iframe.contentWindow.postMessage({
        action: 'remove',
        key
    }, '*')
}