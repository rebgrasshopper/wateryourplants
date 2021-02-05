const router = require("express").Router();
const gardenCalls = require('../controllers/ORM');

router.route('/user/:id')
    .get(function(req, res) {
        gardenCalls.findUser({ userAuthId: req.params.id }).then(function (data) {
            res.json(data);
        }).catch(e => {
            console.log(e);
        })
    })

module.exports = router;