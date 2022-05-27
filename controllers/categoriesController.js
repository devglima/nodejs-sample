const foodsModel = require("../models/foods.js");
const categoriesModel = require("../models/categories.js");

class CategoriesController {

    static async getFoods(req, res) {
        await foodsModel.find((err, foods) => {
            if (err) return res.status(404).json({ "Error": error.message });
            return res.status(200).json(foods);
        });
    }

    static async getCategories(req, res) {
        await categoriesModel.find((err, categories) => {
            if (err) return res.status(404).json({ "Error": error.message });
            return res.status(200).json({
                "success": true,
                "data": categories,
                "message": "Categories retrieved successfully"
            });
        });
    }

    static async getCategoriesByID(req, res) {
        var categoryID = parseInt(req.params.id);
        var categories = await categoriesModel.aggregate([{ $match: { id: categoryID } }, { $lookup: { from: "foods", localField: "id", foreignField: "category_id", as: "foods" } }]);
        return res.status(200).json(categories);
    }
}

module.exports = CategoriesController;