const express = require ('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require( './utils/geocode.js')
const forecast = require ('./utils/forecast.js')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath  = path.join(__dirname, '../template/views')
const partialsPath  = path.join(__dirname, '../template/partials')
// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use (express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Den'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Den'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'About me',
        name: 'Den',
        title: 'Do you need help?',
        askMe: 'If you have any question you can ask me anytime.'
    })
})


app.get ('/weather', (req, res) => {
    const address = req.query.address
    if(!req.query.address) {
        return res.send ( {
             error: 'You must provide an address'
         })
         
     }
    else {
        geocode(address, (error, {latitude, longtitude, location} = {}) => {
            if (error) {
              return res.send({error})
            }
            forecast(latitude, longtitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address
                })
              })
        })
    }
})

app.get ('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Den', 
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Den', 
        errorMessage: 'Page not found'
    })
})
// app.com
 app.listen(3000, () => {
     console.log('Server is up on port 3000');
 })