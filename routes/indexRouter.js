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


// like a shop & add it to preferredShops 

router.post('/', checkAuth, (req, res) => {
    let userId = req.userId;
    let shopId = req.body.shopId;
    PreferredShop.find({
        userId,
        shopId
    }).exec()
        .then(result => {
            if (result.length) {
                return res.json({ messege: 'you alredy liked this Shop :)' })
            }

            let preferredShop = new PreferredShop({
                userId,
                shopId
            })
            preferredShop.save()
                .then(() => {
                    res.json({
                        messege: 'Shop added succefuly to your prefered shops ',
                    })
                })
                .catch(err => {
                    res.json({
                        messege: 'Error while adding shop to your preffered shops !'
                    })
                });

        })

})

// fetch preferredShops

router.get('/prefered', checkAuth, (req, res) => {
    let userId = req.userId;
    PreferredShop.find({ userId: userId })
        .then(user_sPreferreds => {
            // array that will contains all prefered shops
            let shops = [];
            let shopIds = [];
            user_sPreferreds.map(preferred => {
                shopIds.push(preferred.shopId)
            })
            // ids of prefereds shops in shopIds

            Shop.find({
                '_id': {
                    $in: shopIds
                }
            })
                .exec()
                .then(results => {
                    results.map(shop => {
                        let { shopName, imgUrl } = shop;
                        let key = shop._id;
                        shops.push({
                            shopName,
                            imgUrl,
                            key
                        })
                    })
                    res.status(200).json({ shops })
                })
        })
})