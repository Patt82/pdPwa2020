const salesModel = require("../models/salesModel");
const productsModel = require("../models/productsModel");
const categoriesModel = require("../models/categoriesModel");

module.exports = {
    getAll: async function (req, res, next) {
        let products = await productsModel.find({})
        await categoriesModel.populate(products, { path: 'category' })
        console.log(products)
        res.status(200).json(products)
    },
    create: async function (req, res, next) {
        try {
            let products = await productsModel.find({})
                .select(['_id', 'name', 'price'])
                .where('_id').in(req.body.product_id)

            if (!products){
                res.json({msg: "Product not found"});
                return;
            }
            let total = 0;
            let records = products.map(product => {
                total += product.price 
                return ({
                    product_id: product["_id"],
                    name: product['name'],
                    price: product['price']
                })
            })
            const sale = new salesModel({
                user: req.body.tokenData.userId,
                total: total,
                products: records,
                payment: {
                    amount: total,
                    method: req.body.payment,
                    status: "generate"
                }
            })     
            let document = await sale.save();
            res.status(201).json(document);
        } catch (e) {
            console.log(e);
            e.status = 204; 
            next(e);
        }

    }

}