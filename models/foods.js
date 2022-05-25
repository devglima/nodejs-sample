const mongoose = require("mongoose");

const FoodsSchema = new mongoose.Schema({
    "id": {
        type: Number,
        required: true,
    },
    "name": {
        type: String,
        required: true,
    },
    "price": {
        type: Number,
        required: true,
    },
    "discount_price": {
        type: Number,
        required: true,
    },
    "description": {
        type: String,
        required: true,
    },
    "ingredients": {
        type: Object,
    },
    "weight": {
        type: Number,
        required: true,
    },
    "featured": {
        type: Number,
        required: true,
    },
    "restaurant_id": {
        type: Number,
        required: true,
    },
    "category_id": {
        type: Number,
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
    "cIDCompany": {
        type: String,
        required: true,
    },
    "cIDProduct": {
        type: String,
        required: true,
    },
    "cImage": {
        type: String,
        required: true,
    },
    "xIDUnitMeasureType": {
        type: String,
    },
});

const Foods = mongoose.model("Foods", FoodsSchema);

module.exports = Foods;