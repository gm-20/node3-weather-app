const request = require('request')


const foreCast = (latitude,longitude,callback)=>{

    const url = 'https://api.darksky.net/forecast/a8c91f2b17fb7504cd82d3bf3cdbb3c8/' + latitude + ',' + longitude + '?units=si'

    request({url: url,json:true},(err,response)=>{
        if(err){
            callback('Unable to connect to Service')
        }else if(response.body.error){
            callback('Provide correct coordinates')
        }else{
            callback(undefined,{
                temperature: response.body.currently.temperature,
                precipitation: response.body.currently.precipProbability,
                max_temp : response.body.daily.data[0].temperatureHigh,
                min_temp : response.body.daily.data[0].temperatureLow
            })
        }
    })

}

module.exports = foreCast