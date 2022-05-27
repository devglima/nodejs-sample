const express = require("express")
const login = require("./loginRoutes.js")
const categories = require("./categoriesRoutes.js")

const routes = (app) => {
    app.route('/').get((req, res) => {
        return res.json({ message: "Server is up!" });
    }).on('error', function (error) {
        return res.status(404).json({ "Error": error.message });
    });

    app.use(
        express.json(),
        login,
        categories,
    )
}

export default routes