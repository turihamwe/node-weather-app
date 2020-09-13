const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

//Initialise.
const express = require("express")
const app = express()

//Paths.
const public = path.join(__dirname, "../public")
const views = path.join(__dirname, "../templates/views")
const layouts = path.join(__dirname, "../templates/layouts")

//Handlebars.
app.set("view engine", "hbs")
app.set("views", views)
hbs.registerPartials(layouts)

//Static.
app.use(express.static(public))

//Routes.
app.get("", (req, res) => {
    res.render("index", {
        "title": "My life's work",
        "name": "Thommy"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        "title": "About page",
        name: "Turihamwe"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help page",
        message: "We're here to help guys.",
        name: "Tmy"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.location){
        return res.send({
            error: "TT: You must provide an address."
        })
    }
    const location = req.query.location
    geocode(location, (error, {longitude, latitude, location2} = {}) => {
        if(error){
            return res.send({
                error: "TT: Internal error while geocoding."
            })
        }
        forecast(longitude, latitude, (error, {description, temperature, feelslike, location} = {}) => {
            if(error){
                return res.send({
                    error: "TT: No forecast available at this time."
                })
            }
            
            return res.send({
                forecast: "Forecast: The weather is currently " + description + ". It is currently " + temperature + " degrees and it instead feels like its " + feelslike + " degrees.",
                location: location
            })
        })
    })
})

app.get("/products", (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "TT: You must provide a searh term."
        })
    }
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404  error",
        message: "Help article not found."
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404 error",
        message: "This is a 404 error man.",
        name: "Tom"
    })
})


//Start server.
app.listen(3000, () => {
    console.log("Server started")
})