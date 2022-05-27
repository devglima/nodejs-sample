const ordersModel = require("../models/orders.js");
const orders_statusesModel = require("../models/orders_statuses.js");

class OrdersController {

    static async getOrders(req, res) {
        await ordersModel.find((err, orders) => {
            if (err) return res.status(404).json({ "Error": error.message });
            return res.status(200).json({
                "success": true,
                "data": orders,
                "message": "Orders retrieved successfully"
            });
        });
    }

    static async getOrdersStatuses(req, res) {
        await orders_statusesModel.find((err, orders_statuses) => {
            if (err) return res.status(404).json({ "Error": error.message });
            return res.status(200).json({
                "success": true,
                "data": orders_statuses,
                "message": "Order Statuses retrieved successfully"
            });
        });
    }
}

module.exports = OrdersController;