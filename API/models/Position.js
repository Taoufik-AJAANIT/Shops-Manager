const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
    _id: false,
    x: Number,
    y: Number,
});

module.exports = positionSchema