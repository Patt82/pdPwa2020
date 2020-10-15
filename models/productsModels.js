const mongoose = require("../bin/mongodb");

/**
 * tagsSchema -> schema para subdocumento Tags
 */  
const tagsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        minlength: [1, "Se debe colocar al menos un caracter"],
        maxlength: 255,
        trim: true,
        required: [true, "El campo name es obligatorio"]
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
    quantity: Number,
    tags: [tagsSchema] //Array porque puede tener multiples tags
});

module.exports = mongoose.model("products", productsSchema);