const mongoose = require("mongoose");

const FaqsSchema = new mongoose.Schema({
    "id": {
        type: Number,
        required: true,
    },
    "answer": {
        type: String,
        required: true,
    },
    "faq_category_id": {
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
});

const Faqs = mongoose.model("faqs", FaqsSchema);

module.exports = Faqs;