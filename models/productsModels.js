const mongoose = require("../bin/mongodb");

const productsSchema = new mongoose.Schema({
    name: String,
    sku: String,
    description: String,
    price: Number,
    quantity: Number
});

module.exports = mongoose.model("products", productsSchema);