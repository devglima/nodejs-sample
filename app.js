const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connection_url =
    "mongodb://root:SimoniniDB@b2b-db.cluster-c34svjdft6iv.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";
mongoose.connect(connection_url);

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