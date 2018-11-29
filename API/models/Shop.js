const mongoose = require('mongoose');
const positionShema = require('./Position')
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    shopName: String,
    imgUrl: String,
    position: positionShema

});

const Shop = mongoose.model('shops', shopSchema);

module.exports = Shop