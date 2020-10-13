const mongoose = require("../bin/mongodb");

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        minlength: 1,
        maxlength: 255,
        trim: true,
        required: true
    },
    sku: {
        type: String,
        unique: true,
        minlength: 1,
        maxlength: 255,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["pendiente", "en_stock", "activo"]
    },
    category:{
        type: mongoose.Schema.ObjectId, //Id del documento. Relación a otra colección
        ref: "categories"//Contra que colección se relaciona
    },
    price: {
        type: Number,
        minlength: 1,
        required: true
    },
    quantity: Number
});

module.exports = mongoose.model("products", productsSchema);