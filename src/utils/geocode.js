const request = require('request')

const geoCode = (address,callback)=>{
    
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaW5zYW5lMjAiLCJhIjoiY2swd21yMGFuMHA1ZTNtb2M2cXd6YmxnbCJ9.OsZCtlReZTSb15_EwCF-aw'
    
    request({url: geourl,json:true},(err,response)=>{
        if(err){
            callback('Unable to connect to location service!')
        }else if(response.body.features.length === 0){
            callback('No such location')
        }else{

            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location: response.body.features[0].place_name

            })
            
        }
    })
}

module.exports = geoCode