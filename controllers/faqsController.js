const faqsModel = require("../models/faqs.js");

class FaqsController {

    static async getFaqs(req, res) {
        await faqsModel.find((err, faqs) => {
            if (err) return res.status(404).json({ "Error": error.message });
            return res.status(200).json({
                "success": true,
                "data": faqs,
                "message": "Faqs retrieved successfully"
            });
        });
    }
}

module.exports = FaqsController;