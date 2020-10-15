const productsModel = require("../models/productsModels");

module.exports = {
    getAll: async (req, res, next) => {
        const products = await productsModel.find({}).populate("category"); //find solo, muestra el ID de category; populate(campo a mostrar) muestra el detalle del campo
        res.status(200).json(products);
    },
    getById: async function (req, res, next) {
        const product = await productsModel.findById(req.params.id);
        res.status(200).json(product);
    },
    create: async function (req, res, next) {
        try {
            const product = new productsModel({
                name: req.body.name,
                sku: req.body.sku,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.category, //Id de la categoria con la cual se relaciona
                tags: req.body.tags
            });
            const docuement = await product.save();
            res.status(201).json(document);
        } catch (e) {
            console.log(e);
            e.status = 204; //Sale por el catch, guarda en e un status no content para que lo use el error handler de app.js
            next(e);
        }

    },
    update: async function (req, res, next) {
        const product = await productsModel.update({ _id: req.params.id }, req.body, { multi: false });
        res.status(201).json(product);
    },
    delete: async function (req, res, next) {
        const data = await productsModel.deleteOne({ _id: req.params.id });
        res.status(201).json(data);
    }
}