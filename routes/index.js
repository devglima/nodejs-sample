const express = require("express")
const login = require("./loginRoutes.js")
const categories = require("./categoriesRoutes.js")
const restaurants = require("./restaurantsRoutes.js")
const orders = require("./ordersRoutes.js")
const faqs = require("./faqsRoutes.js")
const favorites = require("./favoritesRoutes.js")

const routes = (app) => {
    app.route('/').get((req, res) => {
        return res.json({ message: "Server is up!" });
    });

    app.use(
        express.json(),
        login,
        categories,
        restaurants,
        orders,
        faqs,
        favorites, 
    )
}

module.exports = routes;