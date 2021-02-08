const router = require("express").Router();
const gardenCalls = require('../controllers/ORM');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// gardenCalls.addUserToGardenList({ userAuthId: "kasdkf8923u23", userName: "Plover" });

router.route('/user/:id')
    .get(cors(), function (req, res) {
        gardenCalls.findUser({ userAuthId: req.params.id }).then(function (data) {
            res.json(data);
        }).catch(e => {
            console.log("user/:id .get", e);
        })
    })
    .put(cors(), function (req, res) {
        gardenCalls.addNewGarden({ userAuthId: req.params.id }).then(function (data) {
            res.json(data);
        }).catch(e => {
            console.log("user/:id .put", e);
        })
    })

router.route('/garden/:id')
    .get(cors(), function (req, res) {
        gardenCalls.findGarden({ gardenId: req.params.id }).then(function (data) {
            res.json(data);
        }).catch(e => {
            console.log("user/:id .put", e);
        })
    })


router.route('/plant-search/:search')
    .get(cors(), function (req, res) {
        console.log('inside plant search:', req.params.search)
        const searchURL = 'https://trefle.io/api/v1/plants/search?' + req.params.search + process.env.trefleToken;
        console.log(searchURL);
        axios.get(searchURL).then(data => {
            res.json(data.data);
        }).catch(e => {
            console.log("ERROR from trefle search call:", e);
        })
    })

router.route('/plant-specifics/:plantLink')
    .get(cors(), function(req, res) {
        console.log('inside get specific plant:', req.params.plantLink)
        const searchURL = 'https://trefle.io' + req.params.plantLink.replace(/\-\-/g, "/") + "?token=" + process.env.trefleToken;
        console.log(searchURL);
        axios.get(searchURL).then(data => {
            res.json(data.data);
        }).catch(e=> {
            res.json(e)
        })
    })

router.route('/plant-db')
    .put(cors(), function(req, res) {
        console.log('inside put plant in db');
        console.log(req.body);
        gardenCalls.createPlant(req.body).then(data => {
            res.json(data);
        }).catch(e => {
            console.log("Error from plant-db create plant route(routes/index.js):", e);
        })
    })


    router.route('/garden/add')
    .post(cors(), function(req, res) {
        console.log('inside put plant in garden');
        gardenCalls.addPlantToGarden({plantName: req.body.scientificName, gardenId:req.body.gardenId}).then(data => {
            res.json(data);
        }).catch(e => {
            console.log("Error from garden/add  route(routes/index.js):", e);
        })
    })

router.route('/weather/:cityName')
    .get(cors(), function(req, res){
        const searchURL = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&appid=${process.env.openWeatherToken}`
        axios.get(searchURL).then(data=>{
            res.json(data.data);
        }).catch(e=>{
            console.log("Error from currentWeather route(routes/index.js):", e);
        })
    })
module.exports = router;