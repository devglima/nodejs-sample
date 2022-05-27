const mongoose = require("mongoose");

const FaqCategoriesSchema = new mongoose.Schema({
    "id": {
        type: Number,
        required: true,
    },
    "name": {
        type: String,
        required: true,
    },
    "created_at": {
        type: String,
    },
    "updated_at": {
        type: String,
    },
    "custom_fields": {
        type: Array,
    },
});

const FaqCategories = mongoose.model("faq_categories", FaqCategoriesSchema);

module.exports = FaqCategories;

