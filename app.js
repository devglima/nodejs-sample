const express = require("express");
const mongoose = require("mongoose");
const app = express();
const foodsModel = require("./models/foods.js");

app.use(express.json());

const connection_url =
    "mongodb://root:SimoniniDB@b2b-db.cluster-c34svjdft6iv.us-east-1.docdb.amazonaws.com:27017/b2b?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&directConnection=true";

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

let db = mongoose.connection;

app.get("/", (req, res) => {
    console.log(res.statusCode);
    return res.json({ message: "Server is up!" });
}).on('error', function (error) {
    console.log(error.message);
});;

app.get("/foods", async (req, res) => {
    console.log(res.statusCode);
    foodsModel.find((err, foods) => {
        res.status(200).json(foods);
    });
}).on('error', function (error) {
    console.log(error.message);
});;

app.listen(3000);