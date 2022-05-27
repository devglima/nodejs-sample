const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index.js");
require("dotenv-safe").config();

const connection_url = "mongodb://root:SimoniniDB@b2b-db.cluster-c34svjdft6iv.us-east-1.docdb.amazonaws.com:27017/b2b?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&directConnection=true";

(async () => await mongoose.connect(connection_url, {
    ssl: true,
    sslValidate: false,
    sslCA: './rds-combined-ca-bundle.pem',
    connectTimeoutMS: 100000,
    keepAlive: true,
    useFindAndModify: false,
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

const app = express();
app.use(express.json());
routes(app);

app.listen(3000);

module.exports = app;
