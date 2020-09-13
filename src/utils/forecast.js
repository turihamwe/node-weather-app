const request = require("request");

//Weather.
const forecast = (latitude, longitude, callback) => {
    url = "http://api.weatherstack.com/current?access_key=ca0b0f76d3c5ea7f80338fa3e86e129c&query=" + latitude + "," + longitude + "&units=m"

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("TT: No internet ssebo", undefined)
        }else if(body.error){
            callback("TT: No query provided", undefined)
        }else{
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                location: body.location.name + ", " + body.location.country
            })
            // callback(undefined, "The weather is currently " + body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees and it instead feels like its " + body.current.feelslike + " degrees.")
        }
    })
}

module.exports = forecast