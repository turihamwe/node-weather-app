const request = require("request")

//Geocoding (finding location).
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidHVyaWhhbXdlIiwiYSI6ImNrMHcxMjczYzExZ3AzY3A1NjUxOGplb20ifQ.ZU79MWzpEKROrpvQa_wCjA&limit=1"

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("TT: Unable to connect to location service.", undefined)
        }else if(body.features.length == 0){
            callback("TT: Location not provided", undefined)
        }else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode