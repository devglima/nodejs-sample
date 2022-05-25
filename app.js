const express = require("express");
const mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient
const app = express();
app.use(express.json());

const connection_url =
    "mongodb://root:SimoniniDB@b2b-db.cf9vntua4zgb.us-east-1.docdb.amazonaws.com:27017/b2b-db?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&directConnection=true";

var db = mongoose.connect(connection_url, {
    ssl: true,
    sslValidate: false,
    autoIndex: true,
    connectTimeoutMS: 100000,
    keepAlive: true,
  })
    .then(() => {
      console.log("MongoDB Connected!");
      return true;
    })
    .catch((err) => {
      console.log("MongoDB isn't connected!", err);
      return false;
    });


app.get("/", (req, res) => {
    console.log(res.statusCode);
    return res.json({ message: "Server is up!" });
}).on('error', function(error){
    console.log(error.message);
});;

app.get("/", (req, res) => {
    console.log(res.statusCode);
    var foods = db.foods.find({}).pretty();
    return res.json({ message: foods });
}).on('error', function(error){
    console.log(error.message);
});;

app.listen(3000);