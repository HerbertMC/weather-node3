const request = require("request")
const forecast = (latitude, longitude, callback) =>{
    const url='http://api.weatherstack.com/current?access_key=2d81c26204b0584cb43e8eae928686b9&query=' + latitude + ',' + longitude + '&units=m'
    //console.log (url)
    request({ url, json:true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] +  '. It is currently ' + body.current.temperature + ' degrees out, and feels like ' + body.current.feelslike + ' degrees.' )
        }
    })
}
module.exports = forecast 