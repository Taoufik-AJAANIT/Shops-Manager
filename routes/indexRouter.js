const express = require('express')
const router = express.Router()
const Shop = require("../models/Shop.js")
const PreferredShop = require("../models/PreferredShop")
const checkAuth = require("../midlware/checkAuth")
const getPosition = require("../getPosition")


// get all shops : 

router.get('/', checkAuth, (req, res) => {
    Shop.find()
        .exec()
        .then(shops => {
            let result = []

            shops.map(shop => {
                let x = shop._doc.position._doc.x;
                let y = shop._doc.position._doc.y;
                let shopName = shop._doc.shopName;
                let imgUrl = shop._doc.imgUrl;
                let key = shop._id

                // generate rondom position for the user between (0,0 and (20,20): 
                let position = getPosition();

                // calcul the  distance between the user and shop : 
                let distance = Math.sqrt(Math.pow(x - position.x, 2) + Math.pow(y - position.y, 2)).toFixed(2)

                // add shop result array
                let shopElement = {
                    shopName,
                    imgUrl,
                    distance,
                    key
                }
                result.push(shopElement)
            })
            return res.status(200).json({
                shops: result
            })

        })
        .catch(err => {
            return res.status(500).json({
                messege: 'Error while Fitching Shops' + err
            })
        })
})