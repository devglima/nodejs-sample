const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    "id": {
        type: Number,
    },
    "name": {
        type: String,
        required: true,
    },
    "email": {
        type: String,
        required: true,
    },
    "password": {
        type: String,
        required: true,
    },
    "device_token": {
        type: String,
    },
    "device_chosen_language": {
        type: String,
    },
    "token": {
        type: String,
    },
    "custom_fields": {
        type: Object,
    },
    "has_media": {
        type: Boolean,
    },
    "media": {
        type: Array,
    },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;