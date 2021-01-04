const salesModel = require("../models/salesModel");
const productsModel = require("../models/productsModel");
const usersWebModel = require("../models/usersWebModel");
const errorMessage = require("../util/errorMessage");

module.exports = {
    create: async function (req, res, next) {
        try {
            //buscar que el producto exista
            const product = productsModel.findByIdAndValidate(req.body.product_id);
            if(!product){
                res.json(product);
                return;
            }
            //si existe, crea la venta
            const sale = new salesModel({
                product_id: req.body.product_id,
                quantity: req.body.quantity, //Id de la categoria con la cual se relaciona
            });
            const document = await sale.save();
            res.status(201).json(document);
        } catch (e) {
            console.log(e);
            e.status = 204; //Sale por el catch, guarda en e un status no content para que lo use el error handler de app.js
            next(e);
        }

    }

}