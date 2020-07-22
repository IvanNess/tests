//const search = 'http://любой_домен/filter?size=M&color=1&color=2&manufacturer=aaa&manufacturer=ddd '

const search = document.location.pathname==='/filter'? document.location.search: ''

const regexpSize = /[\?&]size=([SML]){1}(?=&|$)/g

const regexpColor = /[\?&]color=([12345]){1}(?=&|$)/g

const regexpManufacturer = /[\?&]manufacturer=(aaa|ddd|b&c|eee){1}(?=&|$)/g

let sizeMatchAll = search.matchAll(regexpSize)
sizeMatchAll = Array.from(sizeMatchAll)

const sizeElements = Array.from(document.getElementsByName('size'))

let sizeValue
if(sizeMatchAll.length>=1){
    sizeValue = sizeMatchAll[0][1]
    const sizeElement = sizeElements.find(element=>element.value===sizeValue)
    sizeElement.checked = true
}

const size = document.getElementById('size')
size.addEventListener("click", e=>{
    if(e.target.value===undefined)
        return
    sizeValue = e.target.value
    console.log(createString(sizeValue, colorValues, manufacturerValues))
})

let colorMatchAll = search.matchAll(regexpColor)
colorMatchAll = Array.from(colorMatchAll)
let colorValues = colorMatchAll.map(value=>value[1])

const colorElements = Array.from(document.getElementsByClassName('color'))
colorElements.forEach(element=>{
    if(colorValues.includes(element.value)){
        element.checked = true
    }
})

const color = document.getElementById('color')
color.addEventListener("click", (e)=>{
    if(e.target.value===undefined)
        return
    if(!colorValues.includes(e.target.value)){
        colorValues.push(e.target.value)
    } else{
        colorValues = deleteFromArr(colorValues, e.target.value)
    }
    console.log(createString(sizeValue, colorValues, manufacturerValues))
})


let manufacturerMatchAll = search.matchAll(regexpManufacturer)
manufacturerMatchAll = Array.from(manufacturerMatchAll)

const select = document.getElementById('manufacturer')
const manufacturerElements = Array.from(select.options)

let manufacturerValues = manufacturerMatchAll.map(value=>value[1])
manufacturerElements.forEach((element, index)=>{
    if(manufacturerValues.includes(element.value)){
        select.options[index].selected = true
    }
})

const manufacturer = document.getElementById('manufacturerDiv')
manufacturer.addEventListener("click", (e)=>{
    if(e.target.value===undefined)
        return
    manufacturerValues = []
    manufacturerElements.forEach((element, index)=>{
        if(element.selected){
            manufacturerValues = [...manufacturerValues, select.options[index].value]
        }
    })
    console.log(createString(sizeValue, colorValues, manufacturerValues))
})

const deleteFromArr = (arr, element)=>{
    const idx = arr.findIndex(arrElement=>arrElement===element)
    return [
        ...arr.slice(0, idx),
        ...arr.slice(idx+1)
    ]
}

const createString = (sizeValue, colorValues, manufacturerValues)=>{
    newSizeValue= sizeValue? `size=${sizeValue}&`: ''
    const colorValue = colorValues.reduce((res, value, idx)=>{
        return `${res}color=${value}&`
    }, '')
    const manufacturerValue = manufacturerValues.reduce((res, value, idx)=>{
        return `${res}manufacturer=${value}&`
    }, '')
    let all = `${newSizeValue}${colorValue}${manufacturerValue}`
    all = all[all.length-1]==='&'? all.slice(0, -1): all
    return `${document.location.origin}/filter?${all}`
}