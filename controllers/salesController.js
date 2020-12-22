const salesModel = require("../models/salesModel");
const productsModel = require("../models/productsModel");

module.exports = {
    create: async function (req, res, next) {
        try {
            //buscar que el producto exista
            const product = productsModel.findByIdAndValidate(req.body.product_id);
            if(!product){
                res.json(product);
                return;
            }
            //si existe, crear una nueva venta
            const sale = new salesModel({
                date: req.body.date,
                user_id: req.body.user_id,
                product_id: req.body.product_id,
                price: req.body.price,
                product_name: req.body.product_name,
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