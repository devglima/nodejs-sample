const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
});

const User = mongoose.model("users", UserSchema);

module.exports = User;