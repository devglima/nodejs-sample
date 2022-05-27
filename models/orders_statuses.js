const mongoose = require("mongoose");

const OrdersStatusesSchema = new mongoose.Schema({
    "id": {
        type: Number,
        required: true,
    },
    "name": {
        type: String,
        required: true,
    },
});

const OrdersStatuses = mongoose.model("order_statuses", OrdersStatusesSchema);

module.exports = OrdersStatuses;