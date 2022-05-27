const userModel = require("../models/user.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

let myUserID;

class LoginController {

    static async login(request, response) {
        const email = request.body.email.toString();
        const password = request.body.password.toString();

        const user = await userModel.findOne({ "email": email });

        if (user == null) {
            return response.status(401).json({ success: false, message: 'User not registered' });
        }

        bcrypt.compare(password, user.password, function (err, res) {
            if (err) {
                return response.status(500).json({ "Error": error.message });
            }
            if (res) {
                const id = user.id;
                myUserID = id;
                const token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 3600
                });
                user.token = token;
                return response.status(200).json({ success: true, token: token, "data": user, "message": "User retrieved successfully" });
            } else {
                return response.status(401).json({ success: false, message: 'Invalid password' });
            }
        });
    }

    static async setDeviceChosenLanguage(request, response) {
        const device_chosen_language = request.body;

        await userModel.findOneAndUpdate({ "id": myUserID }, { $set: device_chosen_language }, (err) => {
            if (!err) {
                return response.status(200).json({ success: true, "message": "User device chosen language set successfully" });
            } else {
                return response.status(500).send({ message: err.message })
            }
        });
    }

    static async register(request, response) {
        let user = new userModel(request.body);

        user.save((err) => {
            if (err) {
                response.status(500).send({ "success": false,
                "message": err.message })
            }
        });

        const newUser = await userModel.findOne({ "email": request.body.email });

        if (newUser == null) {
            return response.status(401).json({ success: false, message: 'User not registered' });
        }

        bcrypt.compare(password, newUser.password, function (err, res) {
            if (err) {
                return response.status(500).json({ "Error": error.message });
            }
            if (res) {
                const id = newUser.id;
                myUserID = id;
                const token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 3600
                });
                newUser.token = token;
                return response.status(201).json({ success: true, token: token, "data": newUser, "message": "User retrieved successfully" });
            } else {
                return response.status(401).json({ success: false, message: 'Invalid password' });
            }
        });
    }

    static async logout(request, response) {
        return response.status(200).json({
            "success": true,
            "message": "User logout successfully"
        });
    }

}

module.exports = LoginController;