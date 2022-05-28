const mongoose = require("mongoose");

const CartsSchema = new mongoose.Schema({
    
});

const Carts = mongoose.model("carts", CartsSchema);

module.exports = Carts;