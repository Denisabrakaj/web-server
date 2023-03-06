const request = require ('request')
const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=aec87508d0bb3443d984fa9f2e4c3c5a&query='+ latitude +',' + longtitude +'&units=m'
    request({ url, json: true }, (error, {body}) => {
    if( error) {
        callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
        callback('Unable to find location', undefined)
    }
    else {
        callback( undefined, body.current.weather_descriptions 
            + ' It is currently ' 
            +  body.current.temperature 
            + ' degress out. There is ' 
            + body.current.precip 
            + '% chance of rain.' )
    }
    })
}
module.exports = forecast


