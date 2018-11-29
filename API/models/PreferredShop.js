const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferredShopsSchema = new Schema({
    userId: { type: String, required: true },
    shopId: { type: String, required: true },


});

const PreferredShop = mongoose.model('preferredShops', preferredShopsSchema);

module.exports = PreferredShop;