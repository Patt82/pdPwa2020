const productsModel = require("../models/productsModels");

module.exports = {
    getAll: async (req, res, next) =>{
        const products = await productsModel.find({}).populate("category"); //find solo, muestra el ID de category; populate(campo a mostrar) muestra el detalle del campo
        res.json(products);
    },
    getById: async function (req, res, next) {
        const product = await productsModel.findById(req.params.id);
        res.json(product);
    },
    create: function(req, res, next){
        const product = new productsModel({
            name: req.body.name,
            sku: req.body.sku,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category, //Id de la categoria con la cual se relaciona
            tags: req.body.tags
        });
        product.save();
        res.json(product);
    },
    update: async function(req, res, next){
        const product = await productsModel.update({_id: req.params.id}, req.body, {multi: false});
        res.json(product);
    },
    delete: async function(req, res, next){
        const data = await productsModel.deleteOne({_id: req.params.id});
        res.json(data);
    }
}