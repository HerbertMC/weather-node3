
const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//directorios de archivos
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// configuracion de handlebars, views directorio
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//configuracion directorio de aplicacion
app.use(express.static(publicDirectoryPath))
 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Esto es dinamico',
        name: 'Herbert Munguia C.'
    })
}) 


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Que deseas saber',
        name: 'Herbert E. Munguia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helped: 'Mucho ayuda el que poco estorba',
        name: 'Herbert Munguia',
        title: 'Help is comming'
    })
}) 

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({error: 'Address is missing'})
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    
    res.render('404',{
        title: "404",
        erroMessage: "Help article not Found",
        name: "HEMC"
    })
})
    

app.get('*', (req, res) => {
    res.render('404',{
        title: "404",
        erroMessage: "Page not Found",
        name: "HEMC-404"
    })
})

app.listen(3000, () => {
    console.log('Server Running Fine')
})