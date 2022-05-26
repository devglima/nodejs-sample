const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
    "id": {
        type: Number,
        required: true,
    },
    "name": {
        type: String,
        required: true,
    },
});

const Categories = mongoose.model("categories", CategoriesSchema);

module.exports = Categories;