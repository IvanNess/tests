window.addEventListener("message", messageHandler, false)

function messageHandler(event) {

const { action, key, value } = event.data

function callback(){
    console.log('callback')
}

const callbackString = JSON.stringify(callback, function(key, val) {
    if (typeof val === 'function') {
      return val + ''
    }
    return val
})

switch(action){
    case 'save':
        window.localStorage.setItem(key, JSON.stringify(value))
        event.source.postMessage({
            action: 'returnData',
            value: 'written',
            callback: callbackString
        }, '*') 
        break
    case 'get':   
        event.source.postMessage({
            action: 'returnData',
            value: JSON.parse(window.localStorage.getItem(key)),
            callback: callbackString
        }, '*') 
        break
    case 'remove':
        window.localStorage.removeItem(key)
        event.source.postMessage({
            action: 'returnData',
            value: 'removed',
            callback: callbackString
        }, '*') 
        break
}}