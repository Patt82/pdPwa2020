const usersAdminModel = require("../models/usersAdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    validate: async (req, res, next) => { //Login
        try {
            console.log(req.query);
            const userAdmin = await usersAdminModel.findOne({ user: req.body.user });
            if (userAdmin) {
                if (bcrypt.compareSync(req.body.password, userAdmin.password)) { //compareSync toma 2 parámetros, pass sin encriptar y pass encriptado, para chequear autenticación
                    const token = jwt.sign({ userId: userAdmin._id }, req.app.get("secretKey")); //req.app.get accede a cualq dato que se haya seteado en app.set
                    res.json({ message: "User ok", token: token });
                } else {
                    res.json({ message: "Wrong password" });
                }
            } else {
                res.json({ message: "Wrong user" });
            }
        } catch (e) {
            next(e);
        }

    },
    create: async function (req, res, next) { //Registro
        try {
            console.log(req.body);
            const userAdmin = new usersAdminModel({
                name: req.body.name,
                user: req.body.user,
                password: req.body.password
            });
            const document = await userAdmin.save();
            res.json(document);
        } catch (e) {
            next(e);
        }

    }
}