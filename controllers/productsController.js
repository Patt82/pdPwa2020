const productsModel = require("../models/productsModel");
const categoriesModel = require("../models/categoriesModel");

const multer = require("multer");
var DIR = "./public/images/"
const upload = multer({ dest: DIR }).single('photo');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            console.log(req.body.tokenData);
            let queryFind = {};
            if (req.query.search) {
                queryFind = { name: { $regex: ".*" + req.query.search + ".*", $options: "i" } }
            }
            console.log(queryFind)
            const products = await productsModel.paginate(queryFind, {
                sort: { name: 1 },
                limit: req.query.limit || 20,
                populate: "category"                
            });
            console.log(products)
            res.status(200).json(products);
        } catch (e) {
            next(e);
        }
    },
    getById: async function (req, res, next) {
        try {
            console.log(req.params.id);
            const product = await (await productsModel.findById(req.params.id).select("name price price_currency description images"));
            if (!product) {
                res.status(200).json({ msg: "Product not found" });
            }
            res.status(200).json(product);
        } catch (e) {
            next(e);
        }
    },
    create: async function (req, res, next) {
        try {
            const category = categoriesModel.findByIdAndValidate(req.body.category);
            if (category.error) {
                res.json(categoria);
                return;
            }
            const product = new productsModel({
                name: req.body.name,
                sku: req.body.sku,
                description: req.body.description,
                price: req.body.price,
                price_currency: req.body.price_currency,
                quantity: req.body.quantity,
                category: req.body.category,
                images: req.body.images,
                tags: req.body.tags
            });
            const document = await product.save();
            res.status(201).json(document);
        } catch (e) {
            console.log(e);
            e.status = 204; 
            next(e);
        }
    },
    update: async function (req, res, next) {
        try {
            console.log(req.params.id, req.body);
            const product = await productsModel.update({ _id: req.params.id }, req.body, { multi: false });
            res.status(200).json(product);
        } catch (e) {
            next(e);
        }
    },
    delete: async function (req, res, next) {
        try {
            console.log(req.params.id);
            const data = await productsModel.deleteOne({ _id: req.params.id });
            res.status(200).json(data);
        } catch (e) {
            next(e);
        }

    },
    upload: async function (req, res, next) {
        try {
            upload(req, res, function(err){ 
                if(err){
                    console.log(err);
                    next();
                }
                console.log(req.file);
                res.status(201).json({status:"Success", message:"Image Loaded", data:req.file})
            })
        } catch (e) {
            next(e);
        }
    }
}