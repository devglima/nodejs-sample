const mongoose = require("mongoose");

const RestaurantsSchema = new mongoose.Schema({
    "id": {
        type: Number,
        required: true,
    },
    "name": {
        type: String,
        required: true,
    },
});

const Restaurants = mongoose.model("restaurants", RestaurantsSchema);

module.exports = Restaurants;