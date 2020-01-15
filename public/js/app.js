//import { response } from "express"

//import { response } from "express"

console.log('client side javascript file')
// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{

//         console.log(data)



//     })

// })

fetch('http://localhost:3000/weather?address=boston').then((response)=>{

response.json().then((data)=>{

    if(data.error){
        console.log('there is some error')
    }
    else{

        console.log(data.forecast)
        console.log(data.location)
    }
})

})

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageSecond=document.querySelector('#message-2')



//messageOne.textContent='boston'
messageOne.textContent='Loading.....'
messageSecond.textContent=''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
console.log(search.value)

fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{

response.json().then((data)=>{

    if(data.error){
        console.log('there is some error')
    }
    else{
        messageOne.textContent=data.forecast.temperature
        messageSecond.textContent=data.location
        console.log(data.forecast)
        console.log(data.location)
    }
})

})



})

