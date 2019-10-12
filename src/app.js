const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Customize paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setting handlebars and static directory
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))


//Routes
app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name: "Gaurav"
    })
})



app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: "Raja"
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help Page',
        name: "Khwaja"
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error : 'Address not entered'
        })
    }
    //geoCode(req.query.address,(err,{latitude,longitude,location} = {})=>{
    geoCode(req.query.address,(err,data)=>{
        if(err){
            return res.send(err)
        }
        const lat = data.latitude
        const long = data.longitude
        const loc = data.location
        foreCast(lat,long,(err,forecastData)=>{
            if(err){
                return res.send(err)
            }
            res.send({
                location : loc,
                forecast : forecastData
            })
        })
    
    })

})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error: "Enter search term"
        })
    }
    console.log(req.query)

    res.send({
        products : []
    })
    


})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title : '404',
        name : 'GM',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title : '404',
        name : 'GM',
        errorMessage: 'Page not found'    
    })
})

app.listen(port,()=>{
    console.log("Started Server")
})