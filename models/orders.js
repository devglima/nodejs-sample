const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
    
});

const Orders = mongoose.model("orders", OrdersSchema);

module.exports = Orders;