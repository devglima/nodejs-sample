const cartsModel = require("../models/Carts.js");

class CartsController {

    static async getCarts(req, res) {
        await cartsModel.find((err, carts) => {
            if (err) return res.status(404).json({ "Error": error.message });
            return res.status(200).json({
                "success": true,
                "data": carts,
                "message": "Carts retrieved successfully"
            });
        });
    }
}

module.exports = CartsController;