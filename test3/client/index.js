const url = 'http://localhost:4000'

const firstRequest = ()=> { 
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({data: 'first request'})
    }).then(response=>{
        return response.text()
    }).then(data=>{
        console.log(`first response is: ${data}`)
    })
}

const secondRequest = ()=> { 
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({data: 'second request'})
    }).then(response=>{
        return response.text()
    }).then(data=>{
        console.log(`second response is: ${data}`)
    })
}

Promise.all([firstRequest(), secondRequest()])
.then( result => {
    console.log('оба ответа получены');
})