const usersAdminModel = require("../models/usersAdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    validate: async (req, res, next) => { //Login
        const userAdmin = await usersAdminModel.findOne({ user: req.body.user });
        if (userAdmin) {
            if (bcrypt.compareSync(req.body.password, userAdmin.password)) { //compareSync toma 2 parámetros, pass sin encriptar y pass encriptado, para chequear autenticación
                const token = jwt.sign({userId: userAdmin._id}, "123");
                res.json({message: "User ok", token: token});
            } else {
                res.json({ message: "Wrong password" });
            }
        }else {
            res.json({ message: "Wrong user" });
        }
    },
    create: function (req, res, next) { //Registro
        const userAdmin = new usersAdminModel({
            name: req.body.name,
            user: req.body.user,
            password: req.body.password
        });
        userAdmin.save();
        res.json(userAdmin);
    }
}