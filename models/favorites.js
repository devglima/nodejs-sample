const mongoose = require("mongoose");

const FavoritesSchema = new mongoose.Schema({
    "id": {
        type: Number,
        required: true,
    },
    "user_id": {
        type: Number,
        required: true,
    },
    "cIDCompany": {
        type: String,
        required: true,
    },
    "cIDProduct": {
        type: String,
        required: true,
    },
    "created_at": {
        type: String,
        required: true,
    },
    "updated_at": {
        type: String,
        required: true,
    },
});

const Favorites = mongoose.model("favorites", FavoritesSchema);

module.exports = Favorites;
