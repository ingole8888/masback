const express = require("express")
const jwt = require('jsonwebtoken');
const AuthModel = require("../model/userModel");
const authController = express.Router();

authController.post("/signup", async (req, res) => {

    const { email, password, } = req.body;

    try {

        const user1 = await AuthModel.findOne({ email })

        if (user1) {
            return res.status(400).send("User already present please use different userid!");
        }
        
        const user = new AuthModel({
            email,
            password,
        })
        await user.save();
        return res.status(201).send({ message: "Signup successfull", user: user })

    } catch (error) {
        res.send(error)
    }

})

authController.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AuthModel.findOne({ email, password })

        if (!user) {
            return res.status(404).send({ message: "Login Failed, User Not Found!", status: 404 });
        }

        if (user) {
            const token = jwt.sign({ email: user.email, userId: user._id }, "shhhhhsecret", { expiresIn: "365 day" })

            return res.status(200).send({ status: 200, message: "login succesfully", token: token, userId: user._id, user: user })
        }
        else {
            res.status(401).send({ status: 401, message: "invalid password" })
        }

    } catch (error) {
        res.send(error)
    }
})

module.exports = authController