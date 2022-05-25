const express = require("express");
var MongoClient = require('mongodb').MongoClient

const app = express();

app.use(express.json());

const connection_url =
    "mongodb://root:SimoniniDB@b2b-db.cf9vntua4zgb.us-east-1.docdb.amazonaws.com:27017/b2b-db?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";

var db = MongoClient.connect(
    connection_url,
    {
        tlsCAFile: `rds-combined-ca-bundle.pem`
    },
    function (err, client) {
        if (err)
            console.log(err);
        throw err;
    });


app.get("/", (req, res) => {
    return res.json({ message: "Server is up!" });
});

app.get("/", (req, res) => {
    var foods = db.foods.find({}).pretty();
    return res.json({ message: foods });
});

app.listen(3000);