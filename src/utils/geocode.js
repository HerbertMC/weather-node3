const request = require("request")
const geocode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaG11bmd1aWFjIiwiYSI6ImNrdDRxbG53MTAxM3Iyb2xqZjJiY2RpcnEifQ.WIPKHy0Qg8gNiYtxWRA9RA&limit=1'
    request({ url, json:true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Location not found, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode