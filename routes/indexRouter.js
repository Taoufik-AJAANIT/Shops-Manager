const express = require('express')
const router = express.Router()
const indexController = require("../controllers/indexController")
const checkAuth = require("../middlwares/checkAuth")



// get all shops : 

router.get('/', checkAuth, indexController.fetchAllShops)


// like a shop & add it to preferredShops 

router.post('/', checkAuth, indexController.likeShope)

// fetch preferredShops

router.get('/prefered', checkAuth, indexController.fetchPrefferedShops)


// Remove from preferred shops

router.delete('/preferred/:shopId', checkAuth, indexController.removeFromPreffereds)


module.exports = router