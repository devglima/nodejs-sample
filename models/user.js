const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    "id": {
        type: Number,
        required: true,
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
        required: true,
    },
    "device_chosen_language": {
        type: String,
        required: true,
    },
    "token": {
        type: String,
        required: true,
    },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;