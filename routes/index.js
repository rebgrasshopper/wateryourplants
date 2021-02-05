const router = require("express").Router();
const gardenCalls = require('../controllers/ORM');
const cors = require('cors');

router.route('/user/:id')
    .get(cors(), function(req, res) {
        gardenCalls.findUser({ userAuthId: req.params.id }).then(function (data) {
            res.json(data);
        }).catch(e => {
            console.log("user/:id .get", e);
        })
    })
    .put(cors(), function(req, res) {
        gardenCalls.addNewGarden({ userAuthId: req.params.id }).then(function(data){
            res.json(data);
        }).catch( e => {
            console.log("user/:id .put", e);
        })
    })

router.route('/garden/:id')
    .get(cors(), function(req, res) {
        gardenCalls.findGarden({ gardenId: req.params.id }).then(function(data){
            res.json(data);
        }).catch( e => {
            console.log("user/:id .put", e);
        })
    })
module.exports = router;