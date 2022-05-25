const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connection_url =
    "mongodb://root:SimoniniDB@b2b-db.cf9vntua4zgb.us-east-1.docdb.amazonaws.com:27017/b2b-db?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";
mongoose.connect(connection_url, {
    tlsCAFile: "rds-combined-ca-bundle.pem",
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get("/", (req, res) => {
    return res.json({ message: "Server is up!" });
});

app.get("/", (req, res) => {
    var foods = db.foods.find({}).pretty();
    return res.json({ message: foods });
});

app.listen(3000);