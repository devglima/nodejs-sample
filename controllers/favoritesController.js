const favoritesModel = require("../models/favorites.js");

class FavoritesController {

    static async getFavorites(req, res) {
        await favoritesModel.find((err, favorites) => {
            if (err) return res.status(404).json({ "Error": error.message });
            return res.status(200).json({
                "success": true,
                "data": favorites,
                "message": "Favorites retrieved successfully"
            });
        });
    }
}

module.exports = FavoritesController;