const iframe = document.getElementById('iframe')

console.log(iframe)

window.addEventListener("message", messageHandler, false)

// обработчик сообщения, получаемого от другого домена при отправке наших методов для записи/чтения/удаления
// event.callback - колбэк функция, передаваемая нам от другого домена
function messageHandler(event) {
    const { action, value, callback } = event.data
    if (action == 'returnData'){
        console.log(value)
        let newCallback = eval('(' + callback + ')')
        newCallback = eval('(' + newCallback + ')')
        newCallback()
    }
}

//метод для записи данных
function setOtherLocalStorageItem(key, value){
    iframe.contentWindow.postMessage({
        action: 'save',
        key,
        value
    }, '*')
}

//метод для чтения данных
function getOtherLocalStorageItem(key){
    iframe.contentWindow.postMessage({
        action: 'get',
        key
    }, '*')
}

//метод для удаления данных
function removeOtherLocalStorageItem(key){
    iframe.contentWindow.postMessage({
        action: 'remove',
        key
    }, '*')
}