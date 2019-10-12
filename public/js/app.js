

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch(`http://localhost:3000/weather?address=`).then((response) => {
//     console.log(response.clone().json())
//     response.clone().json().then((data)=>{
//         if(data.error){
//             return console.log(data.error)
//         }
//         console.log(data)   
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//messageOne.textContent = 'Message 1'

weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    fetch(`/weather?address=` + location).then((response) => {
    console.log(response.clone().json())
    response.clone().json().then((data)=>{
        console.log(data)
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = 'Temperature : ' + data.forecast.temperature + '    , Rain Probability : ' + data.forecast.precipitation + '%    ,' + '    Max Temp : ' + data.forecast.max_temp + '    ,Min Temp : '  + data.forecast.min_temp
            messageTwo.textContent = data.location
        }
        
    })
})
})
