const express = require("express");
const mongoose = require("mongoose");
const foodsModel = require("./models/foods.js");
const categoriesModel = require("./models/categories.js");

const app = express();
app.use(express.json());

const connection_url = "mongodb://root:SimoniniDB@b2b-db.cluster-c34svjdft6iv.us-east-1.docdb.amazonaws.com:27017/b2b?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&directConnection=true";

(async () => await mongoose.connect(connection_url, {
    ssl: true,
    sslValidate: false,
    sslCA: './rds-combined-ca-bundle.pem',
    connectTimeoutMS: 100000,
    keepAlive: true, 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    maxIdleTimeMS: 270000, 
    minPoolSize: 2, 
    maxPoolSize: 4
})
    .then(() => {
    console.log("MongoDB Connected!");
    return true;
})
    .catch((err) => {
        console.log("MongoDB isn't connected!", err);
        return false;
    }))();

app.get("/", (req, res) => {
    return res.json({ message: "Server is up!" });
}).on('error', function (error) {
    return res.status(404).json({ "Error" : error.message });
});

app.get("/foods", async (req, res) => {
    foodsModel.find((err, foods) => {
        res.status(200).json(foods);
    });
}).on('error', function (error) {
    return res.status(404).json({ "Error" : error.message });
});

app.get("/categories", async (req, res) => {
    categoriesModel.find((err, categories) => {
        res.status(200).json(categories);
    });
}).on('error', function (error) {
    return res.status(404).json({ "Error" : error.message });
});

app.get("/categories/:id", async (req, res) => {
    var categoryID = parseInt(req.params.id);
    var categories = await categoriesModel.aggregate([{$match: { id: categoryID }}, { $lookup: { from: "foods", localField: "id", foreignField: "category_id", as: "foods" }}]); 
    return res.status(200).json(categories);
}).on('error', function (error) {
    console.log(error.message);
});;

app.listen(3000);