const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

require("dotenv-safe").config();
const bcrypt = require('bcryptjs')

const foodsModel = require("./models/foods.js");
const userModel = require("./models/user.js");
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

let myUser;

app.get("/", (req, res) => {
    return res.json({ message: "Server is up!" });
}).on('error', function (error) {
    return res.status(404).json({ "Error": error.message });
});

app.post('/login', async (request, response) => {
    const email = request.body.email.toString();
    const password = request.body.password.toString();

    const user = await userModel.findOne({ "email": email });
    myUser = user;

    if (user == null) {
        return response.status(401).json({ success: false, message: 'Usuário não cadastrado!' });
    }

    bcrypt.compare(password, user.password, function (err, res) {
        if (err) {
            return response.status(500).json({ "Error": error.message });
        }
        if (res) {
            const id = user.id;
            const token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 3600
            });
            user.token = token;
            return response.status(200).json({ success: true, token: token, "data": user, "message": "User retrieved successfully" });
        } else {
            return response.status(401).json({ success: false, message: 'Senha incorreta!' });
        }
    });
});

app.post('/logout', function (req, res) {
    return res.status(200).json({ auth: false, token: null });
});

app.post('/users/setDeviceChosenLanguage', async (request, response) => {
    const device_chosen_language = request.body;

    await userModel.findOneAndUpdate({ "id": myUser.id }, { $set: device_chosen_language }, (err) => {
        if (!err) {
            return response.status(200).json({ success: true, "data": {"device_chosen_language": user.device_chosen_language}, "message": "User device chosen language set successfully" });
        } else {
            return response.status(500).send({ message: err.message })
        }
    });
});

app.get("/foods", verifyJWT, async (req, res) => {
    foodsModel.find((err, foods) => {
        res.status(200).json(foods);
    });
}).on('error', function (error) {
    return res.status(404).json({ "Error": error.message });
});

app.get("/categories", verifyJWT, async (req, res) => {
    categoriesModel.find((err, categories) => {
        res.status(200).json(categories);
    });
}).on('error', function (error) {
    return res.status(404).json({ "Error": error.message });
});

app.get("/categories/:id", verifyJWT, async (req, res) => {
    var categoryID = parseInt(req.params.id);
    var categories = await categoriesModel.aggregate([{ $match: { id: categoryID } }, { $lookup: { from: "foods", localField: "id", foreignField: "category_id", as: "foods" } }]);
    return res.status(200).json(categories);
}).on('error', function (error) {
    return res.status(404).json({ "Error": error.message });
});;

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        req.body.id = decoded.id;
        next();
    });
}

app.listen(3000);