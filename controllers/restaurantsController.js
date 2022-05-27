const restaurantsModel = require("../models/restaurants.js");

class RestaurantsController {

    static async getRestaurants(req, res) {
        const restaurants = await restaurantsModel.find((err, foods) => {
            if (err) return res.status(404).json({ "Error": error.message });
            return res.status(200).json({
                "success": true,
                "data": restaurants,
                "message": "Restaurants retrieved successfully"
            });
        });
    }
}

module.exports = RestaurantsController;