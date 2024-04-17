const mongoose = require('mongoose');

const FashionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        index: true,
    }

   
});

const fashio = mongoose.model("fashiondatas", FashionSchema);

module.exports = {fashio};